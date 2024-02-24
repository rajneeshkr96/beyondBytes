import React from 'react'

const Tooltip = ({
    children,
    content
  }: {
    children: React.ReactNode
    content:string
  }) => {
  return (
    <div className="tooltip-container relative">
    {children}
    <span className="tooltip">{content}</span>
    </div>
  )
}

export default Tooltip
