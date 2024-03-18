import Image from 'next/image'
import React from 'react'

function Recorder() {
  return (
    <div className='flex items-center justify-center text-white'>
      <Image src={"/active.gif"} height={150} width={150} priority alt='now recording' className='rounded-full' />
      {/* <Image src={"/notactive.png"} height={350} width={350} alt='click to record' /> */}
    </div>
  )
}

export default Recorder
