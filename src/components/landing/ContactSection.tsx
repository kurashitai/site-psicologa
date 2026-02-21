'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Youtube,
  MessageCircle,
  Send
} from 'lucide-react'

export function ContactSection() {
  const { contact, social, whatsapp } = siteConfig

  const handleWhatsApp = () => {
    const message = encodeURIComponent(whatsapp.defaultMessage)
    window.open(`https://wa.me/${contact.whatsapp}?text=${message}`, '_blank')
  }

  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Contato
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Vamos Conversar?
          </h2>
          <p className="text-gray-600 text-lg">
            Estou disponível para esclarecer suas dúvidas e agendar sua consulta.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <a 
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      {contact.phone}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Resposta rápida</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">E-mail</p>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      {contact.email}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Resposta em até 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Localização</p>
                    <p className="text-gray-600">{contact.address}</p>
                    <p className="text-sm text-gray-500 mt-1">Consultório presencial</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-8 pt-8 border-t">
                <p className="text-sm text-gray-500 mb-4">Siga nas redes sociais</p>
                <div className="flex gap-3">
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-100 hover:text-purple-600 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-100 hover:text-purple-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-100 hover:text-purple-600 transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#5B21B6] rounded-2xl shadow-lg p-8 text-white h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Send className="h-8 w-8" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">
                Pronta para começar sua jornada de autoconhecimento?
              </h3>
              
              <p className="text-purple-100 mb-8">
                O primeiro passo é o mais importante. Entre em contato agora mesmo 
                e agende sua primeira consulta. Estou aqui para te ajudar.
              </p>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-white text-purple-600 hover:bg-gray-100"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chamar no WhatsApp
                </Button>

                <Button
                  size="lg"
                  className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-colors"
                  onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Enviar E-mail
                </Button>
              </div>

              <p className="text-purple-200 text-sm mt-6 text-center">
                Atendimento humanizado e acolhedor
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
