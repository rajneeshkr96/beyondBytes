"use client"
import React from 'react'
import SubmitButton from '../layoutComponents/Button/SubmitButton'

const Test = () => {
    const testing = async ()=>{
        const permission = await Notification.requestPermission();
        console.log(permission);
    }
  return (
    <div>
        <SubmitButton onClick={testing}>
            testing
        </SubmitButton>
      
    </div>
  )
}

export default Test
