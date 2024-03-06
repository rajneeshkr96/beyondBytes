import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface BodyProps{
    font: string
}
const PostBody:FC<BodyProps> = ({font}) => {
    return (
        <div style={{ gridTemplateColumns: "70% 20%" }} className='grid gap-x-[10%]'>
            <div >
                <figure>
                    <Image src={"/img1.jpg"} alt={"kkk"} width={2000} height={1000} className='w-full h-[60vh]' />
                    <figcaption className='mx-auto inline-block'>Optional caption for the image, providing additional context.</figcaption>
                </figure>
                <div className='my-10 px-2 text-base'>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt repudiandae blanditiis voluptas quibusdam, qui, fugit assumenda et dolorum beatae labore excepturi, laborum soluta! Ipsam obcaecati laboriosam quisquam autem placeat laborum dolorem dolore minima iure, minus quasi sapiente inventore, dolor aliquam cupiditate corrupti impedit porro eos nemo, delectus fugiat necessitatibus explicabo quos? Quae, esse rem molestiae iure ipsa a eligendi exercitationem commodi similique reprehenderit tenetur maxime dicta ipsum nisi corrupti, impedit animi sapiente facilis fugiat culpa suscipit! Vero, ab reprehenderit. Nulla maxime eaque inventore doloribus quis praesentium! Dolores dolorum quam nam placeat, vel recusandae eligendi libero laborum laudantium excepturi tempore saepe qui pariatur iste illo tempora voluptatem magni modi. Quis ipsam placeat tenetur officia eos iste amet earum, esse pariatur eius incidunt laboriosam, iure quam provident alias magni debitis libero? Tempore, fugit sed? Aut cupiditate quas sed corporis inventore natus blanditiis accusantium, id molestiae fuga exercitationem nesciunt repellendus aliquid labore odit. A natus illum dolore, explicabo quam amet tenetur necessitatibus consequuntur cumque aperiam fuga dolor inventore quia modi nisi molestias sit blanditiis ullam! Tempora, officiis, nisi incidunt laborum praesentium, et delectus excepturi itaque sunt quasi doloribus! Tempore alias excepturi incidunt magnam quo! Quibusdam vitae consectetur voluptatum sed soluta omnis ab unde repudiandae dolorum quasi. Architecto adipisci nam ea ipsa, quis quos ipsam, vero eum rem recusandae, eligendi tempore perferendis? Inventore accusamus nihil dolorem debitis rerum recusandae voluptas voluptates nemo commodi nam quam, consectetur explicabo possimus vitae obcaecati reprehenderit quidem non, quos consequuntur dolore eos ullam laudantium adipisci! In optio voluptate cupiditate provident consectetur sed at adipisci veritatis natus explicabo suscipit harum enim ex illo ut non atque maiores dolor officia, deleniti vitae iste itaque rem veniam. Sapiente deleniti atque minima id ratione corporis aperiam, perferendis eius porro nobis doloribus, facilis similique, repudiandae dolore enim sed doloremque. Fugit quam sunt voluptate dicta, culpa et iure nisi laudantium minus, neque sit obcaecati hic non accusamus quibusdam repellat ducimus aperiam magni consequatur deleniti perspiciatis nam, ipsum rem! Deserunt aliquid dignissimos repellat eius accusamus praesentium facere commodi aliquam rem, asperiores officia dolorem delectus iure quae, repudiandae obcaecati. Cupiditate, explicabo blanditiis! Magnam recusandae sequi eum ut aliquid beatae, fugiat, vero temporibus delectus reprehenderit tempore consequuntur odit a corporis id minus impedit. Eligendi quidem, similique nostrum, eum porro consequuntur dignissimos ab cumque incidunt perspiciatis, omnis veritatis cupiditate fuga inventore natus adipisci delectus iste voluptates distinctio? Perspiciatis deserunt ipsam animi dolorem sed nulla earum iure sint laudantium porro mollitia repudiandae, tempore consequatur, sequi inventore? Recusandae magnam, in tempora deserunt quae aliquid accusamus eius, reprehenderit iste praesentium expedita, perferendis reiciendis molestias fuga labore! Possimus nam saepe quia magni nisi impedit delectus dolores earum dolore labore debitis eligendi culpa quam, itaque pariatur voluptatum sit? Optio delectus corporis reiciendis quidem maxime doloribus esse, illo placeat vitae dolores similique pariatur voluptatibus consectetur laborum a ducimus, vero praesentium asperiores. Rerum officia ea labore, eaque vero debitis fugit, laudantium blanditiis atque ab beatae porro, quaerat voluptas corporis nesciunt sequi commodi illum. Velit temporibus facere libero placeat numquam amet molestiae, perspiciatis, obcaecati tempora, quod optio?
                    </p>
                </div>
            </div>
            <div className='relative'>
                <div className='sticky top-8 left-0'>
                    <h4 className={`${font} text-2xl`}>Content</h4>
                    <ul>
                        <li><Link href={"#"}>first section </Link></li>
                        <li><Link href={"#"}>first section </Link></li>
                        <li><Link href={"#"}>first section </Link></li>
                        <li><Link href={"#"}>first section </Link></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default PostBody
