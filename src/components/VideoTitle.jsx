import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div>
        <button className=' bg-white text-black text-xl mr-2 font-medium p-3 px-8 rounded-md hover:bg-opacity-80'> ▷ Play</button>
        <button className='hidden md:inline-block mx-2  bg-gray-500 text-white p-3 px-12 text-xl bg-opacity-40 rounded-md hover:bg-opacity-20'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle