'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useAuthStore, useUIStore } from '@/store/useStore'

// Landing Page Components
import { HeroSection } from '@/components/landing/HeroSection'
import { AboutSection } from '@/components/landing/AboutSection'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { MentorshipSection } from '@/components/landing/MentorshipSection'
import { CoursesSection } from '@/components/landing/CoursesSection'
import { ContactSection } from '@/components/landing/ContactSection'
// Footer imported into ContactSection directly instead
import { WhatsAppButton } from '@/components/landing/WhatsAppButton'

// Dynamic import removed since Parallax is integrated into sections using layoutId

// Auth Components
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'

// Anamnese Components
import { AnamneseForm } from '@/components/anamnese/AnamneseForm'

// Admin Page
import { AdminPage } from '@/components/admin/AdminPage'

// UI Components
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import {
  LogIn,
  UserPlus,
  LogOut,
  FileText,
  Menu,
  X,
} from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const {
    setLoginModalOpen,
    setRegisterModalOpen,
    setAnamneseModalOpen
  } = useUIStore()
  const [showAdmin, setShowAdmin] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: 'hero', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'atendimento', label: 'Atendimento' },
    { id: 'mentoria', label: 'Mentoria' },
    { id: 'cursos', label: 'Cursos' },
    { id: 'contato', label: 'Contato' },
  ]

  // Track current section with Intersection Observer
  useEffect(() => {
    if (showAdmin || !scrollContainerRef.current) return

    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '0px',
      threshold: 0.4
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const index = sections.findIndex(s => s.id === sectionId)
          if (index !== -1) {
            setCurrentSection(index)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const timeoutId = setTimeout(() => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          observer.observe(element)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [showAdmin])

  // Reset section when leaving admin
  const handleBackFromAdmin = useCallback(() => {
    setShowAdmin(false)
    setCurrentSection(0)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [])

  // Smooth scroll to section within the scroll container
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element && scrollContainerRef.current) {
      // Use smooth scroll behavior which takes about 0.8s in most modern browsers
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }, [])

  // Custom scroll locking to prevent native fast scrolling and mimic snap
  const isScrolling = useRef(false)
  const touchStartY = useRef(0)

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (showAdmin || isScrolling.current) return

    // Allow native scrolling inside the section if it has overflow
    // but we use strict section jumping globally
    e.preventDefault()

    // Ignore tiny trackpad movements
    if (Math.abs(e.deltaY) < 20) return

    const direction = e.deltaY > 0 ? 1 : -1
    const nextIndex = Math.max(0, Math.min(sections.length - 1, currentSection + direction))

    if (nextIndex !== currentSection) {
      isScrolling.current = true
      scrollToSection(sections[nextIndex].id)

      setTimeout(() => {
        isScrolling.current = false
      }, 1000)
    }
  }, [currentSection, sections, scrollToSection, showAdmin])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (showAdmin || isScrolling.current) return

    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY

    if (Math.abs(deltaY) > 50) {
      const direction = deltaY > 0 ? 1 : -1
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentSection + direction))

      if (nextIndex !== currentSection) {
        isScrolling.current = true
        scrollToSection(sections[nextIndex].id)

        setTimeout(() => {
          isScrolling.current = false
        }, 1200)
      }
    }
  }, [currentSection, sections, scrollToSection, showAdmin])

  // Handle admin view
  if (showAdmin && user?.role === 'admin') {
    return (
      <>
        <AdminPage onBack={handleBackFromAdmin} />
        <LoginForm />
        <RegisterForm />
        <AnamneseForm />
        <Toaster />
      </>
    )
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FAFAF9]">
      {/* Header Navigation - Fixed with blur */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="bg-[#FAFAF9]/90 backdrop-blur-xl border-b border-gray-200/50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('hero')
              }}
            >
              <Image
                src="/logo-transparent.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-lg text-[#5B21B6]">
                Carolina Mendes
              </span>
            </motion.a>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentSection === index
                    ? 'bg-[#5B21B6] text-white'
                    : 'text-gray-600 hover:text-[#5B21B6] hover:bg-purple-50'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                </motion.button>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Button
                        className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white"
                        onClick={() => setShowAdmin(true)}
                      >
                        Painel Admin
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={logout}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Button
                        variant="outline"
                        onClick={() => setAnamneseModalOpen(true)}
                        className="border-[#5B21B6] text-[#5B21B6] hover:bg-purple-50"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Anamnese
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={logout}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <Button
                    variant="ghost"
                    onClick={() => setLoginModalOpen(true)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Entrar
                  </Button>
                  <Button
                    className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white"
                    onClick={() => setRegisterModalOpen(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Cadastrar
                  </Button>
                </motion.div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAFAF9]/95 backdrop-blur-xl border-b"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-3 rounded-lg text-left font-medium transition-colors ${currentSection === index
                    ? 'bg-[#5B21B6] text-white'
                    : 'text-gray-600 hover:bg-purple-50'
                    }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content - Strict Hidden Global Scroll */}
      <div
        ref={scrollContainerRef}
        className="h-full w-full overflow-hidden"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <LayoutGroup>
          {/* Hero Section */}
          <section id="hero" className="relative z-10 bg-[#FAFAF9] h-screen w-full flex-shrink-0">
            <HeroSection isHeroActive={currentSection === 0} />
          </section>

          {/* About Section */}
          <section id="sobre" className="relative z-10 w-full h-screen overflow-y-auto flex-shrink-0">
            <AboutSection isAboutActive={currentSection === 1} />
          </section>

          {/* Services Section */}
          <section id="atendimento" className="relative w-full h-screen overflow-y-auto flex-shrink-0">
            <ServicesSection />
          </section>

          {/* Mentorship Section */}
          <section id="mentoria" className="relative w-full h-screen overflow-y-auto flex-shrink-0">
            <MentorshipSection />
          </section>

          {/* Courses Section */}
          <section id="cursos" className="relative w-full h-screen overflow-y-auto flex-shrink-0">
            <CoursesSection />
          </section>

          {/* Contact Section */}
          <section id="contato" className="relative w-full h-screen overflow-y-auto flex-shrink-0 bg-[#FAFAF9]">
            <ContactSection />
          </section>
        </LayoutGroup>
      </div>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Modals */}
      <LoginForm />
      <RegisterForm />
      <AnamneseForm />

      {/* Toaster for notifications */}
      <Toaster />
    </div>
  )
}
