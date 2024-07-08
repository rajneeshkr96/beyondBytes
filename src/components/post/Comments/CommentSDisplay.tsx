import React from 'react'
import CommentsInput from './CommentsInput'
interface CommentSDisplayProps {
  Blogid: string;
}
const CommentSDisplay: React.FC<CommentSDisplayProps>  = ({Blogid}) => {
  return (
    <div>
        <CommentsInput BlogId={Blogid} />
    </div>
  )
}

export default CommentSDisplay