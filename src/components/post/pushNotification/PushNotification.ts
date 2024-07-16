"use client"
import useFcmToken from '@/tools/useFcmToken';
import { useEffect } from 'react';


const PushNotification = () => {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((err) => {
          console.log('Service Worker registration failed:', err);
        });
    }
  }, []);
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
