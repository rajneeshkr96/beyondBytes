
import React from 'react';
import Navbar from '../Navbar';
import Footer from "@/components/Footer/Footer";
import {data} from "@/components/Footer/data"
import MediaQuery from '../MediaQuery';
import FooterNav from '../FooterNav';


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
      <MediaQuery maxSize={720}>
        <FooterNav/>
      </MediaQuery>
    </div>
  )
}