export const convertions = [
  {
    id: 1,
    unit: 'H',
    convert: (value: number) =>
      ('0' + Math.floor((value / (60000 * 3600)) * 60)).slice(-2),
  },
  {
    id: 2,
    unit: 'M',
    convert: (value: number) =>
      ('0' + Math.floor((value / (60000 * 60)) * 60)).slice(-2),
  },
  {
    id: 3,
    unit: 'S',
    convert: (value: number) =>
      ('0' + Math.floor((value / 60000) * 60)).slice(-2),
  },
  {
    id: 4,
    unit: 'MS',
    convert: (value: number) => ('0' + (value / 1000) * 100).slice(-2),
  },
];
