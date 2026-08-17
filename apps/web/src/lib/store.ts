import { create } from 'zustand';
import { Farm } from '@/types';

interface FarmStore {
  activeFarmId: string | null;
  setActiveFarmId: (id: string) => void;
}

export const useFarmStore = create<FarmStore>((set) => ({
  activeFarmId: null,
  setActiveFarmId: (id) => set({ activeFarmId: id }),
}));

interface NotificationStore {
  unreadCount: number;
  increment: () => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadCount: 0,
  increment: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  clear: () => set({ unreadCount: 0 }),
}));
