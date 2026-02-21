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
  Send,
  Sparkles
} from 'lucide-react'
import { Footer } from '@/components/landing/Footer'

export function ContactSection() {
  const { contact, social, whatsapp } = siteConfig

  const handleWhatsApp = () => {
    const message = encodeURIComponent(whatsapp.defaultMessage)
    window.open(`https://wa.me/${contact.whatsapp}?text=${message}`, '_blank')
  }

  return (
    <section id="contato" className="relative pt-10 lg:pt-16 pb-0 bg-[#FAFAF9] overflow-hidden flex flex-col justify-between min-h-screen">
      {/* Clean Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="text-purple-600 font-bold text-sm uppercase tracking-widest">
              Contato
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mt-2 mb-4 tracking-tight">
            Vamos Conversar?
          </h2>
          <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed">
            Estou disponível para esclarecer suas dúvidas e agendar sua consulta.
            Me mande uma mensagem!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8 h-full relative overflow-hidden group">
              {/* Removed strong gradient opacity */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-purple-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <h3 className="text-xl font-extrabold text-[#111827] mb-8 tracking-tight">
                Informações de Contato
              </h3>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-purple-100">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#111827] mb-1">WhatsApp</p>
                    <a
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 text-lg font-medium transition-colors"
                    >
                      {contact.phone}
                    </a>
                    <p className="text-sm font-medium text-gray-500 mt-1">Resposta garantida</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-purple-100">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#111827] mb-1">E-mail</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-purple-600 hover:text-purple-800 text-lg font-medium transition-colors"
                    >
                      {contact.email}
                    </a>
                    <p className="text-sm font-medium text-gray-500 mt-1">Resposta em até 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-purple-100">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#111827] mb-1">Localização</p>
                    <p className="text-lg font-medium text-gray-700">{contact.address}</p>
                    <p className="text-sm font-medium text-gray-500 mt-1">Atendimento presencial</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-gray-100 relative z-10">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Redes Sociais</p>
                <div className="flex gap-4">
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-transparent transition-all hover:-translate-y-1 hover:shadow-lg text-gray-600"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-transparent transition-all hover:-translate-y-1 hover:shadow-lg text-gray-600"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-transparent transition-all hover:-translate-y-1 hover:shadow-lg text-gray-600"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative rounded-[2rem] shadow-2xl p-8 lg:p-10 text-white h-full flex flex-col justify-center overflow-hidden">
              {/* Clean solid Background */}
              <div className="absolute inset-0 bg-[#4C1D95]" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner border border-white/20">
                  <Send className="h-8 w-8 text-white drop-shadow-md" />
                </div>

                <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 tracking-tight leading-[1.2]">
                  Pronta para começar sua jornada?
                </h3>

                <p className="text-purple-100 text-sm lg:text-base mb-8 leading-relaxed font-medium">
                  O primeiro passo é o mais importante. Entre em contato agora mesmo
                  e agende sua primeira consulta. Estou aqui para te acolher.
                </p>

                <div className="space-y-3 mt-auto">
                  <Button
                    size="lg"
                    className="w-full h-12 bg-white text-purple-700 hover:bg-gray-50 font-bold text-base shadow-md transition-all hover:scale-[1.02]"
                    onClick={handleWhatsApp}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mr-3 h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    Chamar no WhatsApp
                  </Button>

                  <Button
                    size="lg"
                    className="w-full h-14 bg-white/10 border border-white/30 text-white hover:bg-white hover:text-purple-700 font-bold text-lg backdrop-blur-sm transition-all hover:scale-[1.02]"
                    onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
                  >
                    <Mail className="mr-3 h-6 w-6" />
                    Enviar E-mail
                  </Button>
                </div>

                <div className="mt-8 flex justify-center items-center gap-2 text-purple-200 text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-pulse" />
                  Atendimento humanizado garantido
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer is now part of the Contact section flow */}
      <div className="mt-8">
        <Footer />
      </div>
    </section>
  )
}
