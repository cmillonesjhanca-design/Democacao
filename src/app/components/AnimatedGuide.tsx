import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface AnimatedGuideProps {
  message: string;
  isVisible: boolean;
}

export function AnimatedGuide({ message, isVisible }: AnimatedGuideProps) {
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // Efecto de escribir el mensaje
  useEffect(() => {
    if (isVisible && charIndex < message.length) {
      const timeout = setTimeout(() => {
        setCurrentMessage(message.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, message, isVisible]);

  useEffect(() => {
    if (isVisible) {
      setCharIndex(0);
      setCurrentMessage('');
    }
  }, [message, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="fixed bottom-8 left-8 z-40 flex items-end gap-4"
    >
      {/* Personaje animado */}
      <div className="relative">
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Cuerpo del personaje */}
          <div className="relative w-32 h-32">
            {/* Cabeza */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-amber-700 rounded-full border-4 border-amber-900"
              animate={{
                scale: isSpeaking ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: isSpeaking ? Infinity : 0,
              }}
            >
              {/* Ojos */}
              <div className="absolute top-6 left-3 w-3 h-3 bg-white rounded-full">
                <motion.div
                  className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"
                  animate={{
                    y: isSpeaking ? [0, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isSpeaking ? Infinity : 0,
                  }}
                />
              </div>
              <div className="absolute top-6 right-3 w-3 h-3 bg-white rounded-full">
                <motion.div
                  className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"
                  animate={{
                    y: isSpeaking ? [0, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isSpeaking ? Infinity : 0,
                  }}
                />
              </div>

              {/* Boca */}
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-4 border-b-2 border-black rounded-b-full"
                animate={{
                  scaleY: isSpeaking ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: isSpeaking ? Infinity : 0,
                }}
              />
            </motion.div>

            {/* Cuerpo */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-600 rounded-lg border-4 border-amber-800">
              {/* Brazos */}
              <motion.div
                className="absolute -left-4 top-2 w-12 h-3 bg-amber-700 rounded-full origin-right"
                animate={{
                  rotate: isSpeaking ? [0, 10, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: isSpeaking ? Infinity : 0,
                }}
              />
              <motion.div
                className="absolute -right-4 top-2 w-12 h-3 bg-amber-700 rounded-full origin-left"
                animate={{
                  rotate: isSpeaking ? [0, -10, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: isSpeaking ? Infinity : 0,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Indicador de audio */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{
            scale: isSpeaking ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: isSpeaking ? Infinity : 0,
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-white shadow-lg hover:bg-gray-100 rounded-full w-8 h-8"
            onClick={() => setIsSpeaking(!isSpeaking)}
          >
            {isSpeaking ? (
              <Volume2 className="w-4 h-4 text-amber-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Bocadillo de texto */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative bg-white rounded-2xl shadow-xl p-4 max-w-md"
      >
        <div className="absolute -left-3 bottom-6 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
        
        <p className="text-gray-800 font-medium leading-relaxed">
          {currentMessage}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </p>
      </motion.div>
    </motion.div>
  );
}
