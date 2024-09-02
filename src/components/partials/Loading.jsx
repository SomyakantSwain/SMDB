import React from 'react'
import  loader1 from '../../../public/loader1.gif'

const Loading = () => {
  return (
    <div className=' bg-black  w-screen h-screen flex justify-center items-center' >

        <img className=' object-cover  h-[33%]   ' src={loader1} alt="" />
    </div>
  )
}

export default Loading