'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import { useAuthStore, useUIStore } from '@/store/useStore'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react'

// Mock user for demo
const mockAdminUser = {
  id: 'admin-1',
  email: 'admin@dracarolina.com.br',
  name: 'Dra. Carolina Mendes',
  role: 'admin' as const,
  phone: '(11) 99999-9999',
  isActive: true,
  consentTerms: true,
  consentPrivacy: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

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

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useAuthStore()
  const { isLoginModalOpen, setLoginModalOpen, setRegisterModalOpen, closeAllModals } = useUIStore()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Mock authentication
    if (data.email === 'admin@dracarolina.com.br' && data.password === 'admin123') {
      setUser(mockAdminUser)
      closeAllModals()
    } else if (data.email === 'paciente@email.com' && data.password === 'paciente123') {
      setUser(mockPatientUser)
      closeAllModals()
    } else {
      form.setError('root', {
        type: 'manual',
        message: 'E-mail ou senha incorretos. Use admin@dracarolina.com.br / admin123 ou paciente@email.com / paciente123',
      })
    }
    
    setIsLoading(false)
  }

  const handleSwitchToRegister = () => {
    setLoginModalOpen(false)
    setRegisterModalOpen(true)
  }

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={setLoginModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Entrar</DialogTitle>
          <DialogDescription>
            Acesse sua área do paciente ou painel administrativo.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="seu@email.com"
                        className="pl-10"
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
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
                className="text-sm text-red-500 bg-red-50 p-3 rounded-lg"
              >
                {form.formState.errors.root.message}
              </motion.p>
            )}

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleSwitchToRegister}
            >
              Criar uma conta
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Acesso demo: admin@dracarolina.com.br / admin123
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
