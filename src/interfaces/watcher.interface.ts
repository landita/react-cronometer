export interface Watcher {
  time: number;
  isActive: boolean;
  alarmTime: number;
  alarmInterval: number;
  isAlarmActive: boolean;
  setTime: (interval: number) => void;
  setInitialTime: (interval: number) => void;
  setIsActive: (isActive: boolean) => void;
  setAlarmTime: (value: number) => void;
  setAlarmInterval: (value: number) => void;
  cleanAlarmInterval: (value: number) => void;
  setIsAlarmActive: (value: boolean) => void;
}
