import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '@/app/components/Sidebar';
import { InteractiveMap } from '@/app/components/InteractiveMap';
import { VideoModal } from '@/app/components/VideoModal';
import { AnimatedGuide } from '@/app/components/AnimatedGuide';
import { IngredientsPanel } from '@/app/components/IngredientsPanel';
import { TimerPanel } from '@/app/components/TimerPanel';
import { InfoPanel } from '@/app/components/InfoPanel';
import { QrCode } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import QRCodeLib from 'qrcode';
import { useEffect, useRef } from 'react';

interface MapPoint {
  id: string;
  x: number;
  y: number;
  title: string;
  videoUrl: string;
  description: string;
}

// Mensajes del guía para cada sección
const guideMessages: Record<string, string> = {
  map: '¡Bienvenido! Soy tu guía en este viaje por el mundo del cacao. Haz clic en los puntos del mapa para explorar cada etapa del proceso.',
  ingredients: 'Aquí tienes todos los ingredientes necesarios para hacer chocolate artesanal. ¡Marca cada uno cuando lo tengas listo!',
  timer: 'Usa estos temporizadores para controlar perfectamente cada proceso. El tiempo es crucial para obtener el mejor sabor.',
  info: 'Descubre la fascinante historia y los increíbles beneficios del cacao. ¡Hay tanto por aprender!',
  gallery: 'Explora nuestra colección de imágenes del proceso de producción del cacao.',
  videos: 'Aquí encontrarás videos educativos sobre cada etapa de producción.',
  tutorial: 'Sigue este tutorial paso a paso para convertirte en un experto del cacao.',
};

export default function App() {
  const [activeSection, setActiveSection] = useState('map');
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [showQRInfo, setShowQRInfo] = useState(false);
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  const handlePointClick = (point: MapPoint) => {
    setSelectedPoint(point);
  };

  const handleCloseVideo = () => {
    setSelectedPoint(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'map':
        return (
          <div className="w-full h-full p-6">
            <InteractiveMap onPointClick={handlePointClick} />
          </div>
        );
      case 'ingredients':
        return <IngredientsPanel />;
      case 'timer':
        return <TimerPanel />;
      case 'info':
        return <InfoPanel />;
      case 'gallery':
        return (
          <div className="w-full h-full overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Galería de Imágenes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    url: 'https://images.unsplash.com/photo-1714810267550-46577ca0d06e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWNhbyUyMHBsYW50YXRpb24lMjBtYXAlMjBhZXJpYWx8ZW58MXx8fHwxNzY4NTc5MjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
                    title: 'Vista Aérea de Plantación'
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1615289442666-fed9cec7169a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWNhbyUyMGJlYW5zJTIwY2hvY29sYXRlfGVufDF8fHx8MTc2ODQ2Nzk5NXww&ixlib=rb-4.1.0&q=80&w=1080',
                    title: 'Granos de Cacao'
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1637922808382-0e5930886159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWNhbyUyMHRyZWUlMjBmYXJtfGVufDF8fHx8MTc2ODU3OTIzMnww&ixlib=rb-4.1.0&q=80&w=1080',
                    title: 'Árbol de Cacao'
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1579523609100-5b868b803668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtYWtpbmclMjBwcm9jZXNzfGVufDF8fHx8MTc2ODU1NTA0NHww&ixlib=rb-4.1.0&q=80&w=1080',
                    title: 'Proceso de Chocolate'
                  },
                ].map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <p className="text-white font-semibold p-4">
                        {image.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'videos':
        return (
          <div className="w-full h-full overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Videos Educativos
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Del árbol a la barra', description: 'Proceso completo de producción' },
                  { title: 'Fermentación del cacao', description: 'Técnicas tradicionales' },
                  { title: 'Arte del chocolate', description: 'Creación de chocolate gourmet' },
                ].map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {video.title}
                        </h3>
                        <p className="text-gray-600">{video.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'tutorial':
        return (
          <div className="w-full h-full overflow-y-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-indigo-900 mb-6">
                Tutorial Paso a Paso
              </h2>
              <div className="space-y-4">
                {[
                  'Selecciona granos de cacao de calidad',
                  'Realiza el proceso de fermentación',
                  'Seca los granos al sol durante 5-7 días',
                  'Tuesta los granos a temperatura controlada',
                  'Muele los granos para crear pasta de cacao',
                  'Agrega ingredientes según tu receta',
                  'Realiza el conchado para refinar',
                  'Templa el chocolate correctamente',
                  'Moldea y deja enfriar',
                  '¡Disfruta tu chocolate artesanal!',
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 font-medium flex-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (qrCodeRef.current) {
      QRCodeLib.toCanvas(qrCodeRef.current, 'https://example.com/access', { width: 256 }, function (error) {
        if (error) console.error(error);
      });
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Contenido principal */}
      <div className="flex-1 relative">
        {/* Header */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-amber-800 to-orange-900 text-white px-6 py-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Sistema Interactivo de Cacao</h1>
              <p className="text-sm text-amber-200">
                Explora, aprende y crea con el cacao
              </p>
            </div>
            <Button
              variant="outline"
              className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30"
              onClick={() => setShowQRInfo(true)}
            >
              <QrCode className="w-4 h-4" />
              Acceso QR
            </Button>
          </div>
        </motion.div>

        {/* Contenido */}
        <div className="h-full pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Guía animado */}
      <AnimatedGuide
        message={guideMessages[activeSection] || '¡Hola! Soy tu guía del cacao.'}
        isVisible={true}
      />

      {/* Modal de video */}
      {selectedPoint && (
        <VideoModal
          isOpen={!!selectedPoint}
          onClose={handleCloseVideo}
          title={selectedPoint.title}
          description={selectedPoint.description}
          videoUrl={selectedPoint.videoUrl}
        />
      )}

      {/* Modal de información QR */}
      <AnimatePresence>
        {showQRInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQRInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Acceso mediante QR
              </h3>
              <div className="bg-gray-100 p-6 rounded-lg mb-4 flex items-center justify-center">
                <canvas ref={qrCodeRef} className="w-32 h-32 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                <strong>Implementación con Supabase:</strong> Para generar códigos QR únicos 
                y gestionar el acceso de usuarios, se recomienda integrar Supabase para:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Autenticación de usuarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Generación de tokens únicos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Control de acceso por sesión</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Registro de actividad de usuarios</span>
                </li>
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                onClick={() => setShowQRInfo(false)}
              >
                Entendido
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}