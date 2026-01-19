import { motion } from 'motion/react';
import { Check, CircleDot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  category: 'principal' | 'opcional';
}

const ingredients: Ingredient[] = [
  { id: '1', name: 'Granos de cacao fermentados', quantity: '500g', category: 'principal' },
  { id: '2', name: 'Azúcar', quantity: '200g', category: 'principal' },
  { id: '3', name: 'Manteca de cacao', quantity: '100g', category: 'principal' },
  { id: '4', name: 'Leche en polvo', quantity: '150g', category: 'opcional' },
  { id: '5', name: 'Vainilla', quantity: '1 cucharadita', category: 'opcional' },
  { id: '6', name: 'Lecitina de soya', quantity: '5g', category: 'opcional' },
];

export function IngredientsPanel() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const principalIngredients = ingredients.filter(i => i.category === 'principal');
  const optionalIngredients = ingredients.filter(i => i.category === 'opcional');

  const progress = (checkedItems.size / ingredients.length) * 100;

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-gradient-to-br from-amber-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-amber-900 mb-2">
            Lista de Ingredientes
          </h2>
          <p className="text-gray-600">
            Prepara todo lo necesario para hacer chocolate artesanal
          </p>
          
          {/* Barra de progreso */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso</span>
              <span>{checkedItems.size} de {ingredients.length}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Ingredientes principales */}
        <Card className="mb-6 border-amber-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100">
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <CircleDot className="w-5 h-5" />
              Ingredientes Principales
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {principalIngredients.map((ingredient, index) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <Checkbox
                    id={ingredient.id}
                    checked={checkedItems.has(ingredient.id)}
                    onCheckedChange={() => toggleItem(ingredient.id)}
                    className="w-6 h-6"
                  />
                  <label
                    htmlFor={ingredient.id}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-medium text-gray-900 ${
                        checkedItems.has(ingredient.id) ? 'line-through opacity-60' : ''
                      }`}>
                        {ingredient.name}
                      </span>
                      <span className="text-amber-700 font-semibold">
                        {ingredient.quantity}
                      </span>
                    </div>
                  </label>
                  {checkedItems.has(ingredient.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="w-5 h-5 text-green-600" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ingredientes opcionales */}
        <Card className="border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <CircleDot className="w-5 h-5" />
              Ingredientes Opcionales
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {optionalIngredients.map((ingredient, index) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (principalIngredients.length + index) * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  <Checkbox
                    id={ingredient.id}
                    checked={checkedItems.has(ingredient.id)}
                    onCheckedChange={() => toggleItem(ingredient.id)}
                    className="w-6 h-6"
                  />
                  <label
                    htmlFor={ingredient.id}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-medium text-gray-900 ${
                        checkedItems.has(ingredient.id) ? 'line-through opacity-60' : ''
                      }`}>
                        {ingredient.name}
                      </span>
                      <span className="text-orange-700 font-semibold">
                        {ingredient.quantity}
                      </span>
                    </div>
                  </label>
                  {checkedItems.has(ingredient.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="w-5 h-5 text-green-600" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nota */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"
        >
          <p className="text-sm text-blue-900">
            <strong>Consejo:</strong> Asegúrate de tener todos los ingredientes principales 
            listos antes de comenzar el proceso de elaboración del chocolate.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
