import { useState, useEffect } from 'react'

export interface Game {
  id: number
  title: string
  description: string
  type: '2D' | '3D'
  category: string
  rating: number
  plays: string
  locked: boolean
  tags?: string[]
  imageUrl?: string
}

export function useGameData() {
  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      title: 'Космический Шутер 2D',
      description: 'Интенсивная космическая битва с пиксельной графикой',
      type: '2D',
      category: 'Экшен',
      rating: 4.8,
      plays: '2.1M',
      locked: false,
      tags: ['космос', 'шутер', 'пиксели']
    },
    {
      id: 2,
      title: 'Майнкрафт Клон 3D',
      description: 'Создавай свой мир в бесконечной вселенной',
      type: '3D',
      category: 'Песочница',
      rating: 4.9,
      plays: '5.3M',
      locked: false,
      tags: ['песочница', 'строительство', '3d']
    },
    {
      id: 3,
      title: 'Тетрис Революция',
      description: 'Классическая головоломка с современным дизайном',
      type: '2D',
      category: 'Головоломка',
      rating: 4.7,
      plays: '8.2M',
      locked: false,
      tags: ['головоломка', 'классика', 'тетрис']
    },
    {
      id: 4,
      title: 'Гонки без Границ 3D',
      description: 'Реалистичные гонки на суперкарах',
      type: '3D',
      category: 'Гонки',
      rating: 4.6,
      plays: '3.7M',
      locked: false,
      tags: ['гонки', 'машины', '3d']
    },
    {
      id: 5,
      title: '🔒 Neon Runner VIP',
      description: 'Эксклюзивный неоновый платформер с уникальной физикой',
      type: '2D',
      category: 'Платформер',
      rating: 4.9,
      plays: '1.2M',
      locked: true,
      tags: ['неон', 'платформер', 'vip']
    },
    {
      id: 6,
      title: '🔒 Cyber Wars Premium',
      description: 'Премиум стратегия в киберпанк стиле',
      type: '2D',
      category: 'Стратегия',
      rating: 4.8,
      plays: '950K',
      locked: true,
      tags: ['киберпанк', 'стратегия', 'premium']
    },
    {
      id: 7,
      title: '🔒 Neon City Racing',
      description: 'VIP гонки по неоновому мегаполису',
      type: '2D',
      category: 'Гонки',
      rating: 4.7,
      plays: '1.8M',
      locked: true,
      tags: ['неон', 'гонки', 'город']
    },
    {
      id: 8,
      title: '🔒 Retro Arcade Master',
      description: 'Коллекция ретро игр 80-х годов',
      type: '2D',
      category: 'Ретро',
      rating: 4.9,
      plays: '2.5M',
      locked: true,
      tags: ['ретро', '80е', 'аркада']
    },
    {
      id: 9,
      title: '🔒 8-Bit Adventures',
      description: 'Классические 8-битные приключения',
      type: '2D',
      category: 'RPG',
      rating: 4.6,
      plays: '1.1M',
      locked: true,
      tags: ['8bit', 'rpg', 'приключения']
    }
  ])

  const [unlockedGames, setUnlockedGames] = useState<number[]>([])

  const unlockGames = (gameIds: number[]) => {
    setUnlockedGames(prev => [...new Set([...prev, ...gameIds])])
  }

  const isGameUnlocked = (gameId: number) => {
    const game = games.find(g => g.id === gameId)
    return !game?.locked || unlockedGames.includes(gameId)
  }

  const getGamesByCategory = (category: string) => {
    if (category === 'all') return games
    return games.filter(game => game.category.toLowerCase() === category.toLowerCase())
  }

  const searchGames = (query: string) => {
    if (!query.trim()) return games
    const searchTerm = query.toLowerCase()
    return games.filter(game => 
      game.title.toLowerCase().includes(searchTerm) ||
      game.description.toLowerCase().includes(searchTerm) ||
      game.category.toLowerCase().includes(searchTerm) ||
      game.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  return {
    games,
    unlockedGames,
    unlockGames,
    isGameUnlocked,
    getGamesByCategory,
    searchGames
  }
}