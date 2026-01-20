import { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Upload, Download, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Ejemplo de datos GeoJSON para perímetro de parcela
const sampleParcelData = {
  type: 'Feature',
  properties: {
    name: 'Parcela Principal',
    area: '12.5 hectáreas',
    producer: 'Juan Pérez',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-76.5, 2.4],
        [-76.49, 2.4],
        [-76.49, 2.41],
        [-76.5, 2.41],
        [-76.5, 2.4],
      ],
    ],
  },
};

export function MapViewer() {
  const center: [number, number] = [2.405, -76.495];
  const zoom = 14;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const geojson = JSON.parse(e.target?.result as string);
          console.log('GeoJSON cargado:', geojson);
          // Aquí se procesaría el archivo shapefile/GeoJSON
        } catch (error) {
          console.error('Error al leer el archivo:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      layer.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold">${feature.properties.name || 'Parcela'}</h3>
          <p class="text-sm">Área: ${feature.properties.area || 'N/A'}</p>
          <p class="text-sm">Productor: ${feature.properties.producer || 'N/A'}</p>
        </div>
      `);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6">
      {/* Controles superiores */}
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-semibold">Visor Geoespacial</h2>
          </div>
          
          <div className="flex gap-2">
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Cargar Shapefile/GeoJSON
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".geojson,.json,.shp"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </Card>

      {/* Mapa */}
      <Card className="flex-1 overflow-hidden">
        <MapContainer
          center={center}
          zoom={zoom}
          className="h-full w-full"
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Capa satelital alternativa */}
          {/* <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Esri"
          /> */}
          
          {/* GeoJSON de ejemplo */}
          <GeoJSON
            data={sampleParcelData as any}
            style={{
              color: '#f59e0b',
              weight: 3,
              fillColor: '#fbbf24',
              fillOpacity: 0.2,
            }}
            onEachFeature={onEachFeature}
          />
          
          {/* Marcador del centro de la finca */}
          <Marker position={center}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">Centro de la Finca</h3>
                <p className="text-sm">Coordenadas: {center[0]}, {center[1]}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </Card>

      {/* Información adicional */}
      <Card className="p-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Área Total</p>
            <p className="font-semibold text-lg">12.5 ha</p>
          </div>
          <div>
            <p className="text-gray-600">Cultivo de Cacao</p>
            <p className="font-semibold text-lg">10.2 ha</p>
          </div>
          <div>
            <p className="text-gray-600">Otras Áreas</p>
            <p className="font-semibold text-lg">2.3 ha</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
