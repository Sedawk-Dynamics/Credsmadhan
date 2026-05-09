"use client"

import { useState, useEffect } from "react"
import { Bot, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "bot" | "user" }[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const questions = [
    { text: "What services do you offer?", href: "/services" },
    { text: "How can I check my CIBIL score?", href: "/know-your-cibil-score" },
    { text: "I need legal compliance help", href: "/services" },
    { text: "Talk to a consultant", href: "/contact-us" }
  ]

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const runSequence = async () => {
        setIsTyping(true)
        await new Promise((r) => setTimeout(r, 800))
        setMessages([{ id: 1, text: "Hi there! 👋", sender: "bot" }])
        setIsTyping(false)
        
        await new Promise((r) => setTimeout(r, 500))
        
        setIsTyping(true)
        await new Promise((r) => setTimeout(r, 1200))
        setMessages((prev) => [...prev, { id: 2, text: "Welcome to Credsmadhan. How can I assist you today?", sender: "bot" }])
        setIsTyping(false)
        setShowOptions(true)
      }
      runSequence()
    }
  }, [isOpen, messages.length])

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-36 right-4 sm:bottom-40 sm:right-6 z-50 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#1B3F8B] p-4 flex justify-between items-center text-white shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Bot size={20} className="text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#1B3F8B] rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight">Credsmadhan AI</h3>
                  <p className="text-xs text-white/70">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Chat Body */}
            <div className="p-4 bg-slate-50 max-h-[350px] overflow-y-auto flex flex-col gap-3 h-[300px]">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.sender === "bot" 
                        ? "bg-white text-gray-800 rounded-tl-sm border border-gray-100 shadow-sm self-start" 
                        : "bg-[#1B3F8B] text-white rounded-tr-sm self-end"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white border border-gray-100 shadow-sm p-3 rounded-2xl rounded-tl-sm self-start w-16 h-10 flex items-center justify-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </motion.div>
                )}
                
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2 mt-2"
                  >
                    {questions.map((q, i) => (
                      <Link
                        key={i}
                        href={q.href}
                        onClick={() => setIsOpen(false)}
                        className="text-left px-4 py-2.5 bg-white border border-[#1B3F8B]/20 rounded-full text-xs text-[#1B3F8B] hover:bg-[#1B3F8B] hover:text-white transition-all shadow-sm font-medium flex items-center justify-between group"
                      >
                        {q.text}
                        <Send size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Footer / Input placeholder */}
            <div className="p-3 bg-white border-t border-gray-100 text-xs text-center text-gray-400">
              Select an option above to continue
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#1B3F8B] rounded-full shadow-2xl hover:bg-[#2a52a8] transition-all duration-300 flex"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        )}
      </motion.button>
    </>
  )
}
