import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface CodeDialogProps {
  isOpen: boolean
  onClose: () => void
  onCodeSubmit: (code: string) => { success: boolean; gameIds: number[] }
}

export function CodeDialog({ isOpen, onClose, onCodeSubmit }: CodeDialogProps) {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (!code.trim()) return
    
    setIsLoading(true)
    setMessage('')
    
    setTimeout(() => {
      const result = onCodeSubmit(code.trim())
      
      if (result.success) {
        setMessage(`🎉 Код принят! Разблокировано игр: ${result.gameIds.length}`)
        setTimeout(() => {
          setCode('')
          setMessage('')
          onClose()
        }, 2000)
      } else {
        setMessage('❌ Неверный код! Попробуйте еще раз.')
      }
      
      setIsLoading(false)
    }, 1000)
  }

  const handleClose = () => {
    setCode('')
    setMessage('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-full">
              <Icon name="Shield" size={18} className="text-white" />
            </div>
            Секретный код доступа
          </DialogTitle>
          <DialogDescription>
            Введите код для разблокировки премиум игр
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Icon name="Key" size={18} className="absolute left-3 top-3 text-muted-foreground" />
            <Input
              id="code"
              placeholder="Введите секретный код..."
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={isLoading}
            />
          </div>
          
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes('🎉') 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message}
            </div>
          )}
          
          <div className="bg-card/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Icon name="Lightbulb" size={16} />
              Подсказки:
            </h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>💡 NEON + текущий год</div>
              <div>🕹️ RETRO + год появления NES</div>
              <div>🚀 FUTURE + измерение</div>
              <div>🔮 Популярный фильм про хакеров</div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!code.trim() || isLoading}
            className="bg-gradient-to-r from-primary to-secondary"
          >
            {isLoading ? (
              <Icon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <Icon name="Unlock" size={16} />
            )}
            {isLoading ? 'Проверка...' : 'Разблокировать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}