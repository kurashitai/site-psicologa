'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { anamneseStep4Schema, type AnamneseStep4Data } from '@/lib/validations'
import { useAnamneseStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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
import { ChevronRight } from 'lucide-react'

interface Step4FamilyHistoryProps {
  onNext: () => void
}

const relationshipQualityOptions = [
  'Excelente',
  'Bom',
  'Regular',
  'Ruim',
  'Distante',
  'Conflituoso',
]

export function Step4FamilyHistory({ onNext }: Step4FamilyHistoryProps) {
  const { formData, updateFormData } = useAnamneseStore()

  const form = useForm<AnamneseStep4Data>({
    resolver: zodResolver(anamneseStep4Schema),
    defaultValues: {
      familyRelationship: formData.familyRelationship || '',
      familyConflicts: formData.familyConflicts || '',
      familySupport: formData.familySupport,
    },
  })

  const onSubmit = (data: AnamneseStep4Data) => {
    updateFormData(data)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-purple-800">
            Esta seção nos ajuda a entender sua dinâmica familiar e como ela pode 
            influenciar seu bem-estar emocional. Responda com sinceridade.
          </p>
        </div>

        <FormField
          control={form.control}
          name="familyRelationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Como você descreveria seu relacionamento familiar?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {relationshipQualityOptions.map((option) => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="familyConflicts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Existem conflitos familiares que gostaria de mencionar?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva brevemente os principais conflitos ou dificuldades familiares..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Se preferir, pode discutir isso em detalhes durante as sessões.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="familySupport"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Você sente que tem apoio da família?</FormLabel>
                <FormDescription>
                  Sua família é uma fonte de suporte emocional?
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

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-gray-900">Composição Familiar (Opcional)</h4>
          <p className="text-sm text-gray-500">
            Informações sobre sua família podem ser adicionadas durante as sessões.
          </p>
        </div>

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Continuar
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </form>
    </Form>
  )
}
