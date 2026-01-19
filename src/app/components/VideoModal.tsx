import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  videoUrl: string;
}

export function VideoModal({ isOpen, onClose, title, description, videoUrl }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Contenedor del video */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              {/* Video player */}
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  src={videoUrl}
                  loop
                  onEnded={() => setIsPlaying(false)}
                >
                  Tu navegador no soporta videos HTML5.
                </video>

                {/* Controles personalizados */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Overlay de texto */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-200 text-sm">{description}</p>
                </motion.div>
              </div>

              {/* Información adicional */}
              <div className="p-6 bg-gray-800">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Acerca de esta etapa
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Este video muestra uno de los procesos fundamentales en la producción 
                      del cacao. Cada etapa es crucial para obtener un chocolate de calidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
