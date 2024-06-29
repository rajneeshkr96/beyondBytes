"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
// import required modules
import { Scrollbar } from 'swiper/modules';
import axios from 'axios';
import FeatureCards from '../(cards)/FeatureCards/FeatureCards';
import { BlogcardProps } from '@/app/page';

const CategorySlide = ({data}:{data:BlogcardProps[]}) => {

    return (
        <>
        <div >
            <Swiper
                scrollbar={{
                    hide: true,
                  }}
                  modules={[Scrollbar]}
                  className="mx-auto"
            >
                {data.map((item, index) => (
                    <SwiperSlide className='flex justify-center' key={index}>
                        <FeatureCards
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        createdAt={item.createdAt}
                        author={item.author}
                        slug={item.slug}
                    /> 
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        
        </>
    )
}

export default CategorySlide
