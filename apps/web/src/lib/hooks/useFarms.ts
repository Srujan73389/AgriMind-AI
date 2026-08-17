// Mocking React Query hooks for now as it wasn't specified to install react-query
// In a real app, this would use @tanstack/react-query

import { useState, useEffect } from 'react';
import { Farm } from '@/types';
import api from '../api';

export function useFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    setTimeout(() => {
      setFarms([
        { id: '1', name: 'North Valley', location: { lat: 0, lng: 0 }, area: 150, crops: ['Corn'] },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { farms, isLoading };
}

export function useFarm(id: string) {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Mock fetch
      setTimeout(() => {
        setFarm({ id, name: 'Mock Farm', location: { lat: 0, lng: 0 }, area: 100, crops: ['Wheat'] });
        setIsLoading(false);
      }, 500);
    }
  }, [id]);

  return { farm, isLoading };
}
