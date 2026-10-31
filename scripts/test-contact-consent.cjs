// Run with: node scripts/test-contact-consent.cjs
// SMTP is mocked: no real emails are sent.
const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const vm = require("node:vm")
const ts = require("typescript")

function load(relativePath, dependencies = {}) {
  const file = path.join(__dirname, "..", relativePath)
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText
  const module = { exports: {} }
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require: name => dependencies[name] || require(name),
    process, console: { error() {} },
  }, { filename: file })
  return module.exports
}

async function main() {
  const shared = load("lib/contact-consent.ts")
  const valid = {
    name: "Test <Client>", email: "client@example.com", phone: "+91 9876543210", service: shared.contactServices[0],
    ...Object.fromEntries(shared.consentStatements.map(({ key }) => [key, true])),
  }
  let sent = [], failAt = 0, verified = 0
  const route = load("app/api/contact-send/route.ts", {
    "@/lib/contact-consent": shared,
    "next/server": { NextResponse: { json: (body, { status }) => ({ body, status }) } },
    nodemailer: { createTransport: () => ({
      verify: async () => { verified++ },
      sendMail: async mail => { sent.push(mail); if (sent.length === failAt) throw new Error("SMTP failure") },
    }) },
  })
  async function submit(body) { sent = []; verified = 0; return route.POST({ json: async () => body }) }
  for (const { key } of shared.consentStatements) {
    for (const value of [false, undefined, "true"]) {
      assert.equal((await submit({ ...valid, [key]: value })).status, 400)
      assert.equal(verified, 0)
    }
  }
  for (const patch of [{ name: " " }, { email: "invalid" }, { phone: "123" }, { service: "unsupported" }, { name: "Client\r\nInjected" }]) {
    assert.equal((await submit({ ...valid, ...patch })).status, 400)
    assert.equal(sent.length, 0)
  }
  assert.equal((await route.POST({ json: async () => { throw new Error("Bad JSON") } })).status, 400)
  let result = await submit(valid)
  assert.equal(result.status, 200)
  assert.equal(result.body.confirmationSent, true)
  assert.equal(sent.length, 2)
  assert.equal(sent[0].replyTo, valid.email)
  assert.equal(sent[1].to, valid.email)
  for (const mail of sent) {
    assert.ok(mail.html.includes("Test &lt;Client&gt;"))
    assert.ok(!mail.html.includes("Test <Client>"))
    assert.equal((mail.html.match(/Accepted:/g) || []).length, 6)
    assert.ok(mail.html.includes(shared.consentVersion))
  }
  failAt = 1
  assert.equal((await submit(valid)).status, 500)
  assert.equal(sent.length, 1)
  failAt = 2
  result = await submit(valid)
  assert.equal(result.status, 200)
  assert.equal(result.body.confirmationSent, false)
  console.log("Passed: required consents, input validation, malformed JSON, email content/escaping, SMTP success and failure handling.")
}
main().catch(error => { console.error(error); process.exitCode = 1 })
