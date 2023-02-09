import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const pushNotification = (type: NotificationType, message: string, description: string) => {
  notification[type]({
    message,
    description,
    placement: 'bottomRight',
  });
};

export default pushNotification;
