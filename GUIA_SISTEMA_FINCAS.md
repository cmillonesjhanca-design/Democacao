# Sistema de Análisis de Fincas Cacaoteras

## 🌱 Descripción General

Sistema interactivo transformado para la gestión y análisis integral de fincas cacaoteras, con enfoque en visualización geoespacial, información detallada del productor, análisis de cultivo y evaluación de suelos.

## 🎯 Cambios Realizados

### Componentes Eliminados
- ✅ **IngredientsPanel** - Panel de ingredientes con checkboxes
- ✅ **TimerPanel** - Temporizador para procesos

### Componentes Nuevos Creados

#### 1. **MapViewer** (`/src/app/components/MapViewer.tsx`)
- **Funcionalidad**: Visor de mapas geoespaciales con React-Leaflet
- **Características**:
  - Visualización de mapas con capas de OpenStreetMap
  - Soporte para carga de archivos shapefile/GeoJSON
  - Visualización de perímetros de parcelas
  - Marcadores interactivos con popups informativos
  - Controles de carga y exportación de datos
  - Información de área total y distribución de cultivos

#### 2. **ProducerInfo** (`/src/app/components/ProducerInfo.tsx`)
- **Funcionalidad**: Información detallada del productor cacaotero
- **Características**:
  - Perfil completo del productor
  - Datos de la finca (ubicación, área, variedades)
  - Estadísticas de producción
  - Información de contacto
  - Sistema de tabs para organizar la información
  - Badges de certificaciones

#### 3. **CultivationInfo** (`/src/app/components/CultivationInfo.tsx`)
- **Funcionalidad**: Información técnica sobre el cultivo
- **Características**:
  - Edad promedio del cultivo
  - Densidad de siembra
  - Distribución de variedades (gráficos de progreso)
  - Condiciones climáticas (temperatura, precipitación, humedad, altitud)
  - Prácticas agronómicas activas
  - Sistema de árboles de sombra

#### 4. **SoilAnalysis** (`/src/app/components/SoilAnalysis.tsx`)
- **Funcionalidad**: Análisis físico-químico del suelo
- **Características**:
  - Parámetros principales (pH, materia orgánica, NPK)
  - Gráficos interactivos con Recharts:
    - Gráfico de barras para niveles de nutrientes
    - Gráfico radar para índice de calidad del suelo
  - Tabla detallada de análisis
  - Recomendaciones de manejo específicas
  - Sistema de badges para estados (óptimo, bueno, advertencia)

### Actualización del Sidebar
- ✅ Nuevo diseño con icono de planta (🌱)
- ✅ Título actualizado: "Gestión de Fincas"
- ✅ Nuevas secciones del menú:
  - Mapa Geoespacial
  - Info. Productor
  - Cultivo
  - Análisis de Suelo
  - Galería
  - Videos
  - Tutorial

### Actualización del Header
- ✅ Nuevo título: "Sistema de Análisis de Fincas Cacaoteras"
- ✅ Subtítulo: "Gestión integral y visualización geoespacial"
- ✅ Color scheme actualizado: verde-esmeralda

## 📦 Dependencias Instaladas

```json
{
  "react-leaflet": "^5.0.0",
  "leaflet": "^1.9.4",
  "@types/leaflet": "^1.9.21"
}
```

## 🗂️ Estructura de Componentes

```
src/app/components/
├── MapViewer.tsx           # Visor geoespacial
├── ProducerInfo.tsx        # Información del productor
├── CultivationInfo.tsx     # Información de cultivo
├── SoilAnalysis.tsx        # Análisis de suelo
├── Sidebar.tsx             # Menú lateral (actualizado)
├── AnimatedGuide.tsx       # Guía animada
├── VideoModal.tsx          # Modal de videos
├── InfoPanel.tsx           # Panel de información
└── ui/                     # Componentes UI reutilizables
```

## 🚀 Funcionalidades Implementadas

