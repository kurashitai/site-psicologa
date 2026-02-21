'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { anamneseStep1Schema, type AnamneseStep1Data, formatCPF, formatZipcode } from '@/lib/validations'
import { useAnamneseStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ChevronRight } from 'lucide-react'

interface Step1PersonalDataProps {
  onNext: () => void
}

export function Step1PersonalData({ onNext }: Step1PersonalDataProps) {
  const { formData, updateFormData } = useAnamneseStore()

  const form = useForm<AnamneseStep1Data>({
    resolver: zodResolver(anamneseStep1Schema),
    defaultValues: {
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : '',
      gender: formData.gender as AnamneseStep1Data['gender'] || undefined,
      cpf: formData.cpf || '',
      rg: formData.rg || '',
      maritalStatus: formData.maritalStatus as AnamneseStep1Data['maritalStatus'] || undefined,
      occupation: formData.occupation || '',
      educationLevel: formData.educationLevel as AnamneseStep1Data['educationLevel'] || undefined,
      addressStreet: formData.addressStreet || '',
      addressNumber: formData.addressNumber || '',
      addressComplement: formData.addressComplement || '',
      addressNeighborhood: formData.addressNeighborhood || '',
      addressCity: formData.addressCity || '',
      addressState: formData.addressState || '',
      addressZipcode: formData.addressZipcode || '',
      emergencyContactName: formData.emergencyContactName || '',
      emergencyContactPhone: formData.emergencyContactPhone || '',
      emergencyContactRelationship: formData.emergencyContactRelationship || '',
    },
  })

  const onSubmit = (data: AnamneseStep1Data) => {
    updateFormData(data)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                    <SelectItem value="prefiro_nao_informar">Prefiro não informar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="000.000.000-00"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatCPF(e.target.value)
                      field.onChange(formatted)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RG</FormLabel>
                <FormControl>
                  <Input placeholder="0000000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                    <SelectItem value="casado">Casado(a)</SelectItem>
                    <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                    <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                    <SelectItem value="uniao_estavel">União Estável</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profissão</FormLabel>
                <FormControl>
                  <Input placeholder="Sua profissão" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Escolaridade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                    <SelectItem value="medio">Ensino Médio</SelectItem>
                    <SelectItem value="superior_incompleto">Superior Incompleto</SelectItem>
                    <SelectItem value="superior_completo">Superior Completo</SelectItem>
                    <SelectItem value="pos_graduacao">Pós-Graduação</SelectItem>
                    <SelectItem value="mestrado">Mestrado</SelectItem>
                    <SelectItem value="doutorado">Doutorado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address section */}
        <div className="pt-4 border-t">
          <h4 className="font-medium text-gray-900 mb-4">Endereço</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="addressZipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000-000"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatZipcode(e.target.value)
                        field.onChange(formatted)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressStreet"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressComplement"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Apto, bloco, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressNeighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="SP" maxLength={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Emergency contact */}
        <div className="pt-4 border-t">
          <h4 className="font-medium text-gray-900 mb-4">Contato de Emergência</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContactRelationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parentesco</FormLabel>
                  <FormControl>
                    <Input placeholder="Mãe, pai, cônjuge..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Continuar
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </form>
    </Form>
  )
}
