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
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip/Popup */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="bg-green-500 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">WhatsApp</p>
                        <p className="text-green-100 text-sm">Online agora</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4">
                    Olá! 👋 Como posso te ajudar? Clique abaixo para iniciar uma conversa.
                  </p>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleOpenWhatsApp}
                  >
                    Iniciar Conversa
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-colors ${
              isOpen ? 'bg-gray-600' : 'bg-green-500'
            }`}
          >
            {isOpen ? (
              <X className="h-7 w-7 text-white" />
            ) : (
              <MessageCircle className="h-7 w-7 text-white" />
            )}
          </motion.button>

          {/* Pulse animation */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
