import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Video } from 'lucide-react';

interface MapPoint {
  id: string;
  x: number;
  y: number;
  title: string;
  videoUrl: string;
  description: string;
}

interface InteractiveMapProps {
  onPointClick: (point: MapPoint) => void;
}

const mapPoints: MapPoint[] = [
  {
    id: '1',
    x: 25,
    y: 30,
    title: 'Plantación de Cacao',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Descubre cómo se cultiva el cacao en las plantaciones'
  },
  {
    id: '2',
    x: 60,
    y: 45,
    title: 'Cosecha del Cacao',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description: 'El proceso de recolección de las mazorcas de cacao'
  },
  {
    id: '3',
    x: 45,
    y: 65,
    title: 'Fermentación',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Proceso crítico para desarrollar el sabor del chocolate'
  },
  {
    id: '4',
    x: 75,
    y: 25,
    title: 'Secado de Granos',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description: 'Reducción de humedad para preservar los granos'
  },
  {
    id: '5',
    x: 30,
    y: 70,
    title: 'Producción de Chocolate',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Transformación final en delicioso chocolate'
  }
];

export function InteractiveMap({ onPointClick }: InteractiveMapProps) {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
      {/* Mapa de fondo - En producción, aquí iría tu imagen TIF */}
      <img
        src="https://images.unsplash.com/photo-1714810267550-46577ca0d06e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWNhbyUyMHBsYW50YXRpb24lMjBtYXAlMjBhZXJpYWx8ZW58MXx8fHwxNzY4NTc5MjMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Mapa interactivo de cacao"
        className="w-full h-full object-cover"
      />
      
      {/* Overlay oscuro para mejor visibilidad */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Puntos interactivos */}
      {mapPoints.map((point) => (
        <motion.div
          key={point.id}
          className="absolute cursor-pointer"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseEnter={() => setHoveredPoint(point.id)}
          onMouseLeave={() => setHoveredPoint(null)}
          onClick={() => onPointClick(point)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="relative"
            animate={{
              scale: hoveredPoint === point.id ? 1.1 : 1,
            }}
          >
            {/* Pulso animado */}
            <motion.div
              className="absolute inset-0 bg-amber-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Icono del punto */}
            <div className="relative bg-amber-600 p-3 rounded-full shadow-lg border-4 border-white">
              <MapPin className="w-6 h-6 text-white" />
              <Video className="w-3 h-3 text-white absolute -top-1 -right-1 bg-red-600 rounded-full p-0.5" />
            </div>
          </motion.div>

          {/* Tooltip */}
          {hoveredPoint === point.id && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap z-10"
            >
              <div className="text-sm font-semibold text-gray-900">{point.title}</div>
              <div className="text-xs text-gray-600 mt-1">Click para ver video</div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-gray-700">
            Haz clic en los puntos para explorar
          </span>
        </div>
      </div>
    </div>
  );
}
