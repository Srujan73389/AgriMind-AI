export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'farmer' | 'expert' | 'admin';
}

export interface Farm {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  boundary?: GeoJSON.Polygon;
  area: number; // in acres or hectares
  crops: string[];
}

export interface SensorReading {
  id: string;
  farmId: string;
  type: 'moisture' | 'temperature' | 'humidity' | 'ph' | 'npk';
  value: number;
  unit: string;
  timestamp: string;
}

export interface DiseaseEvent {
  id: string;
  farmId: string;
  name: string;
  severity: number; // 0-100
  imageUrl?: string;
  detectedAt: string;
  status: 'active' | 'treated' | 'resolved';
}

export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'equipment' | 'seeds' | 'services';
  sellerId: string;
  location: { lat: number; lng: number };
}
