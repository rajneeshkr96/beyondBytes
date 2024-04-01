// ImageUploadModal.tsx

import React, { useState, useRef } from 'react';
import Modal from '@/components/Modal/Modal';
import { UploadButton } from '@/utilis';
import { PreImageProps } from '@/app/(pages)/write/[operation]/page';
import { toast } from 'react-toastify';

interface ImageUploadModalProps {
  preImage: PreImageProps;
  setPreImage: React.Dispatch<React.SetStateAction<PreImageProps>>;
  button: React.ReactNode;
  heroImageRef: React.RefObject<HTMLInputElement>;
  open?: boolean;
  AdditonalWork?:()=>void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ preImage, setPreImage,open, button, heroImageRef,AdditonalWork }) => {
  const [dialogRef, setDialogRef] = useState<React.RefObject<HTMLDialogElement> | null>(null);
  const [method, setMethod] = useState("uploadthing");

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMethod(e.target.value);
  };

  return (
    <Modal open={open} setDialog={setDialogRef } btnClass='w-full' className='!px-20 ' button={button}>
      <input
        onChange={(e) => {
          setPreImage({ src: preImage.src, alt: e.target.value });
          
        }}
        value={preImage.alt}
        type="text"
        placeholder='image title....'
        className="w-full px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
      />
      <div className='flex justify-center gap-x-4 mx-auto my-6'>
        <label>
          <input
            type="radio"
            name="method"
            value="uploadthing"
            checked={method === 'uploadthing'}
            onChange={onChange}
            className="mx-2"
          />
          uploadthing
        </label>
        <label>
          <input
            type="radio"
            name="method"
            value="url"
            checked={method === 'url'}
            onChange={onChange}
            className="mx-2"
          />
          url
        </label>
      </div>
      {method === "uploadthing" && (
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setPreImage({ src: res[0].url, alt: "" });
            dialogRef?.current?.close();
            AdditonalWork?.();
          }}
          onUploadError={(error: Error) => {
            dialogRef?.current?.close();
            toast.error(error.message);
          }}
        />
      )}
      {method === "url" && (
        <div>
          <input
            type="url"
            ref={heroImageRef}
            placeholder='cover banner URL...'
            className="w-[70%] px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          />
          <button
            className='py-2 px-4 bg-black text-white rounded-md my-2'
            onClick={() => {
              if (heroImageRef.current?.value) {
                setPreImage({ src: heroImageRef.current.value, alt: "" });
              } else {
                toast.error("url not found");
              }
              dialogRef?.current?.close();
            }}
          >
            add cover image...
          </button>
        </div>
      )}
    </Modal>


  );
};

export default ImageUploadModal;
