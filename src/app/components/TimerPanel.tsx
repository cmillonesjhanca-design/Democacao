import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

interface TimerPreset {
  id: string;
  name: string;
  duration: number;
  description: string;
}

const presets: TimerPreset[] = [
  { 
    id: '1', 
    name: 'Tostado de granos', 
    duration: 900, 
    description: '15 minutos a 140°C' 
  },
  { 
    id: '2', 
    name: 'Fermentación', 
    duration: 432000, 
    description: '5 días en cajas de madera' 
  },
  { 
    id: '3', 
    name: 'Conchado', 
    duration: 7200, 
    description: '2 horas de refinamiento' 
  },
  { 
    id: '4', 
    name: 'Templado', 
    duration: 1800, 
    description: '30 minutos de agitación' 
  },
];

export function TimerPanel() {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos por defecto
  const [initialTime, setInitialTime] = useState(900);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Reproducir sonido de alarma (opcional)
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${mins}m ${secs}s`;
    }
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const adjustTime = (seconds: number) => {
    const newTime = Math.max(0, timeLeft + seconds);
    setTimeLeft(newTime);
    setInitialTime(newTime);
  };

  const setPreset = (duration: number) => {
    setIsRunning(false);
    setTimeLeft(duration);
    setInitialTime(duration);
  };

  const progress = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0;

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-gradient-to-br from-orange-50 to-red-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-orange-900 mb-2">
            Temporizador de Procesos
          </h2>
          <p className="text-gray-600">
            Controla el tiempo de cada etapa de producción
          </p>
        </div>

        {/* Timer principal */}
        <Card className="mb-6 border-orange-200 shadow-2xl">
          <CardContent className="pt-8">
            <div className="text-center">
              {/* Círculo de progreso */}
              <div className="relative inline-block mb-8">
                <svg className="w-64 h-64 transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="112"
                    stroke="#fed7aa"
                    strokeWidth="16"
                    fill="none"
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="112"
                    stroke="url(#gradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 112}
                    strokeDashoffset={2 * Math.PI * 112 * (1 - progress / 100)}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 2 * Math.PI * 112 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 112 * (1 - progress / 100) }}
                    transition={{ duration: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Tiempo en el centro */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <motion.div
                      key={timeLeft}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-5xl font-bold text-orange-900 mb-2"
                    >
                      {formatTime(timeLeft)}
                    </motion.div>
                    <div className="text-sm text-gray-600">
                      {isRunning ? 'En progreso...' : 'Pausado'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controles */}
              <div className="flex justify-center gap-4 mb-6">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-12 h-12 rounded-full"
                  onClick={() => adjustTime(-60)}
                  disabled={isRunning}
                >
                  <Minus className="w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  onClick={toggleTimer}
                >
                  {isRunning ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  className="w-12 h-12 rounded-full"
                  onClick={() => adjustTime(60)}
                  disabled={isRunning}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="gap-2"
                onClick={resetTimer}
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Presets */}
        <Card className="border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100">
            <CardTitle className="text-orange-900">
              Tiempos Predefinidos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {presets.map((preset, index) => (
                <motion.div
                  key={preset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 justify-start text-left hover:bg-orange-50 hover:border-orange-400 transition-all"
                    onClick={() => setPreset(preset.duration)}
                    disabled={isRunning}
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">
                        {preset.name}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {preset.description}
                      </div>
                      <div className="text-sm font-medium text-orange-700">
                        {formatTime(preset.duration)}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alarma completada */}
        {timeLeft === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <Card className="w-96 shadow-2xl">
              <CardContent className="pt-6 text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  ⏰
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Tiempo Completado!
                </h3>
                <p className="text-gray-600 mb-6">
                  El proceso ha finalizado correctamente
                </p>
                <Button
                  onClick={resetTimer}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600"
                >
                  Cerrar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
