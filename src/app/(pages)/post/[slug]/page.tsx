import PostBody from '@/components/post/body/PostBody'
import Header from '@/components/post/header/Header'
import React from 'react'
import localFont from 'next/font/local'
import { PostFeatures } from '@/components/post/postFeatures/PostFeatures'

const ogg = localFont({ src: '../../../../fonts/Ogg-Medium-BF646c18fc4e918.otf' })
const Page = () => {
  return (
    <article>
      <Header font={ogg.className}/>
      <PostBody font={ogg.className}/>
      <PostFeatures font={ogg.className}/>
    </article>
  )
}

export default Page