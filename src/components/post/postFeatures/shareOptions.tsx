import Link from 'next/link'
import React from 'react'

const ShareOptions = () => {
    const btnClass = 'w-full px-4 py-2 capitalize'
    return (
      <>
        <button className={btnClass}><span>copy link</span></button>
        <Link href={"#"}  className={`${btnClass} border-t`}> <span>share of facebook</span> </Link>
        <Link href={"#"} className={`${btnClass} `}><span>share of twitter</span> </Link>
        <Link href={"#"} className={`${btnClass} `}><span>share of whatsapp</span> </Link>
        <Link href={"#"} className={`${btnClass} `}><span>share of linkedin</span> </Link>
      </>
    ) 
}

export default ShareOptions

