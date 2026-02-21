'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import { useAuthStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const mockPatientUser = {
    id: 'patient-1',
    email: 'paciente@email.com',
    name: 'João Silva',
    role: 'patient' as const,
    phone: '(11) 98888-8888',
    isActive: true,
    consentTerms: true,
    consentPrivacy: true,
    createdAt: new Date(),
    updatedAt: new Date(),
}

export default function PatientLoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { user, isAuthenticated, setUser } = useAuthStore()
    const router = useRouter()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    useEffect(() => {
        if (isAuthenticated && user?.role === 'patient') {
            router.push('/paciente/dashboard')
        }
    }, [isAuthenticated, user, router])

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (data.email === 'paciente@email.com' && data.password === 'paciente123') {
            setUser(mockPatientUser)
            router.push('/paciente/dashboard')
        } else {
            form.setError('root', {
                type: 'manual',
                message: 'E-mail ou senha incorretos. Use paciente@email.com e paciente123 para o teste.',
            })
        }

        setIsLoading(false)
    }

    if (isAuthenticated && user?.role === 'patient') return null

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-[#5B21B6] transition-colors font-medium">
                <ArrowLeft className="w-4 h-4" />
                Voltar para Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src="/icon.png"
                        alt="Logo"
                        width={60}
                        height={60}
                        className="rounded-2xl mb-4 shadow-sm"
                    />
                    <h1 className="text-2xl font-extrabold text-[#111827]">Área do Paciente</h1>
                    <p className="text-[#6B7280] text-sm text-center mt-2">
                        Acesse seu painel para agendar consultas e preencher formulários.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#4B5563] font-bold">E-mail</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                placeholder="seu@email.com"
                                                className="pl-11 h-12 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-purple-500"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#4B5563] font-bold">Senha</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                className="pl-11 pr-11 h-12 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-purple-500"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5B21B6] transition-colors p-1"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.formState.errors.root && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 p-3 rounded-xl"
                            >
                                {form.formState.errors.root.message}
                            </motion.p>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-base font-bold shadow-md transition-all hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                'Acessar Painel'
                            )}
                        </Button>

                        <p className="text-xs text-center text-gray-400 font-medium mt-6">
                            Acesso de teste: paciente@email.com / paciente123
                        </p>
                    </form>
                </Form>
            </motion.div>
        </div>
    )
}
