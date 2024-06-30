
import React from 'react';
import Navbar from '../Navbar';



export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}