import Link from 'next/link';
import React from 'react';

const Footer = () => (
  <div className="my-24">
    <p className="dark:text-gray-200 text-gray-700 text-center m-6">
      © 2024 All rights reserved by biyondbytes.com
    </p>
    <ul className='flex justify-center items-center gap-x-4 flex-wrap dark:text-gray-200'>
      <li><Link href="/about-us">About US</Link></li>
      <li><Link href="/contact-us">Contact US</Link></li>
      <li><Link href="/career-page">careers</Link></li>
      <li><Link href="/privacy-policy">Privacy And Policy</Link></li>
      <li><Link href="/terms-services">Terms And Services</Link></li>
      <li><Link href="/disclaimer-page">Disclaimer</Link></li>
    </ul>
  </div>
);

export default Footer;
