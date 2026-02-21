'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products, productCategories, type Product } from '@/config/products'
import {
  GraduationCap,
  BookOpen,
  Headphones,
  Users,
  Clock,
  Play,
  ArrowRight,
  Star,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

const iconMap = {
  GraduationCap,
  BookOpen,
  Headphones,
  Users,
}

export function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const featuredProducts = products.filter((p) => p.isFeatured && p.isActive)
  const filteredProducts = activeCategory
    ? products.filter((p) => p.type === activeCategory && p.isActive)
    : featuredProducts

  return (
    <section id="cursos" className="relative py-10 lg:py-16 bg-white overflow-hidden flex flex-col justify-center min-h-screen">
      {/* Clean Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gray-100 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="text-purple-600 font-bold text-sm uppercase tracking-widest">
              Conhecimento
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4 tracking-tight">
            Cursos e Produtos Digitais
          </h2>
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
            Desenvolva seu autoconhecimento com materiais curados e exclusivos, criados para
            transformar sua vida e te acompanhar no dia a dia.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <Button
            variant={activeCategory === null ? 'default' : 'outline'}
            className={`rounded-full px-5 py-5 text-sm font-medium transition-all duration-300 ${activeCategory === null
              ? 'bg-[#5B21B6] text-white shadow-md scale-105 border-transparent'
              : 'hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border-gray-200 text-gray-600'
              }`}
            onClick={() => setActiveCategory(null)}
          >
            <Star className={`h-4 w-4 mr-2 ${activeCategory === null ? 'text-yellow-300' : ''}`} />
            Destaques
          </Button>
          {productCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                className={`rounded-full px-6 py-6 font-medium transition-all duration-300 ${activeCategory === category.id
                  ? 'bg-[#5B21B6] text-white shadow-md scale-105 border-transparent'
                  : 'hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border-gray-200 text-gray-600'
                  }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {Icon && <Icon className="h-4 w-4 mr-2" />}
                {category.name}
              </Button>
            )
          })}
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr max-w-6xl mx-auto">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-50 rounded-full border border-purple-100 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            <p className="text-gray-600 font-medium">
              Novos produtos sendo preparados. <span className="text-purple-700 font-bold">Em breve mais conteúdos!</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const typeLabels = {
    course: 'Curso',
    ebook: 'E-book',
    audio: 'Áudio',
    mentorship: 'Mentoria',
  }

  const typeColors = {
    course: 'bg-blue-500',
    ebook: 'bg-green-500',
    audio: 'bg-purple-500',
    mentorship: 'bg-orange-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="h-full"
    >
      <Card className="group h-full bg-white border border-gray-100 shadow-md hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-2 rounded-3xl">
        {/* Image section with actual product image */}
        <div className="relative h-56 flex-shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={product.thumbnailUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-60" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            <Badge className={`${typeColors[product.type]} text-white border-0 text-xs px-3 py-1 font-bold shadow-md`}>
              {typeLabels[product.type]}
            </Badge>
            {product.promotionalPrice && (
              <Badge className="bg-red-500 text-white border-0 text-xs px-3 py-1 font-bold shadow-md animate-pulse">
                -{Math.round((1 - product.promotionalPrice / product.price) * 100)}%
              </Badge>
            )}
          </div>
        </div>

        {/* Content - grows to fill space */}
        <CardContent className="p-6 flex flex-col flex-grow">
          {/* Title and description */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 h-10 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Meta info - fixed height */}
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
            {product.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-purple-500" />
                <span>{product.duration}</span>
              </div>
            )}
            {product.lessonsCount && (
              <div className="flex items-center gap-1.5 border-l border-gray-200 pl-4">
                <Play className="h-4 w-4 text-indigo-500" />
                <span>{product.lessonsCount} aulas</span>
              </div>
            )}
          </div>

          {/* Spacer to push price/button to bottom */}
          <div className="flex-grow" />

          {/* Price - fixed height */}
          <div className="flex items-end gap-3 mb-6">
            {product.promotionalPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through text-sm font-medium">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-3xl font-extrabold text-[#111827] tracking-tight">
                  R$ {product.promotionalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-transparent">Valor</span>
                <span className="text-3xl font-extrabold text-[#111827] tracking-tight">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}
          </div>

          {/* Button - always at bottom */}
          <Button
            className="w-full h-12 bg-[#5B21B6] hover:bg-[#4C1D95] text-white font-bold text-base shadow-md transition-all hover:scale-[1.02]"
            asChild
          >
            <a href={product.checkoutUrl} target="_blank" rel="noopener noreferrer">
              Saiba Mais
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
