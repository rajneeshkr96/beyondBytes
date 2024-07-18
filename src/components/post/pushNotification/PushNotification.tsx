"use client"

import SubmitButton from '@/components/layoutComponents/Button/SubmitButton';
import useFcmToken from '@/tools/useFcmToken';
import axios from 'axios';
import { useEffect, useState } from 'react';


const PushNotification = () => {
  const { wait,fcmToken, notificationPermissionStatus,setNotificationPermissionStatus } = useFcmToken();
  
  const saveToken = async (token: string) => {
    await axios.post("/api/pushNotification", { token: token });
  };
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
        if (fcmToken) saveToken(fcmToken);
        console.log('FCM Token:', fcmToken);
      }
    }
  }, [fcmToken, notificationPermissionStatus]);


  return (
    <>
      {notificationPermissionStatus==="default" && wait && <div className='w-screen h-screen fixed top-0 left-0 bg-white flex justify-center items-center z-50 px-4'>
        <div className='text-center bg-black text-white py-2 px-4 rounded-xl'>
        <p>Notification 🔔 Request  which make 😎 you updated with 🔥 us!</p>
        <button className='bg-red-600 py-1 px-2 rounded-md mx-4' onClick={()=>setNotificationPermissionStatus('denied')}>cancel</button>
          <SubmitButton onClick={() => {
            Notification.requestPermission().then((permission) => {
              if (permission === 'granted') {
                setNotificationPermissionStatus('granted');
              }
            });
          }}>
            Allow Notifications
          </SubmitButton>
        </div>
        </div>}
    </>

  ); // This component is primarily for handling foreground notifications
};

export default PushNotification;
