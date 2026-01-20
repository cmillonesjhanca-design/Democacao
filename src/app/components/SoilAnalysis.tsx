import { motion } from 'motion/react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { Beaker, TrendingUp, AlertTriangle, CheckCircle, Leaf } from 'lucide-react';

export function SoilAnalysis() {
  // Datos de análisis de suelo
  const soilData = {
    ph: { value: 6.2, status: 'optimal', range: '5.5-6.5' },
    organicMatter: { value: 4.8, unit: '%', status: 'good', range: '3-5%' },
    nitrogen: { value: 0.35, unit: '%', status: 'optimal', range: '0.3-0.5%' },
    phosphorus: { value: 28, unit: 'ppm', status: 'optimal', range: '20-40 ppm' },
    potassium: { value: 320, unit: 'ppm', status: 'good', range: '200-400 ppm' },
    calcium: { value: 1200, unit: 'ppm', status: 'optimal', range: '1000-1500 ppm' },
    magnesium: { value: 180, unit: 'ppm', status: 'optimal', range: '150-250 ppm' },
  };

  const nutrientChartData = [
    { nutrient: 'N', actual: 0.35, optimal: 0.4, min: 0.3, max: 0.5 },
    { nutrient: 'P', actual: 28, optimal: 30, min: 20, max: 40 },
    { nutrient: 'K', actual: 320, optimal: 300, min: 200, max: 400 },
    { nutrient: 'Ca', actual: 1200, optimal: 1250, min: 1000, max: 1500 },
    { nutrient: 'Mg', actual: 180, optimal: 200, min: 150, max: 250 },
  ];

  const soilQualityData = [
    { subject: 'pH', value: 95, fullMark: 100 },
    { subject: 'M.O.', value: 96, fullMark: 100 },
    { subject: 'Nitrógeno', value: 87, fullMark: 100 },
    { subject: 'Fósforo', value: 93, fullMark: 100 },
    { subject: 'Potasio', value: 85, fullMark: 100 },
    { subject: 'Calcio', value: 92, fullMark: 100 },
  ];

  const recommendations = [
    {
      type: 'success',
      title: 'pH en rango óptimo',
      description: 'Continuar con prácticas actuales de manejo',
    },
    {
      type: 'info',
      title: 'Materia orgánica elevada',
      description: 'Excelente para retención de nutrientes y agua',
    },
    {
      type: 'warning',
      title: 'Potasio en límite inferior',
      description: 'Considerar aplicación de ceniza de cascarilla o compost',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle className="w-4 h-4" />;
      case 'good':
        return <TrendingUp className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Análisis de Suelo</h1>
              <p className="text-gray-600">
                Resultados de análisis físico-químico - Última actualización: Enero 2025
              </p>
            </div>
          </div>
        </motion.div>

        {/* Parámetros Principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-1">pH del Suelo</p>
              <p className="text-3xl font-bold text-blue-700 mb-1">
                {soilData.ph.value}
              </p>
              <Badge variant="outline" className={getStatusColor(soilData.ph.status)}>
                {getStatusIcon(soilData.ph.status)}
                <span className="ml-1">Óptimo</span>
              </Badge>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-1">Materia Orgánica</p>
              <p className="text-3xl font-bold text-green-700 mb-1">
                {soilData.organicMatter.value}{soilData.organicMatter.unit}
              </p>
              <Badge
                variant="outline"
                className={getStatusColor(soilData.organicMatter.status)}
              >
                {getStatusIcon(soilData.organicMatter.status)}
                <span className="ml-1">Bueno</span>
              </Badge>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-1">Nitrógeno Total</p>
              <p className="text-3xl font-bold text-purple-700 mb-1">
                {soilData.nitrogen.value}{soilData.nitrogen.unit}
              </p>
              <Badge
                variant="outline"
                className={getStatusColor(soilData.nitrogen.status)}
              >
                {getStatusIcon(soilData.nitrogen.status)}
                <span className="ml-1">Óptimo</span>
              </Badge>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-1">Fósforo</p>
              <p className="text-3xl font-bold text-amber-700 mb-1">
                {soilData.phosphorus.value} {soilData.phosphorus.unit}
              </p>
              <Badge
                variant="outline"
                className={getStatusColor(soilData.phosphorus.status)}
              >
                {getStatusIcon(soilData.phosphorus.status)}
                <span className="ml-1">Óptimo</span>
              </Badge>
            </Card>
          </motion.div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras - Nutrientes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Niveles de Nutrientes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nutrientChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nutrient" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                  <Bar dataKey="optimal" fill="#10b981" name="Óptimo" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Gráfico Radar - Calidad del Suelo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Índice de Calidad del Suelo</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={soilQualityData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Calidad"
                    dataKey="value"
                    stroke="#f59e0b"
                    fill="#fbbf24"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Tabla Detallada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Análisis Detallado de Nutrientes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Parámetro</th>
                    <th className="text-left py-3 px-4">Valor</th>
                    <th className="text-left py-3 px-4">Rango Óptimo</th>
                    <th className="text-left py-3 px-4">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(soilData).map(([key, data], index) => (
                    <tr key={key} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium capitalize">{key}</td>
                      <td className="py-3 px-4">
                        {data.value} {data.unit || ''}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{data.range}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={getStatusColor(data.status)}>
                          {getStatusIcon(data.status)}
                          <span className="ml-1 capitalize">{data.status}</span>
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Recomendaciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Recomendaciones de Manejo
            </h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    rec.type === 'success'
                      ? 'bg-green-50 border-green-200'
                      : rec.type === 'warning'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <p className="font-medium mb-1">{rec.title}</p>
                  <p className="text-sm text-gray-700">{rec.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
