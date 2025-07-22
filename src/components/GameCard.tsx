import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import type { Game } from '@/hooks/use-game-data'

interface GameCardProps {
  game: Game
  isUnlocked: boolean
  onPlay: (gameId: number) => void
  onUnlock: () => void
  index?: number
}

export function GameCard({ game, isUnlocked, onPlay, onUnlock, index = 0 }: GameCardProps) {
  return (
    <Card 
      className={`group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm animate-scale-in ${
        game.locked && !isUnlocked 
          ? 'bg-card/30 border-yellow-400/30 opacity-75' 
          : 'bg-card/50 border-primary/10 hover:border-primary/30'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader className="pb-3 relative">
        {game.locked && !isUnlocked && (
          <div className="absolute top-2 right-2 bg-yellow-400/20 p-2 rounded-full">
            <Icon name="Lock" size={16} className="text-yellow-400" />
          </div>
        )}
        {isUnlocked && game.locked && (
          <div className="absolute top-2 right-2 bg-green-400/20 p-2 rounded-full animate-pulse">
            <Icon name="Unlock" size={16} className="text-green-400" />
          </div>
        )}
        
        <div className="flex justify-between items-start mb-2">
          <Badge 
            variant={game.type === '3D' ? 'default' : 'secondary'}
            className={game.type === '3D' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
          >
            {game.type}
          </Badge>
          <div className="flex items-center gap-1 text-yellow-400">
            <Icon name="Star" size={14} />
            <span className="text-xs font-medium">{game.rating}</span>
          </div>
        </div>
        
        <CardTitle className={`text-lg transition-colors ${
          game.locked && !isUnlocked 
            ? 'text-muted-foreground' 
            : 'group-hover:text-primary'
        }`}>
          {game.title}
        </CardTitle>
        
        <CardDescription className="text-sm">
          {game.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Icon name="Tag" size={12} />
            {game.category}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Play" size={12} />
            {game.plays}
          </span>
        </div>
        
        {game.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {game.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {game.locked && !isUnlocked ? (
          <Button 
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:scale-105 transition-transform"
            onClick={onUnlock}
          >
            <Icon name="Key" size={16} />
            Нужен код
          </Button>
        ) : (
          <Button 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
            onClick={() => onPlay(game.id)}
          >
            <Icon name="Play" size={16} />
            Играть
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}