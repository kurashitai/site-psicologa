'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

interface ParallaxDoctorImageProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

export function ParallaxDoctorImage({ scrollContainerRef }: ParallaxDoctorImageProps) {
  const { professional } = siteConfig

  // Track window dimensions - start with reasonable defaults
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

  // Initialize and handle resize
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const { width: windowWidth, height: windowHeight } = windowSize

  // Track scroll within the container
  const { scrollY } = useScroll({
    container: scrollContainerRef as any,
  })

  // Smooth the scroll to eliminate jitter
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  })

  // Image size increased by ~50%
  const imageSize = useMemo(() =>
    windowWidth >= 1024 ? 525 : 420
    , [windowWidth])

  // Calculate positions based on container width
  const containerWidth = useMemo(() =>
    Math.min(windowWidth - 32, 1280)
    , [windowWidth])

  const heroX = containerWidth * 0.22
  const aboutX = -containerWidth * 0.22

  // 64px is about the header height padding (pt-16)
  const landingThreshold = windowHeight - 64

  // Map smooth scroll to x position
  const x = useTransform(
    smoothScrollY,
    [0, landingThreshold],
    [heroX, aboutX],
    { clamp: true }
  )

  // Map smooth scroll to y position
  // From 0 to landingThreshold, it "goes up" by a subtle amount (yOffsetAtAbout)
  // After landingThreshold, it scrolls exactly 1:1 with the page scroll (-1px per 1px scrolled)
  const yOffsetAtAbout = -150
  const y = useTransform(
    smoothScrollY,
    [0, landingThreshold, landingThreshold + 2000],
    [0, yOffsetAtAbout, yOffsetAtAbout - 2000],
    { clamp: false }
  )

  // Map smooth scroll to scale
  // Keep it fairly large to satisfy "aumentar em 50%" over the previous small size
  const scale = useTransform(
    smoothScrollY,
    [0, landingThreshold],
    [1, 0.9],
    { clamp: true }
  )

  // Opacity fade removed: it now naturally scrolls out of the page

  // Don't render on small screens
  if (windowWidth < 1024) {
    return null
  }

  return (
    <motion.div
      className="fixed z-30 pointer-events-none"
      style={{
        left: '50%',
        top: '50vh',
        x,
        y,
        scale,
        marginLeft: -(imageSize / 2),
        marginTop: -(imageSize / 2),
      }}
    >
      <div
        className="relative"
        style={{ width: imageSize, height: imageSize }}
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
      </div>
    </motion.div>
  )
}
