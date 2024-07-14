"use client"
import useFcmToken from '@/tools/useFcmToken';
import { useEffect } from 'react';


const PushNotification = () => {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        console.log('FCM Token:', fcmToken);
      }
    }
  }, [fcmToken, notificationPermissionStatus]);

  return null; // This component is primarily for handling foreground notifications
};

export default PushNotification;
