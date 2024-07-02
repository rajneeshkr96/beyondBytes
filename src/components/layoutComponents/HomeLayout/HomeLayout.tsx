
import React from 'react';
import Navbar from '../Navbar';
import Footer from "@/components/Footer/Footer";
import {data} from "@/components/Footer/data"


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      <Navbar/>
      {children}
      <Footer data={data} />
    </div>
  )
}