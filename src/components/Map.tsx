import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Initialize Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  center: [number, number];
  zoom: number;
  markers: Array<{
    id: number;
    position: [number, number];
    popupContent: React.ReactNode;
    icon?: L.DivIcon;
  }>;
  polygons?: Array<{
    id: number;
    positions: [number, number][];
    options?: L.PathOptions;
  }>;
  className?: string;
}

const MapContent: React.FC<{ markers: MapProps['markers']; polygons?: MapProps['polygons'] }> = ({ 
  markers, 
  polygons 
}) => {
  const map = useMap();
  const zoomControlRef = useRef<L.Control.Zoom | null>(null);

  useEffect(() => {
    // Add zoom control to the right side if not already added
    if (!zoomControlRef.current) {
      zoomControlRef.current = L.control.zoom({
        position: 'topright'
      }).addTo(map);
    }

    // Handle map resize
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    const container = map.getContainer();
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (zoomControlRef.current) {
        zoomControlRef.current.remove();
        zoomControlRef.current = null;
      }
    };
  }, [map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(marker => (
        <Marker 
          key={marker.id} 
          position={marker.position}
          icon={marker.icon}
        >
          <Popup className="custom-popup">
            {marker.popupContent}
          </Popup>
        </Marker>
      ))}
      {polygons?.map(polygon => (
        <Polygon
          key={polygon.id}
          positions={polygon.positions}
          pathOptions={polygon.options || { color: '#059669', fillColor: '#059669', fillOpacity: 0.2 }}
        />
      ))}
    </>
  );
};

const Map: React.FC<MapProps> = ({ center, zoom, markers, polygons, className }) => {
  const instanceId = useRef(`map-${Math.random()}`);

  return (
    <MapContainer
      key={instanceId.current}
      center={center}
      zoom={zoom}
      className={`${className} relative z-0`}
      zoomControl={false}
    >
      <MapContent markers={markers} polygons={polygons} />
    </MapContainer>
  );
};

export default Map;