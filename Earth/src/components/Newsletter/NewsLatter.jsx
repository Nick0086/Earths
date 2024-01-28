import React from 'react'
import "./NewsLatter.css"
import Button from '../Button'

function NewsLatter() {




  return (
    <section className='NewsLatter flex justify-center items-center' >
      <div className='bg-white rounded-lg ease-in-out lg:w-2/4 md:w-3/4 w-[90%]  md:p-10 p-5 text-center' >
        <h2 className='md:text-3xl  text-2xl text-dark-green font-semibold mb-5' >SUBSCRIBE TO OUR NEWSLETTER</h2>
        <p className='text-light-green text-sm tracking-wide mb-5' >We are always open to talk about your business, new projects, creative opportunities and how we can help you.</p>
        <div className='flex justify-between items-center' >
          <input type="text" className='w-[70%] outline-none p-2 py-3  rounded-lg text-sm bg-[#FAFAFA] ' placeholder='Email address' />
          <Button classname={"rounded-lg w-[30%] ms-4 py-3 text-sm"}>Submit</Button>
        </div>
      </div>
    </section>
  )
}

export default NewsLatter