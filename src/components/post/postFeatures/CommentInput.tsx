import { errorToastHandler } from "@/components/errorTostHandler";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
interface CommentInputProps {
    id: string;
    addComment: (comment: string) => void;
    loading: boolean;
    author?: {name: string, image: string};
  }
  
  const CommentInput: React.FC<CommentInputProps> = ({ id, addComment, loading, author }) => {
    const [comment, setComment] = useState("");
  
    const handleAddComment = async () => {
      try {
        if (!comment) {
          toast.error("Please enter a comment");
          return;
        }
        addComment(comment);
        setComment("");
      } catch (error:any) {
        errorToastHandler(error);
      }
    };
  
    return (
      <div className='shadow-lg py-2'>
        <span>
          <Image src={author?.image ?? "/user.png"} alt={author?.name ?? "user"} width={200} height={300} className='w-12 h-12 rounded-full' />
          <span className='uppercase font-bold mt-3 text-gray-600'>{author?.name ?? "user"}</span>
        </span>
        <textarea onChange={(e) => setComment(e.target.value)} value={comment} name="comment" id="" placeholder='Write Your Comment Here........' className='w-full outline-none px-2 text-black my-2' cols={30} rows={6}></textarea>
        <button onClick={handleAddComment} disabled={loading} className='bg-[#333] text-white px-4 py-2 rounded-lg w-auto mx-auto block' value="comment...">
          {loading ? 'Adding Comment...' : 'Comment'}
        </button>
      </div>
    );
  };

  export default CommentInput;