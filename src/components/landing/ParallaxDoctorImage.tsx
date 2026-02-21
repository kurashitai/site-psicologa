'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

interface ParallaxDoctorImageProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

export function ParallaxDoctorImage({ scrollContainerRef }: ParallaxDoctorImageProps) {
  const { professional } = siteConfig
  
  // Track window dimensions - start with reasonable defaults
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const prevScrollY = useRef(0)
  
  // Motion values for position control
  const x = useMotionValue(0)
  const scale = useMotionValue(1)
  const opacity = useMotionValue(1)
  
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
    container: scrollContainerRef as React.RefObject<HTMLElement>,
  })

  // Image size based on viewport
  const imageSize = useMemo(() => 
    windowWidth >= 1024 ? 350 : 280
  , [windowWidth])

  // Calculate positions based on container width
  // Hero: right column center, About: left column center
  const containerWidth = useMemo(() => 
    Math.min(windowWidth - 32, 1280)
  , [windowWidth])
  
  const heroX = containerWidth * 0.22
  const aboutX = -containerWidth * 0.22
  const landingThreshold = windowHeight * 0.85

  // Handle scroll animation
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      // Skip if not on desktop
      if (windowWidth < 1024) return
      
      // Clamp progress between 0 and 1
      const progress = Math.min(1, Math.max(0, latest / landingThreshold))
      
      // Calculate current position - this creates the "landing" effect
      // When progress reaches 1, position stays at aboutX
      const currentX = heroX + (aboutX - heroX) * progress
      const currentScale = 1 - (0.15 * progress)
      
      x.set(currentX)
      scale.set(currentScale)
      
      // Fade out when scrolling past About
      if (latest > landingThreshold * 1.3) {
        const fadeProgress = (latest - landingThreshold * 1.3) / (windowHeight * 0.4)
        opacity.set(Math.max(0, 1 - fadeProgress))
      } else {
        opacity.set(1)
      }
      
      prevScrollY.current = latest
    })

    return () => unsubscribe()
  }, [scrollY, windowWidth, windowHeight, heroX, aboutX, landingThreshold, x, scale, opacity])

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
        y: 0,
        scale,
        opacity,
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
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
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
