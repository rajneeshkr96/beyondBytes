import Link from 'next/link'
import React from 'react'
import { CiLink } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from 'react-toastify';
const ShareOptions = ({link}:{link:string}) => {
    const btnClass = 'w-full px-4 py-4 capitalize text-center flex justify-center items-center gap-x-2'
    const onCopy = () => {
      navigator.clipboard.writeText(link).then(() => {
        toast.success("Copy successfully")
      }).catch((error) => {
        toast.error("Copy failed with error " + error + "")
      })
    }
    
    return (
      <>
        <button onClick={onCopy} className={btnClass}><CiLink /> <span>copy link</span></button>
        <Link href={"#"} target='_blank'  className={`${btnClass} border-t`}><FaFacebookF /> <span>share of facebook</span> </Link>
        <Link href={"#"} target='_blank' className={`${btnClass} `}><FaXTwitter /> <span>share of twitter</span> </Link>
        <Link href={"#"} target='_blank' className={`${btnClass} `}><FaWhatsapp /><span>share of whatsapp</span> </Link>
        <Link href={"#"} target='_blank' className={`${btnClass} `}><FaLinkedinIn /><span>share of linkedin</span> </Link>
      </>
    ) 
}

export default ShareOptions

