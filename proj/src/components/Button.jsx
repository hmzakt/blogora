import React from 'react'

function Button({
    children,  //whatever texts needs to occur should be given as parameter
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text=white',
    className = '',
    ...props  //other given properties will be added here
}) {
  return (
   <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} ${...props} >
    {children}
   </button>
  )
}

export default Button
