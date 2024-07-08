import React, { FC } from 'react'
interface BodyProps {
    content: string
    image: { src: string, alt: string, caption?: string },
}


const PostBody: FC<BodyProps> = ({ content }) => {


    return (
        <div className='my-10 text-lg font-serif mt-4 max-w-[799px] mx-auto'>
            {
                <div className='tiptap !border-none' dangerouslySetInnerHTML={{ __html: content }} />
            }
        </div>
    )
}

export default PostBody
