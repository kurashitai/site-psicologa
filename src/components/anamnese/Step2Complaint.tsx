'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { anamneseStep2Schema, type AnamneseStep2Data } from '@/lib/validations'
import { useAnamneseStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ChevronRight } from 'lucide-react'

interface Step2ComplaintProps {
  onNext: () => void
}

export function Step2Complaint({ onNext }: Step2ComplaintProps) {
  const { formData, updateFormData } = useAnamneseStore()

  const form = useForm<AnamneseStep2Data>({
    resolver: zodResolver(anamneseStep2Schema),
    defaultValues: {
      chiefComplaint: formData.chiefComplaint || '',
      symptomDuration: formData.symptomDuration || '',
      symptomIntensity: formData.symptomIntensity || 5,
      previousTreatment: formData.previousTreatment || false,
      previousTreatmentDetails: formData.previousTreatmentDetails || '',
      expectations: formData.expectations || '',
    },
  })

  const onSubmit = (data: AnamneseStep2Data) => {
    updateFormData(data)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="chiefComplaint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o principal motivo que trouxe você à terapia? *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva com detalhes o que está sentindo e por que decidiu buscar ajuda..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Descreva suas queixas, sintomas e sentimentos principais.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="symptomDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Há quanto tempo você vem sentindo isso? *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 6 meses, 1 ano, algumas semanas..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="symptomIntensity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intensidade dos sintomas (1-10): {field.value}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="py-4"
                />
              </FormControl>
              <FormDescription>
                1 = Muito leve, 10 = Muito intenso
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="previousTreatment"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Já fez tratamento psicológico antes?</FormLabel>
                <FormDescription>
                  Inclui terapia, psiquiatria ou outros atendimentos de saúde mental.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch('previousTreatment') && (
          <FormField
            control={form.control}
            name="previousTreatmentDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conte um pouco sobre o tratamento anterior</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Há quanto tempo, por quanto tempo, com quem, o que funcionou..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="expectations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>O que você espera da terapia? *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="O que gostaria de alcançar, mudar ou desenvolver..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Continuar
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </form>
    </Form>
  )
}
