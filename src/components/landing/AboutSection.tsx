'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Heart, Lightbulb, Users, Shield, Sparkles } from 'lucide-react'
import { useRef } from 'react'

import Image from 'next/image'

interface AboutSectionProps {
  isAboutActive?: boolean;
}

export function AboutSection({ isAboutActive = false }: AboutSectionProps) {
  const { professional } = siteConfig
  const sectionRef = useRef<HTMLElement>(null)

  const values = [
    {
      icon: Heart,
      title: 'Acolhimento',
      description: 'Ambiente seguro e empático para você se expressar livremente e sem julgamentos',
    },
    {
      icon: Lightbulb,
      title: 'Autoconhecimento',
      description: 'Ferramentas embasadas para você entender padrões e descobrir seu potencial',
    },
    {
      icon: Users,
      title: 'Individualidade',
      description: 'Cada pessoa é única, recebendo um plano terapêutico 100% personalizado',
    },
    {
      icon: Shield,
      title: 'Sigilo',
      description: 'Total confidencialidade, respeito à sua privacidade e ética profissional',
    },
  ]

  return (
    <section id="sobre" ref={sectionRef} className="relative py-6 lg:py-10 bg-white min-h-screen flex flex-col justify-center">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-[#FAFAF9]" />

      <div className="container mx-auto px-4 relative z-10 my-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Photo Container -> Destino da animação do Hero */}
          <motion.div
            className="relative order-1 lg:order-none flex items-center justify-center lg:min-w-[420px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="popLayout">
              {isAboutActive && (
                <motion.div
                  layoutId="doctor-image"
                  className="hidden lg:block relative w-[340px] h-[340px] z-[100]"
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                >
                  {/* Decorative circle */}
                  <div className="absolute inset-0 bg-[#E9D5FF] rounded-full transform rotate-3 scale-105 opacity-30" />
                  {/* Photo container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-2xl">
                    <Image
                      src={professional.photoUrl}
                      alt={professional.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!isAboutActive && <div className="hidden lg:block w-[340px] h-[340px]" />}

            {/* Mobile version - sem layoutId, sempre renderiza */}
            <div className="lg:hidden relative w-[280px] h-[280px] z-20 mb-8 mt-4">
              <div className="absolute inset-0 bg-[#E9D5FF] rounded-full transform rotate-3 scale-105 opacity-30" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-[4px] border-white shadow-2xl">
                <Image
                  src={professional.photoUrl}
                  alt={professional.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Very subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-purple-100/30 rounded-full blur-[60px] pointer-events-none hidden lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-purple-600 font-bold text-xs uppercase tracking-widest">
                Sobre Mim
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Conheça minha trajetória
            </h2>

            <div className="prose prose-base text-gray-600 space-y-3 leading-relaxed">
              {professional.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                <p className="text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">10+</p>
                <p className="text-[10px] lg:text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">Anos de Experiência</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                <p className="text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">500+</p>
                <p className="text-[10px] lg:text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">Pacientes Atendidos</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                <p className="text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">10k+</p>
                <p className="text-[10px] lg:text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">Sessões Realizadas</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-100 rounded-3xl p-5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-purple-100 transition-all group lg:min-h-[160px]"
            >
              <div className="w-10 h-10 bg-purple-50 group-hover:bg-purple-600 transition-colors rounded-xl flex items-center justify-center mb-4">
                <value.icon className="h-5 w-5 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-snug">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Methodology */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-10 rounded-[2rem] p-6 lg:p-8 text-white overflow-hidden shadow-xl"
        >
          {/* Clean elegant background */}
          <div className="absolute inset-0 bg-[#4C1D95]" />

          <div className="relative max-w-4xl mx-auto text-center z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">
              Minha Metodologia de Atendimento
            </h3>
            <p className="text-purple-100 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium">
              Utilizo uma abordagem integrada, combinando técnicas da Terapia Cognitivo-Comportamental
              com elementos humanistas e mindfulness. Cada sessão é estruturada de acordo com suas
              necessidades específicas, promovendo resultados profundos num ambiente sem julgamentos.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <span className="px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-full font-medium backdrop-blur-md shadow-lg">
                Sessões Individuais
              </span>
              <span className="px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-full font-medium backdrop-blur-md shadow-lg">
                Plano Terapêutico
              </span>
              <span className="px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-full font-medium backdrop-blur-md shadow-lg">
                Acompanhamento Contínuo
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
