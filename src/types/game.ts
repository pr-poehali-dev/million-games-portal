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
  releaseDate?: Date
  developer?: string
  size?: string
}

export interface GameCategory {
  id: string
  name: string
  count: string
  icon?: string
  color?: string
}

export interface GameStats {
  totalGames: number
  unlockedGames: number
  categories: number
  averageRating: number
}

export type GameFilter = {
  category?: string
  type?: '2D' | '3D' | 'all'
  locked?: boolean
  rating?: number
  search?: string
}

export type SortOption = 'rating' | 'plays' | 'newest' | 'alphabetical'