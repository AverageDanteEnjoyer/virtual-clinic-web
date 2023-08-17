import { RcFile } from 'antd/es/upload';

export const getDurationFormatted = (hours: number, minutes: number) =>
  `${hours ? `${hours}h` : ''} ${minutes ? `${minutes}m` : ''}`.trim();

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
