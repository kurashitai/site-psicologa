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
  Star
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
    <section id="cursos" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Conhecimento
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Cursos e Produtos Digitais
          </h2>
          <p className="text-gray-600 text-lg">
            Desenvolva seu autoconhecimento com materiais exclusivos criados para 
            transformar sua vida.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <Button
            variant={activeCategory === null ? 'default' : 'outline'}
            className={`rounded-full transition-all duration-300 ${
              activeCategory === null
                ? 'bg-[#5B21B6] text-white shadow-lg shadow-purple-500/25'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveCategory(null)}
          >
            <Star className="h-4 w-4 mr-2" />
            Destaques
          </Button>
          {productCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                className={`rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#5B21B6] text-white shadow-lg shadow-purple-500/25'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {Icon && <Icon className="h-4 w-4 mr-2" />}
                {category.name}
              </Button>
            )
          })}
        </motion.div>

        {/* Products grid - using grid with auto-rows-fr for equal heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500">
            Novos produtos sendo preparados. <span className="text-purple-600 font-medium">Em breve mais conteúdos!</span>
          </p>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="group h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
        {/* Image section with actual product image */}
        <div className="relative h-44 flex-shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={product.thumbnailUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-20">
            <Badge className={`${typeColors[product.type]} text-white border-0 text-xs`}>
              {typeLabels[product.type]}
            </Badge>
            {product.promotionalPrice && (
              <Badge className="bg-red-500 text-white border-0 text-xs">
                -{Math.round((1 - product.promotionalPrice / product.price) * 100)}%
              </Badge>
            )}
          </div>
        </div>

        {/* Content - grows to fill space */}
        <CardContent className="p-4 flex flex-col flex-grow">
          {/* Title and description */}
          <div className="mb-3">
            <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 h-10">
              {product.shortDescription}
            </p>
          </div>

          {/* Meta info - fixed height */}
          <div className="h-6 flex items-center gap-4 text-xs text-gray-400 mb-3">
            {product.duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{product.duration}</span>
              </div>
            )}
            {product.lessonsCount && (
              <div className="flex items-center gap-1">
                <Play className="h-3 w-3" />
                <span>{product.lessonsCount} aulas</span>
              </div>
            )}
          </div>

          {/* Spacer to push price/button to bottom */}
          <div className="flex-grow" />

          {/* Price - fixed height */}
          <div className="h-10 flex items-baseline gap-2 mb-3">
            {product.promotionalPrice ? (
              <>
                <span className="text-gray-400 line-through text-sm">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xl font-bold text-gray-900">
                  R$ {product.promotionalPrice.toFixed(2).replace('.', ',')}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          {/* Button - always at bottom */}
          <Button
            className="w-full h-10 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-sm"
            asChild
          >
            <a href={product.checkoutUrl} target="_blank" rel="noopener noreferrer">
              Saiba Mais
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
