import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [secretCode, setSecretCode] = useState('');
  const [unlockedGames, setUnlockedGames] = useState<number[]>([]);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const [codeAttempt, setCodeAttempt] = useState('');

  const secretCodes = {
    'NEON2024': [5, 6, 7],
    'RETRO88': [8, 9],
    'FUTURE3D': [10, 11, 12],
    'MATRIX': [13, 14, 15],
    'PIXEL': [16, 17]
  };

  const categories = [
    { id: 'all', name: 'Все игры', count: '1,000,000+' },
    { id: '2d', name: '2D Игры', count: '650,000' },
    { id: '3d', name: '3D Игры', count: '350,000' },
    { id: 'arcade', name: 'Аркады', count: '200,000' },
    { id: 'puzzle', name: 'Головоломки', count: '150,000' },
    { id: 'action', name: 'Экшен', count: '180,000' }
  ];

  const allGames = [
    {
      id: 1,
      title: 'Космический Шутер 2D',
      description: 'Интенсивная космическая битва с пиксельной графикой',
      type: '2D',
      category: 'Экшен',
      rating: 4.8,
      plays: '2.1M',
      locked: false
    },
    {
      id: 2,
      title: 'Майнкрафт Клон 3D',
      description: 'Создавай свой мир в бесконечной вселенной',
      type: '3D',
      category: 'Песочница',
      rating: 4.9,
      plays: '5.3M',
      locked: false
    },
    {
      id: 3,
      title: 'Тетрис Революция',
      description: 'Классическая головоломка с современным дизайном',
      type: '2D',
      category: 'Головоломка',
      rating: 4.7,
      plays: '8.2M',
      locked: false
    },
    {
      id: 4,
      title: 'Гонки без Границ 3D',
      description: 'Реалистичные гонки на суперкарах',
      type: '3D',
      category: 'Гонки',
      rating: 4.6,
      plays: '3.7M',
      locked: false
    },
    {
      id: 5,
      title: '🔒 Neon Runner VIP',
      description: 'Эксклюзивный неоновый платформер с уникальной физикой',
      type: '2D',
      category: 'Платформер',
      rating: 4.9,
      plays: '1.2M',
      locked: true
    },
    {
      id: 6,
      title: '🔒 Cyber Wars Premium',
      description: 'Премиум стратегия в киберпанк стиле',
      type: '2D',
      category: 'Стратегия',
      rating: 4.8,
      plays: '950K',
      locked: true
    },
    {
      id: 7,
      title: '🔒 Neon City Racing',
      description: 'VIP гонки по неоновому мегаполису',
      type: '2D',
      category: 'Гонки',
      rating: 4.7,
      plays: '1.8M',
      locked: true
    },
    {
      id: 8,
      title: '🔒 Retro Arcade Master',
      description: 'Коллекция ретро игр 80-х годов',
      type: '2D',
      category: 'Ретро',
      rating: 4.9,
      plays: '2.5M',
      locked: true
    },
    {
      id: 9,
      title: '🔒 8-Bit Adventures',
      description: 'Классические 8-битные приключения',
      type: '2D',
      category: 'RPG',
      rating: 4.6,
      plays: '1.1M',
      locked: true
    }
  ];

  const handleSearch = () => {
    console.log('Поиск:', searchQuery);
  };

  const handleChatSend = () => {
    console.log('AI запрос:', chatMessage);
    setChatMessage('');
  };

  const handleCodeSubmit = () => {
    const code = codeAttempt.toUpperCase();
    if (secretCodes[code as keyof typeof secretCodes]) {
      const gamesToUnlock = secretCodes[code as keyof typeof secretCodes];
      setUnlockedGames(prev => [...new Set([...prev, ...gamesToUnlock])]);
      setCodeAttempt('');
      setIsCodeDialogOpen(false);
    } else {
      // Показать ошибку
      alert('Неверный код! Попробуйте еще раз.');
    }
  };

  const isGameUnlocked = (gameId: number) => {
    return !allGames.find(g => g.id === gameId)?.locked || unlockedGames.includes(gameId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-background">
      {/* Header */}
      <header className="border-b border-orange-500/20 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center animate-float">
                <Icon name="Gamepad2" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  GameHub Pro
                </h1>
                <p className="text-sm text-muted-foreground">1,000,000+ игр с защитой</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hover:bg-primary/10 border-primary/30">
                    <Icon name="Key" size={20} />
                    Ввести код
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Icon name="Shield" size={20} />
                      Секретный код доступа
                    </DialogTitle>
                    <DialogDescription>
                      Введите код для разблокировки премиум игр
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Input
                        id="code"
                        placeholder="Введите секретный код..."
                        value={codeAttempt}
                        onChange={(e) => setCodeAttempt(e.target.value)}
                        className="bg-background/50 border-primary/20 focus:border-primary"
                        onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
                      />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <Button 
                      onClick={handleCodeSubmit}
                      disabled={!codeAttempt.trim()}
                      className="bg-gradient-to-r from-primary to-secondary"
                    >
                      <Icon name="Unlock" size={16} />
                      Разблокировать
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" className="hover:bg-primary/10">
                <Icon name="User" size={20} />
                Профиль
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform">
                <Icon name="Heart" size={16} />
                Избранное
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-full animate-pulse">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-yellow-400 to-secondary bg-clip-text text-transparent">
              Защищённые игры
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Эксклюзивная коллекция игр с системой кодов доступа! 
              Разблокируйте премиум контент секретными кодами.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Найти игру... (например: 'неоновый платформер')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg bg-card/50 border-primary/20 focus:border-primary"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  size="lg" 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform px-8"
                >
                  <Icon name="Search" size={20} />
                  Искать
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                <div className="text-muted-foreground">Бесплатных игр</div>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/10">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{unlockedGames.length}</div>
                <div className="text-muted-foreground">Разблокировано</div>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-secondary/10">
                <div className="text-3xl font-bold text-secondary mb-2">🔒</div>
                <div className="text-muted-foreground">Система защиты</div>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-green-400/10">
                <div className="text-3xl font-bold text-green-400 mb-2">AI</div>
                <div className="text-muted-foreground">Генерация</div>
              </div>
            </div>

            {/* Code Hints */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 max-w-3xl mx-auto mb-8">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Icon name="Info" size={18} />
                Подсказки для кодов:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div>💡 NEON + текущий год = неоновые игры</div>
                <div>🕹️ RETRO + год появления NES</div>
                <div>🚀 FUTURE + измерение</div>
                <div>🔮 Популярный фильм про хакеров</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-card/20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Категории игр</h3>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id 
                    ? "bg-gradient-to-r from-primary to-secondary" 
                    : "hover:bg-primary/10"
                } transition-all duration-200 hover:scale-105`}
              >
                <span className="font-medium">{category.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Игровая коллекция</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGames.map((game, index) => {
              const isUnlocked = isGameUnlocked(game.id);
              return (
                <Card 
                  key={game.id} 
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
                  </CardContent>
                  
                  <CardFooter>
                    {game.locked && !isUnlocked ? (
                      <Button 
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:scale-105 transition-transform"
                        onClick={() => setIsCodeDialogOpen(true)}
                      >
                        <Icon name="Key" size={16} />
                        Нужен код
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
                      >
                        <Icon name="Play" size={16} />
                        Играть
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary p-3 rounded-full mb-4">
              <Icon name="Bot" size={24} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">AI Генератор игр</h3>
            <p className="text-muted-foreground text-lg">
              Создавайте уникальные игры с помощью ИИ! Все созданные игры автоматически разблокированы.
            </p>
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MessageCircle" size={20} />
                Чат с AI
              </CardTitle>
              <CardDescription>
                Например: "Создай защищённый платформер с системой паролей"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Опишите игру с защитой, которую хотите создать..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="min-h-[120px] resize-none bg-background/50 border-primary/20 focus:border-primary"
                />
                <Button 
                  onClick={handleChatSend}
                  disabled={!chatMessage.trim()}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
                  size="lg"
                >
                  <Icon name="Sparkles" size={20} />
                  Создать защищённую игру с AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-primary/20 bg-card/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold">GameHub Pro</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Защищённая игровая платформа с системой секретных кодов
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <span>🔒 Система защиты</span>
            <span>🗝️ Секретные коды</span>
            <span>🤖 AI генерация</span>
            <span>🎮 1M+ игр</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;