import React from 'react'

export function Hero() {
  return (
    <section>
      <div className='flex felx-column  '>
      <div className="px-4 py-8 inline " >
        <h1 className=" text-2xl float-left tracking-tight text-gray-800  inline">
          How to Use?
        </h1>
        <br /> <br />
        <ol  className=" float-left mt-4  max-w-4xl text-gray-500">
            <li  className=" float-left">1.  Get the video URl you want to ask Questions to.</li><br />
            <li className=" float-left">2.  Post it in the URL bar, and ask the Question related to it.</li><br />
            <li className=" float-left">3.  Click Submit and have you Answer.</li>
        </ol>    
      </div>
      
      </div>
    </section>
  )
}
