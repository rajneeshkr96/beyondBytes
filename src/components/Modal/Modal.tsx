"use client";
import React, { Dispatch, FC, MutableRefObject, useEffect } from "react";
import { useRef } from "react";
interface ModelProps {
  setDialog?:Dispatch<React.SetStateAction<React.RefObject<HTMLDialogElement> | null>>; 
  btnClass?:string;
  button:React.ReactNode ;
  children:React.ReactNode;
  className?:string;
  open?:boolean;
  onClose?:()=>void;
}
const Modal:FC<ModelProps> = ({setDialog,btnClass,button="Button", children, className,onClose,open=false,...props }) => {
  const showRef = useRef<HTMLDialogElement>(null);

useEffect(() => {
  if(open && showRef){
    showRef?.current?.showModal();
    if(setDialog){
      setDialog(showRef);
    }
  }
}, [open,setDialog]);
  return (
    <>
     {!open && <button
        onClick={() => {
          showRef?.current?.showModal();
          if(setDialog){
            setDialog(showRef);
          }
        }}
        {...props}
        className={`${btnClass}   flex justify-center items-center`}
      >
       { button}
      </button>}
      <dialog ref={showRef} id="dialog" {...props} className={`px-6 py-12 rounded-3xl border-none 
      shadow-[0_5px_30px_0_rgba(0, 0, 0, 0.1)] m-auto text-center ${className}`}>
        <button
          onClick={() => {
            showRef?.current?.close();
            if(onClose){
              onClose();
            }
          }}
          aria-label="close"
          className="x cursor-pointer  border-none absolute top-4 right-3"
        >
          ❌
        </button>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
