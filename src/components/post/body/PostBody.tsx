"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect } from 'react'

interface BodyProps{

    content: string
    image:{src:string, alt:string},
}


const PostBody:FC<BodyProps> = ({content,image}) => {


    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const list = document.getElementsByTagName("h2");
    //         let counter = 1;
    //         const contentIndex = document.getElementById("content-index");
    //         for (let i = 0; i < list.length; i++) {
    //             if (!list[i].id && contentIndex) {
    //               list[i].id = `h2-${counter}`;
    //               const listItem = document.createElement('li');
    //               const anchor = document.createElement('a');
    //               anchor.href = `#h2-${counter}`;
    //               anchor.textContent = `${counter}. ${list[i].textContent}`;
    //               listItem.appendChild(anchor);
    //               contentIndex.appendChild(listItem);
    //               counter++;
    //             }
    //           }
    //     }

    // }, []);

    return (
        <div style={{ gridTemplateColumns: "70% 20%" }} className='grid gap-x-[10%] max-lg:gap-y-16 max-lg:!grid-cols-[100%] mt-4'>
            <div className='max-lg:row-start-2 max-lg:row-end-3' >
                <figure>
                    <Image src={image.src} alt={image.alt} width={2000} height={1000} className='w-full h-auto' />
                    <figcaption className='mx-auto inline-block'>Optional caption for the image, providing additional context.</figcaption>
                </figure>
                <div className='my-10 px-2 text-lg font-serif'>
                    {
                       <div className='tiptap !border-none' dangerouslySetInnerHTML={{ __html: content }} />
                    }
                </div>
            </div>

            <div className='relative max-lg:row-start-1 max-lg:row-end-2'>
                <div className='sticky top-8 left-0'>
                    <h4 className={` text-2xl`} >Content</h4>
                    <ul id='content-index'>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default PostBody
