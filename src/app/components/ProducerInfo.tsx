import { motion } from 'motion/react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { User, MapPin, Phone, Mail, Calendar, Award } from 'lucide-react';

export function ProducerInfo() {
  const producerData = {
    name: 'Juan Pérez García',
    id: 'PROD-2024-001',
    location: 'Vereda El Cacao, Municipio de Tumaco, Nariño',
    phone: '+57 300 123 4567',
    email: 'juan.perez@cacaotumaco.com',
    memberSince: 'Enero 2020',
    certification: 'Orgánico',
    farmName: 'Finca La Esperanza',
    totalArea: '12.5 hectáreas',
    cacaoArea: '10.2 hectáreas',
    varieties: ['CCN-51', 'ICS-95', 'Criollo'],
    production: {
      lastYear: '2.8 toneladas',
      current: '3.2 toneladas (proyectado)',
      quality: 'Premium - 85% fermentación',
    },
  };

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header del Productor */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {producerData.name}
                  </h1>
                  <p className="text-gray-600 mt-1">{producerData.farmName}</p>
                  <p className="text-sm text-gray-500 mt-2">ID: {producerData.id}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                <Award className="w-3 h-3 mr-1" />
                {producerData.certification}
              </Badge>
            </div>
          </Card>
        </motion.div>

        {/* Tabs de Información */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="production">Producción</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
          </TabsList>

          {/* Tab: Información General */}
          <TabsContent value="general" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                Datos de la Finca
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Ubicación</p>
                  <p className="font-medium">{producerData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Área Total</p>
                  <p className="font-medium">{producerData.totalArea}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Área de Cacao</p>
                  <p className="font-medium">{producerData.cacaoArea}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Miembro Desde</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {producerData.memberSince}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Variedades Cultivadas</h3>
              <div className="flex gap-2">
                {producerData.varieties.map((variety, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-amber-100 text-amber-800"
                  >
                    {variety}
                  </Badge>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Producción */}
          <TabsContent value="production" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Estadísticas de Producción</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Producción Año Anterior</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {producerData.production.lastYear}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                    📊
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Proyección Actual</p>
                    <p className="text-2xl font-bold text-green-700">
                      {producerData.production.current}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                    📈
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Calidad del Producto</p>
                  <p className="font-medium text-blue-900">
                    {producerData.production.quality}
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Contacto */}
          <TabsContent value="contact" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-medium">{producerData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{producerData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="font-medium">{producerData.location}</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
