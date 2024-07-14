"use client";
import React, { useEffect } from 'react';
import Footer from '@/components/Footer/Footer';
import { data } from '@/components/Footer/data';
import MediaQuery from '../MediaQuery';
import FooterNav from '../FooterNav';
import PushNotification from '@/components/post/pushNotification/PushNotification';


export default function HomeLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <div>
      
      {children}
      <Footer data={data} />
      <MediaQuery maxSize={720}>
        <FooterNav />
      </MediaQuery>
      <PushNotification/>
    </div>
  );
}
