// hooks/useFcmToken.ts
import { useState, useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import firebaseApp from '@/app/firebase/firbase';
// Corrected import path

const useFcmToken = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [wait, setWait] = useState(false);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermissionStatus(Notification.permission);
    }
    if(Notification.permission === "default"){
      setTimeout(() => {
        setWait(true);
      }, 5000)
    }
  }, []);

  useEffect(() => {
    const requestPermissionAndGetToken = async () => {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        try {
          const currentToken = await getToken(messaging, { vapidKey: 'BGfPo8UDSGQZCqqA_Gq3U_ioWiNs3aNUVv7Quoq5ni6vYuDWDTxo5CI8h6NEnkQKAE7ysgCPQDeATpTG4mbhDTI' });
          if (currentToken) {
            setFcmToken(currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        } catch (err) {
          console.log('An error occurred while retrieving token. ', err);
        }

        onMessage(messaging, (payload) => {
          console.log('Message received. ', payload);
        });
      }
      
    };

    requestPermissionAndGetToken();
  }, [notificationPermissionStatus]);

  return { wait,fcmToken, notificationPermissionStatus, setNotificationPermissionStatus };
};

export default useFcmToken;
