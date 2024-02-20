"use client"
import React from 'react'
export default function HeroSlide() {
  interface SlideOptions{
    id:string,
    url:string,
    title:string,
    description:string
  }
  type SlideArray = SlideOptions[]
  const slide:SlideArray = [
    {id:"c1",url:"./img1.jpg",title:"Winter",description:'Winter has so much to offer - creative activities'},
    {id:"c2",url:"./img2.jpg",title:"Digital Technology",description:'Gets better every day - stay tuned'},
    {id:"c3",url:"./img3.jpg",title:"Globalization",description:'Help people all over the world'},
    {id:"c4",url:"./img4.jpg",title:"New technologies",description:'Space engineering becomes more and more advanced'},

]
  return (
    <div className='min-h-screen gap-y-4 flex flex-col'>
      <h1>beyondbytes</h1>
      <div className="min-h-96 h-[60vh] flex flex-nowrap justify-start">
        {slide.map((val,index)=><div key={val.id}>
        <input type="radio" name="slide" id={val.id} defaultChecked={index===1?true:false} />
        <label htmlFor={val.id} className="card" style={{backgroundImage:`url(${val.url})`}}>
          <div className="row">
            <div className="icon">{index+1}</div>
            <div className="description">
              <h4>{val.title}</h4>
              <p>{val.description}</p>
            </div>
          </div>
        </label>
        </div>)}
      </div>

    </div>
  )
}
