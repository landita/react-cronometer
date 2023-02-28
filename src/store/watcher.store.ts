import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Watcher } from '../interfaces';

export const watcherStore = create<Watcher>()(
  devtools((set) => ({
    time: 0,
    isActive: false,
    alarmTime: new Date().getMilliseconds(),
    alarmInterval: 0,

    setTime: (interval: number) =>
      set((state) => ({ time: state.time + interval })),
    setInitialTime: (interval: number) => set(() => ({ time: interval })),
    setIsActive: (isActive: boolean) => set(() => ({ isActive: isActive })),
    setAlarmTime: (value: number) => set(() => ({ alarmTime: value })),
    setAlarmInterval: (value: number) =>
      set((state) => ({ alarmInterval: state.alarmInterval + value })),
    cleanAlarmInterval: (value: number) =>
      set(() => ({ alarmInterval: value })),
  })),
);
