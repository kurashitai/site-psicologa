'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { 
  Video, 
  MapPin, 
  CheckCircle2,
  Calendar,
  MessageCircle,
  CreditCard,
  Clock,
  ArrowRight
} from 'lucide-react'

export function ServicesSection() {
  const { schedule, pricing, whatsapp, contact } = siteConfig

  const services = [
    {
      icon: Video,
      title: 'Terapia Online',
      description: 'Atendimento por videoconferência, com a mesma qualidade do presencial. Ideal para quem tem agenda flexível ou mora em outra cidade.',
      features: [
        'Sessões de 50 minutos',
        'Plataforma segura e criptografada',
        'Horários flexíveis',
        'Sem necessidade de deslocamento',
      ],
      price: pricing.sessionOnline,
      schedule: schedule.online,
      type: 'online',
      gradient: 'from-blue-500 to-indigo-600',
      lightGradient: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: MapPin,
      title: 'Terapia Presencial',
      description: 'Atendimento em consultório, com ambiente acolhedor e preparado para proporcionar conforto e privacidade.',
      features: [
        'Sessões de 50 minutos',
        'Ambiente acolhedor',
        'Atendimento personalizado',
        'Contato direto com a terapeuta',
      ],
      price: pricing.sessionPresencial,
      schedule: schedule.presencial,
      type: 'presencial',
      gradient: 'from-purple-500 to-pink-600',
      lightGradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ]

  const handleWhatsApp = () => {
    const message = encodeURIComponent(whatsapp.defaultMessage)
    window.open(`https://wa.me/${contact.whatsapp}?text=${message}`, '_blank')
  }

  return (
    <section id="atendimento" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Atendimento
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Escolha a melhor opção para você
          </h2>
          <p className="text-gray-600 text-lg">
            Ofereço atendimento online e presencial, para que você possa escolher 
            a modalidade que melhor se adapta à sua rotina.
          </p>
        </motion.div>

        {/* Services Cards - equal heights */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20 auto-rows-fr">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="h-full"
            >
              <Card className="group h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                {/* Header with gradient - fixed height */}
                <div className={`bg-gradient-to-r ${service.gradient} p-5 text-white relative overflow-hidden flex-shrink-0`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                      <p className="text-white/80 text-sm">{service.schedule}</p>
                    </div>
                  </div>
                </div>

                {/* Body - grows to fill */}
                <CardContent className="p-5 flex flex-col flex-grow">
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                  {/* Features - fixed structure */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Spacer */}
                  <div className="flex-grow" />

                  {/* Price - fixed height */}
                  <div className={`bg-gradient-to-r ${service.lightGradient} rounded-xl p-3 mb-4`}>
                    <p className="text-xs text-gray-500 mb-0.5">Valor por sessão</p>
                    <p className="text-2xl font-bold text-gray-900">
                      R$ {service.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* Button - always at bottom */}
                  <Button
                    className={`w-full h-11 bg-gradient-to-r ${service.gradient} text-white`}
                    onClick={handleWhatsApp}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar {service.type === 'online' ? 'Online' : 'Presencial'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Como Funciona
          </h3>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                icon: MessageCircle,
                title: 'Entre em Contato',
                description: 'Me chame no WhatsApp para agendar',
                color: 'from-blue-500 to-blue-600',
              },
              {
                step: 2,
                icon: Calendar,
                title: 'Agende sua Sessão',
                description: 'Escolha o melhor horário',
                color: 'from-purple-500 to-purple-600',
              },
              {
                step: 3,
                icon: CreditCard,
                title: 'Confirme o Pagamento',
                description: 'PIX ou transferência',
                color: 'from-green-500 to-green-600',
              },
              {
                step: 4,
                icon: Clock,
                title: 'Compareça à Sessão',
                description: 'No horário marcado',
                color: 'from-orange-500 to-orange-600',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-100" />
                )}
                
                <div className="relative inline-flex mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${item.color} text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md`}>
                    {item.step}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
