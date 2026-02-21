'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, Phone, Video, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config/site'
import Image from 'next/image'

interface HeroSectionProps {
  isHeroActive?: boolean;
}

export function HeroSection({ isHeroActive = true }: HeroSectionProps) {
  const { professional, contact, whatsapp } = siteConfig
  const sectionRef = useRef<HTMLElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleWhatsApp = () => {
    const message = encodeURIComponent(whatsapp.defaultMessage)
    window.open(`https://wa.me/${contact.whatsapp}?text=${message}`, '_blank')
  }

  // Scroll progress for this section - used for content animation only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Content transforms - fades as user scrolls
  const rawOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 })

  // During SSR, use opacity 1 to avoid hydration mismatch
  const opacityValue = isMounted ? contentOpacity : 1

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-[#FAFAF9] pt-20 pb-10">
      {/* Clean Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF9] to-[#F3E8FF] opacity-50" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
            style={isMounted ? { opacity: opacityValue } : undefined}
          >
            {/* Professional Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-8 cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Atendimento Online e Presencial
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#111827] mb-6 leading-[1.1] tracking-tight">
              {professional.name.split(' ').map((word, i) => (
                <span key={i} className={i === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#5B21B6] to-[#8B5CF6] mr-3" : "mr-3"}>
                  {word}
                </span>
              ))}
            </h1>

            <p className="text-2xl md:text-3xl text-[#4C1D95] font-semibold mb-4 tracking-tight">
              {professional.specialty}
            </p>

            <p className="text-[#6B7280] font-medium mb-8 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-8 h-[1px] bg-purple-200 hidden sm:block"></span>
              {professional.crp}
              <span className="w-8 h-[1px] bg-purple-200 hidden sm:block"></span>
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {professional.approaches.map((approach, idx) => (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  key={approach}
                  className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-2xl text-sm font-medium text-[#4B5563] border border-white/60 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-default"
                >
                  {approach}
                </motion.span>
              ))}
            </div>

            <p className="text-[#4B5563] text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {professional.experience} ajudando pessoas a superarem desafios emocionais
              e desenvolverem todo o seu potencial humano.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-8 py-7 text-lg rounded-full shadow-md transition-all hover:scale-[1.02] font-bold"
                onClick={handleWhatsApp}
              >
                <Calendar className="mr-3 h-5 w-5" />
                <span>Agendar Consulta</span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group px-8 py-7 text-lg rounded-full border-2 border-[#5B21B6]/20 bg-white/50 backdrop-blur-sm text-[#5B21B6] hover:bg-[#5B21B6] hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg"
                onClick={() => {
                  const aboutSection = document.getElementById('sobre')
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <span className="font-medium mr-2">Conhecer Mais</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Quick info */}
            <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start text-sm font-medium text-[#6B7280]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Video className="h-5 w-5 text-[#8B5CF6]" />
                </div>
                <span>Terapia Online</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-[#3B82F6]" />
                </div>
                <span>Atendimento Presencial</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Space for image */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            style={isMounted ? { opacity: opacityValue } : undefined}
          >
            <AnimatePresence mode="popLayout">
              {isHeroActive && (
                <motion.div
                  layoutId="doctor-image"
                  className="relative w-[525px] h-[525px] flex-shrink-0 z-[100]"
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
            {!isHeroActive && <div className="w-[525px] h-[525px] flex-shrink-0" />}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-semibold tracking-widest text-[#9CA3AF] uppercase">Rolar</span>
        <div className="w-6 h-10 border-2 border-[#D1D5DB] rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2 bg-[#8B5CF6] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
