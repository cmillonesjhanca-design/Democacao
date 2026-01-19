# 📋 Recomendaciones Técnicas para Sistema Interactivo de Cacao

## 🎯 Objetivo del Proyecto
Sistema interactivo que permite visualizar mapas (TIF), videos (MP4), y contenido multimedia para explorar el proceso de producción del cacao con navegación tipo Google Maps.

---

## 🛠️ Stack Tecnológico Recomendado

### Frontend (Implementado)
- ✅ **React 18.3** - Framework principal
- ✅ **TypeScript** - Tipado seguro
- ✅ **Tailwind CSS** - Estilos responsivos
- ✅ **Motion (Framer Motion)** - Animaciones fluidas
- ✅ **Vite** - Build tool rápido

### Backend & Almacenamiento (Recomendado)
- 🔥 **Supabase** - Backend completo (Base de datos + Storage + Auth)
- 📦 **Supabase Storage** - Almacenamiento de archivos grandes
- 🔐 **Supabase Auth** - Sistema de autenticación con QR único
- 💾 **PostgreSQL** - Base de datos (incluida en Supabase)

---

## 📁 Manejo de Archivos Pesados

### Problema: Imágenes TIF y Videos MP4 muy pesados

#### 1️⃣ **Optimización de Imágenes TIF**

**Conversión de formatos:**
```bash
# Convertir TIF a formatos web optimizados
# Usando ImageMagick
magick convert imagen.tif -quality 85 imagen.jpg
magick convert imagen.tif -quality 90 imagen.webp

# Crear tiles para mapas grandes (como Google Maps)
gdal2tiles.py -z 1-18 mapa_grande.tif output_tiles/
```

**Formatos recomendados para web:**
- **WebP** - 30% más liviano que JPEG
- **JPEG Progressive** - Carga incremental
- **AVIF** - Formato moderno, 50% más liviano

**Herramientas:**
- [Squoosh](https://squoosh.app/) - Compresión online
- [ImageMagick](https://imagemagick.org/) - CLI potente
- [Sharp](https://sharp.pixelplumbing.com/) - Procesamiento en Node.js

#### 2️⃣ **Optimización de Videos MP4**

**Compresión con FFmpeg:**
```bash
# Reducir tamaño manteniendo calidad
ffmpeg -i video.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

# Crear versiones de múltiples resoluciones (Adaptive Bitrate)
# 1080p
ffmpeg -i video.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 video_1080p.mp4
# 720p
ffmpeg -i video.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 video_720p.mp4
# 480p
ffmpeg -i video.mp4 -vf scale=854:480 -c:v libx264 -crf 23 video_480p.mp4

# Crear thumbnails
ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 thumbnail.jpg
```

**Streaming Adaptivo:**
```bash
# HLS (HTTP Live Streaming) - Recomendado
ffmpeg -i video.mp4 \
  -profile:v baseline -level 3.0 \
  -start_number 0 -hls_time 10 -hls_list_size 0 \
  -f hls output.m3u8
```

#### 3️⃣ **Tiling de Mapas (Estilo Google Maps)**

Para imágenes muy grandes, usar sistema de tiles:

**Con Leaflet.js:**
```bash
npm install leaflet react-leaflet
```

```tsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

<MapContainer center={[0, 0]} zoom={13}>
  <TileLayer
    url="https://tu-cdn.com/tiles/{z}/{x}/{y}.png"
    maxZoom={19}
  />
</MapContainer>
```

**Generar tiles:**
```bash
# Con GDAL
gdal2tiles.py -p mercator -z 0-5 mapa_grande.tif tiles_output/

# Con MapTiler
# https://www.maptiler.com/desktop/
```

---

## ☁️ Almacenamiento y CDN

### Opción 1: Supabase Storage (Recomendado)

**Ventajas:**
- ✅ Almacenamiento ilimitado de archivos
- ✅ CDN integrado globalmente
- ✅ Transformación de imágenes on-the-fly
- ✅ Control de acceso por políticas
- ✅ Carga resumible para archivos grandes

**Implementación:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_KEY'
);

// Subir archivo grande
async function uploadLargeFile(file: File) {
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(`public/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) throw error;
  
  // Obtener URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('videos')
    .getPublicUrl(data.path);
  
  return publicUrl;
}

// Descargar con transformación de imagen
const imageUrl = supabase.storage
  .from('images')
  .getPublicUrl('mapa.tif', {
    transform: {
      width: 800,
      height: 600,
      format: 'webp',
      quality: 80
    }
  }).data.publicUrl;
```

### Opción 2: Cloudinary

**Ventajas:**
- ✅ Transformación automática de medios
- ✅ Optimización inteligente
- ✅ Video streaming adaptivo

**Implementación:**
```bash
npm install cloudinary
```

```typescript
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: { cloudName: 'YOUR_CLOUD_NAME' }
});

// Video con calidad automática
const videoUrl = cld.video('sample')
  .format('auto')
  .quality('auto')
  .toURL();
```

### Opción 3: AWS S3 + CloudFront

Para proyectos empresariales grandes:
- S3: Almacenamiento
- CloudFront: CDN global
- Lambda@Edge: Transformación de imágenes

---

## 🎨 Implementación de Vista 360° (Futuro)

Cuando tengas las imágenes de dron 360°:

### Opción 1: Pannellum (Código Abierto)
```bash
npm install pannellum-react
```

```tsx
import { Pannellum } from "pannellum-react";

<Pannellum
  width="100%"
  height="500px"
  image="https://tu-cdn.com/imagen-360.jpg"
  pitch={10}
  yaw={180}
  hfov={110}
  autoLoad
  onLoad={() => console.log("Panorama cargado")}
>
  <Pannellum.Hotspot
    type="custom"
    pitch={31}
    yaw={150}
    handleClick={() => mostrarVideo()}
  />
</Pannellum>
```

### Opción 2: Photo Sphere Viewer
```bash
npm install @photo-sphere-viewer/core
```

### Opción 3: Three.js + React Three Fiber
Para control total:
```bash
npm install three @react-three/fiber @react-three/drei
```

---

## 🔐 Sistema de Acceso con QR Único

### Implementación con Supabase Auth

**1. Generar QR único por usuario:**
```bash
npm install qrcode uuid
```

```typescript
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

// Generar token único
async function generateAccessToken() {
  const token = uuidv4();
  
  // Guardar en Supabase
  const { data, error } = await supabase
    .from('access_tokens')
    .insert({
      token: token,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
      is_used: false
    });
  
  // Generar QR
  const qrDataUrl = await QRCode.toDataURL(
    `${window.location.origin}/access?token=${token}`
  );
  
  return { token, qrDataUrl };
}

// Validar acceso
async function validateAccess(token: string) {
  const { data, error } = await supabase
    .from('access_tokens')
    .select('*')
    .eq('token', token)
    .eq('is_used', false)
    .single();
  
  if (!data || new Date(data.expires_at) < new Date()) {
    throw new Error('Token inválido o expirado');
  }
  
  // Marcar como usado
  await supabase
    .from('access_tokens')
    .update({ is_used: true, used_at: new Date() })
    .eq('token', token);
  
  return data;
}
```

**2. Esquema de base de datos:**
```sql
CREATE TABLE access_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token UUID UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  user_metadata JSONB
);
```

---

## 🚀 Optimización de Rendimiento

### Lazy Loading

```tsx
import { Suspense, lazy } from 'react';

// Cargar componentes bajo demanda
const VideoModal = lazy(() => import('./VideoModal'));
const InteractiveMap = lazy(() => import('./InteractiveMap'));

<Suspense fallback={<LoadingSpinner />}>
  <VideoModal />
</Suspense>
```

### Preload de videos
```tsx
// Precargar video antes de mostrarlo
useEffect(() => {
  const video = document.createElement('video');
  video.src = videoUrl;
  video.preload = 'metadata';
}, [videoUrl]);
```

### Intersection Observer
```tsx
// Cargar contenido cuando sea visible
const [ref, inView] = useInView({
  triggerOnce: true,
  threshold: 0.1,
});

{inView && <HeavyComponent />}
```

---

## 📱 Progressive Web App (PWA)

Para acceso offline:

```bash
npm install vite-plugin-pwa
```

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
      }
    })
  ]
}
```

---

## 🎬 Resumen de Implementación

### Paso 1: Preparar archivos
```bash
# Convertir TIF a tiles
gdal2tiles.py mapa.tif tiles/

