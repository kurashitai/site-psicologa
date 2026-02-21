'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnamneseStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  User, 
  MessageSquareWarning, 
  Heart, 
  Users, 
  Briefcase, 
  Activity 
} from 'lucide-react'
import { Step1PersonalData } from './Step1PersonalData'
import { Step2Complaint } from './Step2Complaint'
import { Step3HealthHistory } from './Step3HealthHistory'
import { Step4FamilyHistory } from './Step4FamilyHistory'
import { Step5SocialHistory } from './Step5SocialHistory'
import { Step6Evaluation } from './Step6Evaluation'
import { useUIStore } from '@/store/useStore'

const steps = [
  { id: 1, title: 'Dados Pessoais', icon: User },
  { id: 2, title: 'Queixa Principal', icon: MessageSquareWarning },
  { id: 3, title: 'Histórico de Saúde', icon: Heart },
  { id: 4, title: 'Histórico Familiar', icon: Users },
  { id: 5, title: 'Histórico Social', icon: Briefcase },
  { id: 6, title: 'Avaliação', icon: Activity },
]

export function AnamneseForm() {
  const { currentStep, nextStep, prevStep, reset } = useAnamneseStore()
  const { isAnamneseModalOpen, setAnamneseModalOpen } = useUIStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      nextStep()
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      prevStep()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsCompleted(true)
  }

  const handleClose = () => {
    setAnamneseModalOpen(false)
    setTimeout(() => {
      reset()
      setIsCompleted(false)
    }, 300)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalData onNext={handleNext} />
      case 2:
        return <Step2Complaint onNext={handleNext} />
      case 3:
        return <Step3HealthHistory onNext={handleNext} />
      case 4:
        return <Step4FamilyHistory onNext={handleNext} />
      case 5:
        return <Step5SocialHistory onNext={handleNext} />
      case 6:
        return (
          <Step6Evaluation
            onNext={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isAnamneseModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isCompleted ? 'Anamnese Concluída!' : 'Formulário de Anamnese'}
          </DialogTitle>
          <DialogDescription>
            {isCompleted
              ? 'Suas informações foram enviadas com sucesso.'
              : 'Preencha o formulário completo para melhor atendê-lo(a).'}
          </DialogDescription>
        </DialogHeader>

        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Obrigado pelas informações!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Sua anamnese foi enviada e será analisada pela psicóloga. 
              Você receberá um contato em breve para confirmar seu agendamento.
            </p>
            <Button onClick={handleClose} className="bg-purple-600 hover:bg-purple-700">
              Fechar
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  Etapa {currentStep} de {steps.length}
                </span>
                <span>{Math.round(progress)}% concluído</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step indicators */}
            <div className="flex justify-between mb-8 overflow-x-auto pb-2">
              {steps.map((step) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center min-w-[60px]"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-purple-600 text-white'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-1 hidden sm:block ${
                        isActive ? 'text-purple-600 font-medium' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Form content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>

              {currentStep < steps.length ? (
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleNext}
                >
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Anamnese'}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
