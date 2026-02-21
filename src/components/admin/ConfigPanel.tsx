'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Bell,
  Mail,
  Shield,
  Palette,
  Globe,
  Save,
  Loader2,
} from 'lucide-react'

interface ConfigPanelProps {
  open: boolean
  onClose: () => void
}

export function ConfigPanel({ open, onClose }: ConfigPanelProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    darkMode: false,
    language: 'pt-BR',
  })

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Notifications */}
          <div>
            <h4 className="text-sm font-medium text-[#1C1917] mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#5B21B6]" />
              Notificações
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#1C1917]">Notificações por E-mail</p>
                  <p className="text-xs text-[#78716C]">Receba alertas por e-mail</p>
                </div>
                <Switch
                  checked={config.emailNotifications}
                  onCheckedChange={(checked) => 
                    setConfig({ ...config, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#1C1917]">Notificações por SMS</p>
                  <p className="text-xs text-[#78716C]">Receba lembretes por SMS</p>
                </div>
                <Switch
                  checked={config.smsNotifications}
                  onCheckedChange={(checked) => 
                    setConfig({ ...config, smsNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#1C1917]">E-mails de Marketing</p>
                  <p className="text-xs text-[#78716C]">Novidades e dicas</p>
                </div>
                <Switch
                  checked={config.marketingEmails}
                  onCheckedChange={(checked) => 
                    setConfig({ ...config, marketingEmails: checked })
                  }
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-[#1C1917] mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#5B21B6]" />
              Segurança
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#1C1917]">Autenticação em 2 Fatores</p>
                  <p className="text-xs text-[#78716C]">Maior segurança para sua conta</p>
                </div>
                <Switch
                  checked={config.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    setConfig({ ...config, twoFactorAuth: checked })
                  }
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-[#1C1917] mb-4 flex items-center gap-2">
              <Palette className="h-4 w-4 text-[#5B21B6]" />
              Preferências
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#1C1917]">Modo Escuro</p>
                  <p className="text-xs text-[#78716C]">Interface escura</p>
                </div>
                <Switch
                  checked={config.darkMode}
                  onCheckedChange={(checked) => 
                    setConfig({ ...config, darkMode: checked })
                  }
                />
              </div>
              <div>
                <p className="text-sm text-[#1C1917] mb-2">Idioma</p>
                <select 
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                  value={config.language}
                  onChange={(e) => setConfig({ ...config, language: e.target.value })}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
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
