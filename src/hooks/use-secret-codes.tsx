import { useState, useCallback } from 'react'

export interface SecretCode {
  code: string
  gameIds: number[]
  description: string
  hint: string
}

export function useSecretCodes() {
  const secretCodes: SecretCode[] = [
    {
      code: 'NEON2024',
      gameIds: [5, 6, 7],
      description: 'Неоновая коллекция',
      hint: 'NEON + текущий год'
    },
    {
      code: 'RETRO88',
      gameIds: [8, 9],
      description: 'Ретро игры 80-х',
      hint: 'RETRO + год появления NES'
    },
    {
      code: 'FUTURE3D',
      gameIds: [10, 11, 12],
      description: 'Футуристичные 3D игры',
      hint: 'FUTURE + измерение'
    },
    {
      code: 'MATRIX',
      gameIds: [13, 14, 15],
      description: 'Хакерские игры',
      hint: 'Популярный фильм про хакеров'
    },
    {
      code: 'PIXEL',
      gameIds: [16, 17],
      description: 'Пиксельные шедевры',
      hint: 'Основа ретро графики'
    }
  ]

  const [enteredCodes, setEnteredCodes] = useState<string[]>([])

  const validateCode = useCallback((code: string): boolean => {
    return secretCodes.some(sc => sc.code === code.toUpperCase())
  }, [])

  const enterCode = useCallback((code: string): { success: boolean; gameIds: number[] } => {
    const upperCode = code.toUpperCase()
    const secretCode = secretCodes.find(sc => sc.code === upperCode)
    
    if (secretCode && !enteredCodes.includes(upperCode)) {
      setEnteredCodes(prev => [...prev, upperCode])
      return { success: true, gameIds: secretCode.gameIds }
    }
    
    return { success: false, gameIds: [] }
  }, [enteredCodes])

  const getUnlockedGameIds = useCallback((): number[] => {
    return enteredCodes.flatMap(code => {
      const secretCode = secretCodes.find(sc => sc.code === code)
      return secretCode ? secretCode.gameIds : []
    })
  }, [enteredCodes])

  const getCodeHints = useCallback(() => {
    return secretCodes.map(sc => ({
      hint: sc.hint,
      description: sc.description,
      isUnlocked: enteredCodes.includes(sc.code)
    }))
  }, [enteredCodes])

  const getProgress = useCallback(() => {
    return {
      entered: enteredCodes.length,
      total: secretCodes.length,
      percentage: Math.round((enteredCodes.length / secretCodes.length) * 100)
    }
  }, [enteredCodes])

  return {
    secretCodes,
    enteredCodes,
    validateCode,
    enterCode,
    getUnlockedGameIds,
    getCodeHints,
    getProgress
  }
}