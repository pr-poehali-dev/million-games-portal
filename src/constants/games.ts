import type { Game, GameCategory } from '@/types/game'

export const GAME_CATEGORIES: GameCategory[] = [
  { id: 'all', name: 'Все игры', count: '1,000,000+', icon: 'Gamepad2', color: 'primary' },
  { id: '2d', name: '2D Игры', count: '650,000', icon: 'Square', color: 'secondary' },
  { id: '3d', name: '3D Игры', count: '350,000', icon: 'Cube', color: 'primary' },
  { id: 'arcade', name: 'Аркады', count: '200,000', icon: 'Zap', color: 'yellow' },
  { id: 'puzzle', name: 'Головоломки', count: '150,000', icon: 'Puzzle', color: 'green' },
  { id: 'action', name: 'Экшен', count: '180,000', icon: 'Sword', color: 'red' }
]

export const FEATURED_GAMES: Game[] = [
  {
    id: 1,
    title: 'Космический Шутер 2D',
    description: 'Интенсивная космическая битва с пиксельной графикой',
    type: '2D',
    category: 'Экшен',
    rating: 4.8,
    plays: '2.1M',
    locked: false,
    tags: ['космос', 'шутер', 'пиксели'],
    developer: 'SpaceStudio',
    size: '45MB'
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
    tags: ['песочница', 'строительство', '3d'],
    developer: 'CraftGames',
    size: '120MB'
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
    tags: ['головоломка', 'классика', 'тетрис'],
    developer: 'PuzzleMaster',
    size: '25MB'
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
    tags: ['гонки', 'машины', '3d'],
    developer: 'RaceTeam',
    size: '200MB'
  }
]

export const PREMIUM_GAMES: Game[] = [
  {
    id: 5,
    title: '🔒 Neon Runner VIP',
    description: 'Эксклюзивный неоновый платформер с уникальной физикой',
    type: '2D',
    category: 'Платформер',
    rating: 4.9,
    plays: '1.2M',
    locked: true,
    tags: ['неон', 'платформер', 'vip'],
    developer: 'NeonStudios',
    size: '85MB'
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
    tags: ['киберпанк', 'стратегия', 'premium'],
    developer: 'CyberDev',
    size: '150MB'
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
    tags: ['неон', 'гонки', 'город'],
    developer: 'NeonRace',
    size: '110MB'
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
    tags: ['ретро', '80е', 'аркада'],
    developer: 'RetroGames',
    size: '75MB'
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
    tags: ['8bit', 'rpg', 'приключения'],
    developer: 'PixelQuest',
    size: '65MB'
  }
]

export const ALL_GAMES: Game[] = [...FEATURED_GAMES, ...PREMIUM_GAMES]

export const SECRET_CODES = {
  'NEON2024': [5, 6, 7],
  'RETRO88': [8, 9],
  'FUTURE3D': [10, 11, 12],
  'MATRIX': [13, 14, 15],
  'PIXEL': [16, 17]
} as const

export const CODE_HINTS = [
  { hint: '💡 NEON + текущий год = неоновые игры', code: 'NEON2024' },
  { hint: '🕹️ RETRO + год появления NES', code: 'RETRO88' },
  { hint: '🚀 FUTURE + измерение', code: 'FUTURE3D' },
  { hint: '🔮 Популярный фильм про хакеров', code: 'MATRIX' },
  { hint: '🎨 Основа ретро графики', code: 'PIXEL' }
] as const