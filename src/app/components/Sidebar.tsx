import { motion } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  Image, 
  Video, 
  ListChecks, 
  Clock, 
  Info,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/app/components/ui/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'map', label: 'Mapa Principal', icon: Home },
  { id: 'ingredients', label: 'Ingredientes', icon: ListChecks },
  { id: 'timer', label: 'Temporizador', icon: Clock },
  { id: 'gallery', label: 'Galería', icon: Image },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'info', label: 'Información', icon: Info },
  { id: 'tutorial', label: 'Tutorial', icon: BookOpen },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-72 bg-gradient-to-b from-amber-900 to-amber-950 text-white h-full shadow-2xl overflow-y-auto"
    >
      {/* Header */}
      <div className="p-6 border-b border-amber-700">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
            <span className="text-2xl">🍫</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Tutorial de Cacao</h2>
            <p className="text-xs text-amber-300">Explora el mundo del chocolate</p>
          </div>
        </motion.div>
      </div>

      {/* Menú */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 text-left transition-all",
                    isActive 
                      ? "bg-amber-700 text-white hover:bg-amber-600" 
                      : "text-amber-100 hover:bg-amber-800/50"
                  )}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1 h-8 bg-amber-300 rounded-full"
                    />
                  )}
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform",
                    isActive && "rotate-90"
                  )} />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Footer info */}
      <div className="p-6 mt-auto border-t border-amber-700">
        <div className="bg-amber-800/50 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Nota Importante
          </h3>
          <p className="text-xs text-amber-200 leading-relaxed">
            Para cargar tus archivos TIF y MP4, consulta la documentación sobre 
            optimización de archivos pesados.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
