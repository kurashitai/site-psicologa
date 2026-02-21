'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { useState, useEffect } from 'react'

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { contact, whatsapp } = siteConfig

  useEffect(() => {
    // Show button after scrolling a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(whatsapp.defaultMessage)
    window.open(`https://wa.me/${contact.whatsapp}?text=${message}`, '_blank')
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        >
          {/* Tooltip/Popup */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="mb-4 w-72 md:w-80 bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden origin-bottom-right"
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">WhatsApp</p>
                        <p className="text-green-100 text-sm flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                          Online agora
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    Olá! 👋 Como posso te ajudar? Clique abaixo para conversar diretamente com minha equipe.
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] h-12 text-md font-bold"
                    onClick={handleOpenWhatsApp}
                  >
                    Iniciar Conversa
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`w-16 h-16 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 z-10 relative ${isOpen
                  ? 'bg-gray-800 rotate-90 hover:bg-gray-900'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-[0_15px_25px_rgba(0,0,0,0.3)]'
                }`}
            >
              {isOpen ? (
                <X className="h-7 w-7 text-white" />
              ) : (
                <MessageCircle className="h-7 w-7 text-white" />
              )}
            </motion.button>

            {/* Pulse animation ring */}
            {!isOpen && (
              <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60 z-0" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