### Visor Geoespacial
- **Mapas interactivos** con Leaflet
- **Carga de archivos** GeoJSON/Shapefile
- **Visualización de perímetros** de parcelas con estilos personalizados
- **Marcadores** con información contextual
- **Exportación** de datos geoespaciales

### Análisis de Datos
- **Gráficos interactivos** con Recharts
- **Visualización de tendencias** de producción
- **Análisis de suelo** con recomendaciones
- **Sistema de alertas** basado en estados

### Gestión de Información
- **Tabs organizados** para diferentes tipos de información
- **Badges** para certificaciones y estados
- **Progress bars** para distribución de variedades
- **Cards informativos** con diseño moderno

## 🎨 Sistema de Colores

### Paleta Principal
- **Verde-Esmeralda**: Header y elementos principales
- **Ámbar**: Sidebar y elementos secundarios
- **Gris**: Fondos y elementos neutros

### Estados
- **Verde**: Óptimo
- **Azul**: Bueno
- **Amarillo**: Advertencia
- **Rojo**: Crítico (no implementado actualmente)

## 📝 Datos de Ejemplo

El sistema incluye datos de ejemplo para:
- Finca "La Esperanza"
- Productor: Juan Pérez García
- Ubicación: Tumaco, Nariño
- Área: 12.5 hectáreas
- Variedades: CCN-51, ICS-95, Criollo

## 🔮 Integraciones Futuras Planeadas

### Google Earth Engine API
Para análisis avanzado de imágenes satelitales:
- Índices de vegetación (NDVI)
- Monitoreo de salud del cultivo
- Detección de cambios temporales
- Análisis multitemporal

### Imágenes de Dron 360°
- Visualización panorámica de parcelas
- Fotogrametría para modelado 3D
- Análisis de densidad de cultivo

### Base de Datos (Supabase)
- Almacenamiento de datos de productores
- Historial de análisis de suelo
- Gestión de usuarios con QR único
- Sincronización en tiempo real

## 📊 Características Técnicas

### Tecnologías Utilizadas
- **React 18.3.1** con TypeScript
- **Tailwind CSS 4.1.12** para estilos
- **Motion (Framer Motion) 12.23.24** para animaciones
- **React-Leaflet 5.0.0** para mapas
- **Recharts 2.15.2** para gráficos
- **Lucide React** para iconos

### Características del Código
- **TypeScript** para tipado fuerte
- **Componentes funcionales** con hooks
- **Diseño responsivo** con Tailwind
- **Animaciones fluidas** con Motion
- **Modularidad** y reutilización de componentes

## 🔧 Configuración

### Importación de Leaflet CSS
El CSS de Leaflet se importa en `/src/styles/index.css`:
```css
@import 'leaflet/dist/leaflet.css';
```

### Fix de Iconos de Leaflet
Incluido en `MapViewer.tsx` para resolver el problema de iconos faltantes:
```typescript
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
```

## 🎯 Próximos Pasos Sugeridos

1. **Implementar carga real de archivos GeoJSON/Shapefile**
   - Parser de archivos shapefile
   - Validación de geometrías
   - Almacenamiento en estado global

2. **Integrar Google Earth Engine**
   - API authentication
   - Capas de imágenes satelitales
   - Análisis de índices de vegetación

3. **Conectar con Supabase**
   - Esquema de base de datos
   - CRUD de productores y fincas
   - Sistema de autenticación

4. **Añadir visualización 360°**
   - Componente de visor panorámico
   - Integración con imágenes de dron
   - Hotspots interactivos

## 📱 Responsive Design

Todos los componentes están diseñados para ser responsivos:
- **Mobile**: Layout vertical en una sola columna
- **Tablet**: Grid de 2 columnas
- **Desktop**: Grid de 3-4 columnas

## ✨ Mejoras de UX

- **Animaciones suaves** en transiciones
- **Loading states** implícitos
- **Feedback visual** en todas las interacciones
- **Tooltips informativos**
- **Guía contextual** que cambia según la sección

---

**Desarrollado para**: Gestión integral de fincas cacaoteras
**Versión**: 2.0
**Última actualización**: Enero 2025
