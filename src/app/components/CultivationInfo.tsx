import { motion } from 'motion/react';
import { Card } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Sprout, TreePine, Droplets, Sun, Wind, TrendingUp } from 'lucide-react';

export function CultivationInfo() {
  const cultivationData = {
    plantAge: {
      label: 'Edad Promedio del Cultivo',
      value: '7 años',
      description: 'Edad productiva óptima',
    },
    plantDensity: {
      label: 'Densidad de Siembra',
      value: '1,100 plantas/ha',
      description: 'Distribución estándar',
    },
    varietyDistribution: [
      { name: 'CCN-51', percentage: 60, color: 'bg-amber-500' },
      { name: 'ICS-95', percentage: 25, color: 'bg-orange-500' },
      { name: 'Criollo', percentage: 15, color: 'bg-yellow-600' },
    ],
    climaticConditions: {
      temperature: '24-28°C',
      rainfall: '2,500 mm/año',
      humidity: '80-85%',
      altitude: '400 msnm',
    },
    practices: [
      { name: 'Poda Regular', status: 'active', frequency: 'Cada 6 meses' },
      { name: 'Control Fitosanitario', status: 'active', frequency: 'Mensual' },
      { name: 'Fertilización Orgánica', status: 'active', frequency: 'Cada 3 meses' },
      { name: 'Manejo de Sombra', status: 'active', frequency: 'Permanente' },
    ],
    shadeTrees: ['Guamo', 'Laurel', 'Plátano', 'Nogal'],
  };

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Información de Cultivo
              </h1>
              <p className="text-gray-600">
                Detalles técnicos y prácticas agronómicas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Características del Cultivo */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <TreePine className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold">{cultivationData.plantAge.label}</h3>
              </div>
              <p className="text-3xl font-bold text-green-700 mb-1">
                {cultivationData.plantAge.value}
              </p>
              <p className="text-sm text-gray-600">
                {cultivationData.plantAge.description}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-amber-600" />
                <h3 className="font-semibold">{cultivationData.plantDensity.label}</h3>
              </div>
              <p className="text-3xl font-bold text-amber-700 mb-1">
                {cultivationData.plantDensity.value}
              </p>
              <p className="text-sm text-gray-600">
                {cultivationData.plantDensity.description}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Distribución de Variedades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Distribución de Variedades</h3>
            <div className="space-y-4">
              {cultivationData.varietyDistribution.map((variety, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{variety.name}</span>
                    <span className="text-gray-600">{variety.percentage}%</span>
                  </div>
                  <Progress value={variety.percentage} className="h-3" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Condiciones Climáticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Condiciones Climáticas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-orange-50 rounded-lg">
                <Sun className="w-8 h-8 text-orange-600 mb-2" />
                <p className="text-sm text-gray-600">Temperatura</p>
                <p className="font-semibold text-gray-900">
                  {cultivationData.climaticConditions.temperature}
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <Droplets className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm text-gray-600">Precipitación</p>
                <p className="font-semibold text-gray-900">
                  {cultivationData.climaticConditions.rainfall}
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-cyan-50 rounded-lg">
                <Wind className="w-8 h-8 text-cyan-600 mb-2" />
                <p className="text-sm text-gray-600">Humedad</p>
                <p className="font-semibold text-gray-900">
                  {cultivationData.climaticConditions.humidity}
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm text-gray-600">Altitud</p>
                <p className="font-semibold text-gray-900">
                  {cultivationData.climaticConditions.altitude}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Prácticas Agronómicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Prácticas Agronómicas</h3>
            <div className="grid gap-3">
              {cultivationData.practices.map((practice, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{practice.name}</p>
                      <p className="text-sm text-gray-600">{practice.frequency}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Activo
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Árboles de Sombra */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Sistema de Sombrío</h3>
            <div className="flex flex-wrap gap-2">
              {cultivationData.shadeTrees.map((tree, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-green-100 text-green-800 px-4 py-2"
                >
                  <TreePine className="w-4 h-4 mr-1" />
                  {tree}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Los árboles de sombra proporcionan microclima favorable, conservación
              de humedad y biodiversidad al sistema cacaotero.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
