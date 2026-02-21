'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, Phone, Video } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function HeroSection() {
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
    <section ref={sectionRef} className="relative h-full flex items-center justify-center overflow-hidden bg-[#FAFAF9]">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F3E8FF] via-[#FAFAF9] to-[#E9D5FF] opacity-50" />

        {/* Decorative circles with parallax effect */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-[#E9D5FF] rounded-full opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#DBEAFE] rounded-full opacity-30"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
            style={isMounted ? { opacity: opacityValue } : undefined}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9D5FF] text-[#5B21B6] text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-[#5B21B6] rounded-full animate-pulse" />
              Atendimento Online e Presencial
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] mb-6 leading-tight">
              {professional.name}
            </h1>

            <p className="text-xl md:text-2xl text-[#5B21B6] font-medium mb-4">
              {professional.specialty}
            </p>

            <p className="text-[#78716C] mb-2">
              {professional.crp}
            </p>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {professional.approaches.map((approach) => (
                <span
                  key={approach}
                  className="px-3 py-1.5 bg-white rounded-full text-sm text-[#1C1917] shadow-sm border border-gray-100"
                >
                  {approach}
                </span>
              ))}
            </div>

            <p className="text-[#78716C] text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              {professional.experience} ajudando pessoas a superarem desafios emocionais
              e desenvolverem todo o seu potencial.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-200"
                onClick={handleWhatsApp}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Consulta
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-2 border-[#5B21B6] text-[#5B21B6] hover:bg-purple-50"
                onClick={() => {
                  const aboutSection = document.getElementById('sobre')
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Conhecer Mais
              </Button>
            </div>

            {/* Quick info */}
            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-[#78716C]">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-[#5B21B6]" />
                <span>Terapia Online</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#5B21B6]" />
                <span>Atendimento Presencial</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Space for parallax image (image is rendered by ParallaxDoctorImage) */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            style={isMounted ? { opacity: opacityValue } : undefined}
          >
            {/* Placeholder to maintain grid layout - parallax image renders on top */}
            <div className="w-[350px] h-[350px]" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#78716C] rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-[#78716C] rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
