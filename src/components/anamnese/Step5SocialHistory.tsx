'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { anamneseStep5Schema, type AnamneseStep5Data } from '@/lib/validations'
import { useAnamneseStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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

interface Step5SocialHistoryProps {
  onNext: () => void
}

const workSituationOptions = [
  'Empregado(a) em tempo integral',
  'Empregado(a) em tempo parcial',
  'Autônomo(a)',
  'Desempregado(a)',
  'Estudante',
  'Aposentado(a)',
  'Licença médica',
  'Outro',
]

const relationshipStatusOptions = [
  'Solteiro(a)',
  'Namorando',
  'Noivo(a)',
  'Casado(a)',
  'União estável',
  'Separado(a)',
  'Divorciado(a)',
  'Viúvo(a)',
]

export function Step5SocialHistory({ onNext }: Step5SocialHistoryProps) {
  const { formData, updateFormData } = useAnamneseStore()

  const form = useForm<AnamneseStep5Data>({
    resolver: zodResolver(anamneseStep5Schema),
    defaultValues: {
      childhoodDescription: formData.childhoodDescription || '',
      schoolHistory: formData.schoolHistory || '',
      workHistory: formData.workHistory || '',
      currentWorkSituation: formData.currentWorkSituation || '',
      relationshipStatus: formData.relationshipStatus || '',
      relationshipQuality: formData.relationshipQuality || '',
      childrenCount: formData.childrenCount || 0,
      routineDescription: formData.routineDescription || '',
      hobbies: formData.hobbies || '',
      supportNetwork: formData.supportNetwork || '',
    },
  })

  const onSubmit = (data: AnamneseStep5Data) => {
    updateFormData(data)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Infância e Escolaridade</h4>

          <FormField
            control={form.control}
            name="childhoodDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Como foi sua infância?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva brevemente como foi sua infância, relação com pais, irmãos..."
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
            name="schoolHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Histórico escolar</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Como foi sua experiência escolar, bullying, amigos..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-gray-900">Vida Profissional</h4>

          <FormField
            control={form.control}
            name="currentWorkSituation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Situação profissional atual</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {workSituationOptions.map((option) => (
                      <SelectItem key={option} value={option}>
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
            name="workHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Histórico profissional</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Principais empregos, satisfação no trabalho..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-gray-900">Relacionamentos</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="relationshipStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado de relacionamento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {relationshipStatusOptions.map((option) => (
                        <SelectItem key={option} value={option}>
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
              name="childrenCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de filhos</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="relationshipQuality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualidade do seu relacionamento atual</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Como está seu relacionamento? Se solteiro, como é sua vida afetiva?"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-gray-900">Rotina e Interesses</h4>

          <FormField
            control={form.control}
            name="routineDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Como é sua rotina diária?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva um dia típico na sua vida..."
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
            name="hobbies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hobbies e interesses</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="O que gosta de fazer no tempo livre?"
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
            name="supportNetwork"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rede de apoio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Amigos próximos, pessoas em quem confia..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Pessoas que você pode contar quando precisa de ajuda.
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
