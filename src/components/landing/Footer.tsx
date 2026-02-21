'use client'

import { siteConfig } from '@/config/site'
import { Instagram, Linkedin, Youtube, Heart } from 'lucide-react'

export function Footer() {
  const { name, professional, contact, social } = siteConfig
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-[#1e1136] text-white border-t border-purple-900/30">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{professional.name}</h3>
            <p className="text-gray-400 mb-2 font-medium">{professional.specialty}</p>
            <p className="text-purple-400 mb-4 text-sm font-semibold tracking-wide">{professional.crp}</p>
            <p className="text-gray-300 text-sm max-w-md leading-relaxed">
              Transformando vidas através da psicologia. Atendimento humanizado
              e acolhedor para você alcançar seu equilíbrio emocional e bem-estar.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-purple-600 hover:scale-110 transition-all text-gray-300 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-purple-600 hover:scale-110 transition-all text-gray-300 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-purple-600 hover:scale-110 transition-all text-gray-300 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 opacity-0 transition-opacity"></span>
                  Sobre Mim
                </a>
              </li>
              <li>
                <a href="#atendimento" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 opacity-0 transition-opacity"></span>
                  Atendimento
                </a>
              </li>
              <li>
                <a href="#cursos" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 opacity-0 transition-opacity"></span>
                  Cursos
                </a>
              </li>
              <li>
                <a href="#contato" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 opacity-0 transition-opacity"></span>
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{contact.phone}</li>
              <li>{contact.email}</li>
              <li>{contact.address}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} {professional.name}. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
            </div>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Feito com <Heart className="h-4 w-4 text-red-500" /> por Dra. Carolina
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
