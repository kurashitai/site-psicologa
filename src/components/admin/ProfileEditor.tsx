'use client'

import { useState, useRef } from 'react'
import { useAuthStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  Loader2,
} from 'lucide-react'
import { siteConfig } from '@/config/site'

interface ProfileEditorProps {
  open: boolean
  onClose: () => void
}

export function ProfileEditor({ open, onClose }: ProfileEditorProps) {
  const { user, updateProfile } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: '',
  })
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    updateProfile({
      name: formData.name,
      phone: formData.phone,
      avatarUrl: avatarUrl,
    })

    setIsLoading(false)
    onClose()
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to a server
      // For demo, we'll create a local URL
      const localUrl = URL.createObjectURL(file)
      setAvatarUrl(localUrl)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl || user?.avatarUrl} />
                <AvatarFallback className="bg-[#5B21B6] text-white text-2xl">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#5B21B6] hover:bg-[#4C1D95]"
                onClick={handleAvatarClick}
              >
                <Camera className="h-4 w-4 text-white" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <p className="text-sm text-[#78716C]">Clique para alterar a foto</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#1C1917] mb-1.5 block">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78716C]" />
                <Input
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#1C1917] mb-1.5 block">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78716C]" />
                <Input
                  className="pl-10 bg-gray-50"
                  value={formData.email}
                  disabled
                />
              </div>
              <p className="text-xs text-[#78716C] mt-1">O e-mail não pode ser alterado</p>
            </div>

            <div>
              <label className="text-sm font-medium text-[#1C1917] mb-1.5 block">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78716C]" />
                <Input
                  className="pl-10"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {user?.role === 'admin' && (
              <div>
                <label className="text-sm font-medium text-[#1C1917] mb-1.5 block">
                  Bio Profissional
                </label>
                <Textarea
                  placeholder="Uma breve descrição sobre você..."
                  className="min-h-[100px]"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              className="flex-1 bg-[#5B21B6] hover:bg-[#4C1D95]"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
