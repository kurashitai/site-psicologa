'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import {
    GraduationCap,
    Target,
    Users,
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    Sparkles
} from 'lucide-react'

export function MentorshipSection() {
    const { mentorship } = siteConfig

    const benefits = [
        {
            icon: Target,
            title: 'Direcionamento Claro',
            description: 'Estruturação do seu nicho, posicionamento e objetivos de carreira clínica.',
        },
        {
            icon: Users,
            title: 'Supervisão Prática',
            description: 'Discussão de casos reais com embasamento na Terapia Cognitivo-Comportamental.',
        },
        {
            icon: TrendingUp,
            title: 'Captação Ética',
            description: 'Estratégias validadas para atrair os pacientes certos para o seu consultório.',
        },
    ]

    return (
        <section className="relative py-10 lg:py-16 bg-[#F3E8FF] overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#FAFAF9] to-transparent opacity-80 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col h-full justify-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <span className="text-purple-600 font-bold text-sm uppercase tracking-widest">
                            Para Profissionais
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] mt-2 mb-4 tracking-tight">
                        Eleve sua Prática Clínica
                    </h2>
                    <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed">
                        {mentorship.description}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto items-center">

                    {/* Left Side - Benefits */}
                    <div className="lg:col-span-3 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold text-[#111827] mb-8">Por que investir na Mentoria?</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {benefits.map((benefit, index) => (
                                    <Card key={benefit.title} className="bg-white/70 backdrop-blur border-white/60 shadow-md hover:shadow-lg transition-all rounded-2xl group border-transparent hover:border-purple-200">
                                        <CardHeader className="pb-2">
                                            <div className="w-12 h-12 bg-purple-100 group-hover:bg-[#5B21B6] transition-colors rounded-xl flex items-center justify-center mb-4">
                                                <benefit.icon className="h-6 w-6 text-[#5B21B6] group-hover:text-white transition-colors" />
                                            </div>
                                            <CardTitle className="text-lg text-[#111827]">{benefit.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-[#4B5563] text-sm leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Visual Filler Card */}
                                <Card className="bg-gradient-to-br from-[#5B21B6] to-[#7C3AED] text-white shadow-xl rounded-2xl sm:col-span-2 lg:col-span-1 flex flex-col justify-center items-center p-6 text-center transform lg:translate-y-4">
                                    <GraduationCap className="h-10 w-10 text-purple-200 mb-3" />
                                    <h4 className="font-bold text-lg mb-1">Vagas Limitadas</h4>
                                    <p className="text-purple-200 text-sm">Turmas reduzidas para maior proximidade</p>
                                </Card>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side - Offer Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-white rounded-[2rem] shadow-2xl border border-purple-100 overflow-hidden relative">
                            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#5B21B6] to-[#8B5CF6]" />
                            <CardHeader className="p-8 pb-6 border-b border-gray-100 bg-gray-50/50">
                                <div className="inline-block px-3 py-1 bg-purple-100 text-[#5B21B6] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                    Programa Completo - {mentorship.duration}
                                </div>
                                <CardTitle className="text-2xl font-extrabold text-[#111827] leading-tight">
                                    {mentorship.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-8 pt-6">
                                <div className="mb-6">
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Módulos Inclusos</p>
                                    <ul className="space-y-4">
                                        {mentorship.modules.map((mod) => (
                                            <li key={mod} className="flex items-start gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-[#4B5563] font-medium">{mod}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-6 border-t border-gray-100 mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Investimento</span>
                                        <span className="text-4xl font-extrabold text-[#111827] tracking-tight">
                                            R$ {mentorship.price.toFixed(2).replace('.', ',')}
                                        </span>
                                        <span className="text-xs font-medium tracking-wide text-green-600 mt-1">
                                            Pagamento facilitado em até 12x
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-14 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-lg font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center"
                                    asChild
                                >
                                    <a href={mentorship.checkoutUrl} target="_blank" rel="noopener noreferrer">
                                        Quero me Inscrever Agora
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
