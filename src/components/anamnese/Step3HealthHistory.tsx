'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { anamneseStep3Schema, type AnamneseStep3Data } from '@/lib/validations'
import { useAnamneseStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
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

interface Step3HealthHistoryProps {
  onNext: () => void
}

const drugTypes = [
  'Maconha',
  'Cocaína',
  'Crack',
  'Ecstasy',
  'LSD',
  'Anfetaminas',
  'Benzodiazepínicos (sem prescrição)',
  'Outros',
]

const frequencyOptions = [
  'Nunca usei',
  'Uso ocasional',
  'Uso semanal',
  'Uso diário',
  'Ex-usuário (em recuperação)',
]

export function Step3HealthHistory({ onNext }: Step3HealthHistoryProps) {
  const { formData, updateFormData } = useAnamneseStore()

  const form = useForm<AnamneseStep3Data>({
    resolver: zodResolver(anamneseStep3Schema),
    defaultValues: {
      currentDiseases: formData.currentDiseases || '',
      currentMedications: formData.currentMedications || '',
      allergies: formData.allergies || '',
      previousHospitalizations: formData.previousHospitalizations || '',
      alcoholUse: formData.alcoholUse || false,
      alcoholFrequency: formData.alcoholFrequency || '',
      tobaccoUse: formData.tobaccoUse || false,
      tobaccoFrequency: formData.tobaccoFrequency || '',
      drugsUse: formData.drugsUse || false,
      drugsTypes: formData.drugsTypes || [],
      drugsFrequency: formData.drugsFrequency || '',
      familyHistoryMentalIllness: formData.familyHistoryMentalIllness || '',
    },
  })

  const onSubmit = (data: AnamneseStep3Data) => {
    updateFormData(data)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Saúde Física</h4>

          <FormField
            control={form.control}
            name="currentDiseases"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doenças atuais ou diagnosticadas</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Liste doenças, condições de saúde crônicas..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentMedications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medicamentos em uso</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nome dos medicamentos e dosagens..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alergias</FormLabel>
                  <FormControl>
                    <Input placeholder="Alergias conhecidas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="previousHospitalizations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Internações anteriores</FormLabel>
                  <FormControl>
                    <Input placeholder="Motivo e período" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-gray-900">Uso de Substâncias</h4>

          {/* Alcohol */}
          <FormField
            control={form.control}
            name="alcoholUse"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Consome bebida alcoólica?</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch('alcoholUse') && (
            <FormField
              control={form.control}
              name="alcoholFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência de consumo de álcool</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frequencyOptions.map((freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Tobacco */}
          <FormField
            control={form.control}
            name="tobaccoUse"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Fuma tabaco/cigarro?</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch('tobaccoUse') && (
            <FormField
              control={form.control}
              name="tobaccoFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência de consumo de tabaco</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frequencyOptions.map((freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Drugs */}
          <FormField
            control={form.control}
            name="drugsUse"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Já usou ou usa drogas ilícitas?</FormLabel>
                  <FormDescription>
                    Esta informação é confidencial e ajuda no tratamento.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch('drugsUse') && (
            <>
              <FormField
                control={form.control}
                name="drugsTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quais substâncias?</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {drugTypes.map((drug) => (
                        <FormItem
                          key={drug}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(drug)}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || []
                                if (checked) {
                                  field.onChange([...currentValue, drug])
                                } else {
                                  field.onChange(
                                    currentValue.filter((v: string) => v !== drug)
                                  )
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {drug}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="drugsFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequência de uso</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {frequencyOptions.map((freq) => (
                          <SelectItem key={freq} value={freq}>
                            {freq}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-gray-900">Histórico Familiar de Saúde Mental</h4>

          <FormField
            control={form.control}
            name="familyHistoryMentalIllness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Há histórico de doenças mentais na família?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex: depressão, ansiedade, bipolaridade... Quem na família?"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Esta informação é confidencial e ajuda no diagnóstico.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Continuar
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </form>
    </Form>
  )
}
