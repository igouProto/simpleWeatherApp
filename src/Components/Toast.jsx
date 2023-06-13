import React from 'react'
import { useEffect } from 'react'

function Toast({show, setShow, message = "Toast!"}) {

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false)
      }, 3000)
    }
  }, [show])

  return (
    <div className={`absolute 
    bottom-0 left-0 right-0 
    mx-5 mb-14 
    z-20
    py-3 px-3
    bg-white rounded-lg drop-shadow-xl transition-all
    ${show? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
      {message}
    </div>
  )
}

export default Toast