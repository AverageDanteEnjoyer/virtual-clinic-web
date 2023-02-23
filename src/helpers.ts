export const getDurationFormatted = (hours: number, minutes: number) =>
  `${hours ? `${hours}h` : ''} ${minutes ? `${minutes}m` : ''}`.trim();
