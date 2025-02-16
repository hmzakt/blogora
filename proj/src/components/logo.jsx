import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div>
      <div><img className='rounded-xl' src='/svgs/logo.svg'/></div>
    </div>
  )
}

export default Logo
