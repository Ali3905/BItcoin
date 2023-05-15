import React from 'react'

function HamMenu({model, setmodel}) {
  return (

    <div className='bg-black w-1/2 h-full z-50'>
        {model && (
            <div className='bg-black w-1/2'>
                <p className='text-white'>hii</p>
        
            </div>
        )}
    </div>

  )
}

export default HamMenu