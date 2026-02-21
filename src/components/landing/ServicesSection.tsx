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
      description: 'Atendimento por videoconferência com a mesma qualidade do presencial. Ideal para quem busca flexibilidade e conforto de casa.',
      features: [
        'Sessões de 50 minutos',
        'Plataforma segura e criptografada',
        'Horários flexíveis',
        'Sem necessidade de deslocamento',
      ],
      price: pricing.sessionOnline,
      schedule: schedule.online,
      type: 'online',
      gradient: 'bg-indigo-50/50',
      lightGradient: 'bg-gray-50',
      borderColor: 'border-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      icon: MapPin,
      title: 'Terapia Presencial',
      description: 'Atendimento em consultório preparado com muito carinho para proporcionar conforto e máxima privacidade.',
      features: [
        'Sessões de 50 minutos',
        'Ambiente acolhedor',
        'Atendimento personalizado',
        'Contato direto e presencial',
      ],
      price: pricing.sessionPresencial,
      schedule: schedule.presencial,
      type: 'presencial',
      gradient: 'bg-purple-50/50',
      lightGradient: 'bg-gray-50',
      borderColor: 'border-purple-100',
      iconColor: 'text-purple-600',
    },
  ]

  const handleWhatsApp = () => {
    const message = encodeURIComponent(whatsapp.defaultMessage)
    window.open(`https://wa.me/${contact.whatsapp}?text=${message}`, '_blank')
  }

  return (
    <section id="atendimento" className="relative py-10 lg:py-16 bg-[#FAFAF9] overflow-hidden flex flex-col justify-center min-h-screen">
      {/* Clean Background */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-purple-600 font-bold text-sm uppercase tracking-widest">
            Atendimento
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mt-2 mb-4 tracking-tight">
            Escolha a melhor opção
          </h2>
          <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed">
            Ofereço modalidades flexíveis de atendimento terapêutico para que você possa focar
            exclusivamente no seu processo de autoconhecimento.
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12 auto-rows-fr">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="h-full"
            >
              <Card className="group h-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-2 rounded-3xl">
                {/* Header without strong gradient */}
                <div className={`p-6 border-b border-gray-100 relative flex-shrink-0 bg-white`}>

                  <div className="relative flex items-center gap-4 z-10">
                    <div className={`w-12 h-12 ${service.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 border ${service.borderColor}`}>
                      <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">{service.title}</h3>
                      <p className="text-[#6B7280] text-sm font-medium mt-0.5">{service.schedule}</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <CardContent className="p-6 flex flex-col flex-grow bg-white">
                  <p className="text-[#4B5563] text-sm leading-relaxed mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <div className="mt-0.5 rounded-full bg-green-50 p-0.5">
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                        </div>
                        <span className="text-[#4B5563] text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Spacer to push price and button to bottom */}
                  <div className="flex-grow" />

                  {/* Price */}
                  <div className={`${service.lightGradient} rounded-xl p-4 mb-5 border border-gray-100 shadow-sm`}>
                    <p className="text-xs font-semibold text-[#6B7280] mb-1 uppercase tracking-wider">Valor por sessão</p>
                    <p className="text-3xl font-extrabold text-[#111827] tracking-tight">
                      R$ {service.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full h-12 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-base font-bold shadow-md transition-all hover:scale-[1.02]"
                    onClick={handleWhatsApp}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Agendar {service.type === 'online' ? 'Online' : 'Presencial'}
                    <ArrowRight className="ml-2 h-5 w-5" />
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
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[2rem] p-6 md:p-10 shadow-lg border border-gray-100 relative"
        >

          <h3 className="text-2xl font-extrabold text-[#111827] text-center mb-8 tracking-tight">
            Como Funciona o Agendamento
          </h3>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto relative z-10">
            {[
              {
                step: 1,
                icon: MessageCircle,
                title: 'Contato',
                description: 'Me chame no WhatsApp',
                color: 'from-blue-500 to-indigo-500',
              },
              {
                step: 2,
                icon: Calendar,
                title: 'Agendamento',
                description: 'Escolha o melhor horário',
                color: 'from-purple-500 to-fuchsia-500',
              },
              {
                step: 3,
                icon: CreditCard,
                title: 'Pagamento',
                description: 'Confirmação via PIX',
                color: 'from-rose-400 to-orange-500',
              },
              {
                step: 4,
                icon: Clock,
                title: 'Sessão',
                description: 'Início do atendimento',
                color: 'from-emerald-400 to-teal-500',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                whileHover={{ y: -5 }}
                className="relative text-center group cursor-default"
              >
                {/* Connecting Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-[1.75rem] left-[60%] w-[80%] h-0.5 bg-gray-100">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-200 to-transparent w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                )}

                <div className="relative inline-flex mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-100 text-[#111827] text-xs font-black rounded-full flex items-center justify-center shadow-sm">
                    {item.step}
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#111827] mb-1">{item.title}</h4>
                <p className="text-xs font-medium text-[#6B7280]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
