import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Leaf, MapPin, Award, TrendingUp } from 'lucide-react';

export function InfoPanel() {
  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-gradient-to-br from-yellow-50 to-amber-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-amber-900 mb-2">
            Información del Cacao
          </h2>
          <p className="text-gray-600">
            Todo lo que necesitas saber sobre el oro marrón
          </p>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="history">Historia</TabsTrigger>
            <TabsTrigger value="cultivation">Cultivo</TabsTrigger>
            <TabsTrigger value="process">Proceso</TabsTrigger>
            <TabsTrigger value="benefits">Beneficios</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-700" />
                    El Origen del Cacao
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="prose prose-amber max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      El cacao tiene una historia rica que se remonta a más de 3,000 años. 
                      Los antiguos mayas y aztecas consideraban el cacao como un regalo de 
                      los dioses y lo utilizaban tanto en ceremonias religiosas como en la 
                      medicina tradicional.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      El nombre científico del cacao, <em>Theobroma cacao</em>, significa 
                      literalmente "alimento de los dioses" en griego, lo que refleja el 
                      alto valor que las culturas antiguas le otorgaban.
                    </p>
                    <img
                      src="https://images.unsplash.com/photo-1615289442666-fed9cec7169a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWNhbyUyMGJlYW5zJTIwY2hvY29sYXRlfGVufDF8fHx8MTc2ODQ2Nzk5NXww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Granos de cacao"
                      className="w-full h-64 object-cover rounded-lg my-4"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="cultivation">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-700" />
                    Cultivo del Cacao
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="prose prose-green max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Condiciones Ideales
                    </h3>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">
                          <strong>Temperatura:</strong> Entre 21°C y 32°C constante
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">
                          <strong>Humedad:</strong> Alta, entre 70-100%
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">
                          <strong>Altitud:</strong> Entre 0-1000 metros sobre el nivel del mar
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">
                          <strong>Sombra:</strong> Requiere protección del sol directo
                        </span>
                      </li>
                    </ul>
                    <img
                      src="https://images.unsplash.com/photo-1637922808382-0e5930886159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWNhbyUyMHRyZWUlMjBmYXJtfGVufDF8fHx8MTc2ODU3OTIzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Plantación de cacao"
                      className="w-full h-64 object-cover rounded-lg my-4"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="process">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-700" />
                    Proceso de Producción
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {[
                      { 
                        step: 1, 
                        title: 'Cosecha', 
                        description: 'Recolección manual de mazorcas maduras'
                      },
                      { 
                        step: 2, 
                        title: 'Fermentación', 
                        description: 'Desarrollo de sabores durante 5-7 días'
                      },
                      { 
                        step: 3, 
                        title: 'Secado', 
                        description: 'Reducción de humedad al sol'
                      },
                      { 
                        step: 4, 
                        title: 'Tostado', 
                        description: 'Intensificación del aroma y sabor'
                      },
                      { 
                        step: 5, 
                        title: 'Molienda', 
                        description: 'Creación de pasta de cacao'
                      },
                      { 
                        step: 6, 
                        title: 'Conchado', 
                        description: 'Refinamiento de textura y sabor'
                      },
                    ].map((process, index) => (
                      <motion.div
                        key={process.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 items-start"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                          {process.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {process.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {process.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1579523609100-5b868b803668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtYWtpbmclMjBwcm9jZXNzfGVufDF8fHx8MTc2ODU1NTA0NHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Proceso de chocolate"
                    className="w-full h-64 object-cover rounded-lg mt-6"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="benefits">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-700" />
                    Beneficios del Cacao
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        icon: '❤️', 
                        title: 'Salud Cardiovascular', 
                        desc: 'Rico en flavonoides que mejoran la circulación'
                      },
                      { 
                        icon: '🧠', 
                        title: 'Función Cognitiva', 
                        desc: 'Mejora la memoria y concentración'
                      },
                      { 
                        icon: '😊', 
                        title: 'Estado de Ánimo', 
                        desc: 'Estimula la producción de endorfinas'
                      },
                      { 
                        icon: '💪', 
                        title: 'Antioxidantes', 
                        desc: 'Protege las células del daño oxidativo'
                      },
                      { 
                        icon: '🌟', 
                        title: 'Energía Natural', 
                        desc: 'Proporciona teobromina estimulante'
                      },
                      { 
                        icon: '✨', 
                        title: 'Minerales', 
                        desc: 'Fuente de magnesio, hierro y zinc'
                      },
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow"
                      >
                        <div className="text-3xl mb-2">{benefit.icon}</div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {benefit.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
