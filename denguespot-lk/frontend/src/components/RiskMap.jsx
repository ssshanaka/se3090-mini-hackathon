import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function RiskMap({ zones }) {
  // Center roughly on Colombo/Gampaha area
  const defaultCenter = [6.9271, 79.8612];
  const defaultZoom = 10;

  const getRiskColor = (level) => {
    switch (level) {
      case 'High':
        return '#ef4444'; // Tailwind red-500
      case 'Moderate':
        return '#f59e0b'; // Tailwind amber-500
      case 'Low':
        return '#22c55e'; // Tailwind green-500
      default:
        return '#94a3b8'; // Tailwind slate-400
    }
  };

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm z-0">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {zones.map((zone) => (
          <CircleMarker
            key={zone.id}
            center={[zone.lat, zone.lng]}
            pathOptions={{
              color: getRiskColor(zone.riskLevel),
              fillColor: getRiskColor(zone.riskLevel),
              fillOpacity: 0.7,
            }}
            radius={15}
          >
            <Popup>
              <div className="p-1 min-w-[200px]">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{zone.mohName}</h3>
                <p className="text-sm text-slate-500 mb-2">{zone.district} District</p>
                <div className="mb-2">
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor: getRiskColor(zone.riskLevel) + '33',
                      color: getRiskColor(zone.riskLevel),
                    }}
                  >
                    {zone.riskLevel} Risk
                  </span>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-slate-500">Active Cases</p>
                  <p className="text-xl font-bold text-slate-900">{zone.activeCases}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Action Directive</p>
                  <p className="text-sm text-slate-700">{zone.recommendedAction}</p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
