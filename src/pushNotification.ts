import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const pushNotification = (type: NotificationType, message: string, description: string, duration = 5) => {
  notification[type]({
    message,
    description,
    placement: 'bottomRight',
    duration: duration,
  });
};

export default pushNotification;
