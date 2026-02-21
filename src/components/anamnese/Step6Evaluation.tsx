'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { anamneseStep6Schema, type AnamneseStep6Data } from '@/lib/validations'
import { useAnamneseStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface Step6EvaluationProps {
  onNext: () => void
  isSubmitting: boolean
}

export function Step6Evaluation({ onNext, isSubmitting }: Step6EvaluationProps) {
  const { formData, updateFormData } = useAnamneseStore()

  const form = useForm<AnamneseStep6Data>({
    resolver: zodResolver(anamneseStep6Schema),
    defaultValues: {
      sleepQuality: formData.sleepQuality as AnamneseStep6Data['sleepQuality'] || undefined,
      sleepHours: formData.sleepHours || 7,
      appetite: formData.appetite as AnamneseStep6Data['appetite'] || undefined,
      energyLevel: formData.energyLevel || 5,
      concentrationLevel: formData.concentrationLevel || 5,
      moodDescription: formData.moodDescription || '',
      additionalNotes: formData.additionalNotes || '',
      consentGiven: formData.consentGiven || false,
    },
  })

  const onSubmit = (data: AnamneseStep6Data) => {
    updateFormData(data)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800">
            Última etapa! Estas informações nos ajudam a entender seu estado emocional atual.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Sono e Energia</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="sleepQuality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualidade do sono</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="boa">Boa</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="ruim">Ruim</SelectItem>
                      <SelectItem value="muito_ruim">Muito ruim</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sleepHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas de sono por noite: {field.value}h</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={12}
                      step={1}
                      value={[field.value || 7]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="energyLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nível de energia (1-10): {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[field.value || 5]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="py-4"
                  />
                </FormControl>
                <FormDescription>
                  1 = Muito baixo, 10 = Muito alto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-gray-900">Apetite e Concentração</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="appetite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apetite</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bom">Bom</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="ruim">Ruim</SelectItem>
                      <SelectItem value="variavel">Variável</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="concentrationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível de concentração (1-10): {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[field.value || 5]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-gray-900">Estado Emocional</h4>

          <FormField
            control={form.control}
            name="moodDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Como você descreveria seu humor atual?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva como você tem se sentido emocionalmente..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações adicionais</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Há algo mais que gostaria de compartilhar?"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* LGPD Consent */}
        <div className="pt-4 border-t">
          <FormField
            control={form.control}
            name="consentGiven"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-tight">
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    Declaro que as informações fornecidas são verdadeiras e autorizo 
                    o tratamento destes dados para fins de atendimento psicológico, 
                    conforme a{' '}
                    <a href="#" className="text-purple-600 hover:underline">
                      Lei Geral de Proteção de Dados (LGPD)
                    </a>.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar Anamnese'
          )}
        </Button>
      </form>
    </Form>
  )
}