# Optimizar videos
ffmpeg -i video.mp4 -crf 23 video_optimizado.mp4
```

### Paso 2: Subir a Supabase
```typescript
// Subir tiles y videos
for (const file of files) {
  await supabase.storage.from('media').upload(file.path, file);
}
```

### Paso 3: Implementar en React
```tsx
<InteractiveMap tilesUrl={supabaseStorageUrl} />
<VideoPlayer src={videoUrl} />
```

### Paso 4: Sistema QR
```typescript
const { qrCode, token } = await generateAccessToken();
// Compartir QR con usuarios
```

---

## 📊 Estimación de Tamaños

| Tipo | Original | Optimizado | Reducción |
|------|----------|------------|-----------|
| TIF (Mapa) | 500MB | 50MB (WebP tiles) | 90% |
| MP4 (Video HD) | 200MB | 50MB (H.264 CRF 23) | 75% |
| MP4 (Video 4K) | 800MB | 150MB (H.265 CRF 28) | 81% |

---

## 🔗 Recursos Útiles

- [Supabase Docs](https://supabase.com/docs)
- [FFmpeg Guía](https://ffmpeg.org/documentation.html)
- [GDAL Tools](https://gdal.org/)
- [Leaflet.js](https://leafletjs.com/)
- [Pannellum 360](https://pannellum.org/)
- [Web Performance](https://web.dev/performance/)

---

## 💡 Próximos Pasos

1. ✅ **Demo implementada** - Sistema básico funcional
2. 🔄 **Optimizar archivos** - Convertir TIF y MP4
3. ☁️ **Conectar Supabase** - Storage y Auth
4. 🗺️ **Implementar tiling** - Para mapas grandes
5. 🎥 **Streaming adaptivo** - Videos HLS
6. 🔐 **Sistema QR** - Autenticación única
7. 📱 **PWA** - Acceso offline

---

**¿Necesitas ayuda con alguna implementación específica? ¡Avísame!**
