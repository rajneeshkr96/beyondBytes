import React,{useState} from 'react'
import Modal from './Modal'

interface EditProfileModalProps {
    open: boolean;
    onClose:()=>void;
    button: React.ReactNode;
    setDialogRef: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDialogElement> | null>>;
    }
const EditProfileModal: React.FC<EditProfileModalProps> = ({open,onClose,button}) => {
    const [dialogRef, setDialogRef] = useState<React.RefObject<HTMLDialogElement> | null>(null);

  return (
    <Modal  open={open} onClose={onClose} setDialog={setDialogRef} btnClass='w-full' className='!px-20 ' button={button}>
        <div>
            click me
        </div>
    </Modal>
      
 
  )
}

export default EditProfileModal