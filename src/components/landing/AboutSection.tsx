'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Heart, Lightbulb, Users, Shield } from 'lucide-react'
import { useRef } from 'react'

export function AboutSection() {
  const { professional } = siteConfig
  const sectionRef = useRef<HTMLElement>(null)

  const values = [
    {
      icon: Heart,
      title: 'Acolhimento',
      description: 'Ambiente seguro e acolhedor para você se expressar livremente',
    },
    {
      icon: Lightbulb,
      title: 'Autoconhecimento',
      description: 'Ferramentas para você entender melhor a si mesmo',
    },
    {
      icon: Users,
      title: 'Individualidade',
      description: 'Cada pessoa é única e merece um tratamento personalizado',
    },
    {
      icon: Shield,
      title: 'Sigilo',
      description: 'Total confidencialidade e respeito à sua privacidade',
    },
  ]

  return (
    <section id="sobre" ref={sectionRef} className="relative py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder - space for parallax image to land */}
          <motion.div
            className="relative order-1 lg:order-none flex items-center justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* This space is where the parallax image lands */}
            {/* The actual image is rendered by ParallaxDoctorImage component */}
            {/* Decorative placeholder visible on large screens */}
            <div className="hidden lg:block w-[280px] h-[280px] opacity-0">
              {/* Placeholder keeps grid layout stable */}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Sobre Mim
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              Conheça minha trajetória
            </h2>

            <div className="prose prose-lg text-gray-600 space-y-4">
              {professional.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t">
              <div>
                <p className="text-3xl font-bold text-purple-600">10+</p>
                <p className="text-sm text-gray-500 mt-1">Anos de Experiência</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">500+</p>
                <p className="text-sm text-gray-500 mt-1">Pacientes Atendidos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">1000+</p>
                <p className="text-sm text-gray-500 mt-1">Sessões Realizadas</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                <value.icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-sm text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#5B21B6] rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Minha Metodologia de Atendimento
            </h3>
            <p className="text-purple-100 text-lg leading-relaxed">
              Utilizo uma abordagem integrada, combinando técnicas da Terapia Cognitivo-Comportamental
              com elementos humanistas e mindfulness. Cada sessão é estruturada de acordo com suas
              necessidades específicas, respeitando seu ritmo e objetivos pessoais.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                Sessões Individuais
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                Plano Personalizado
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                Acompanhamento Contínuo
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
