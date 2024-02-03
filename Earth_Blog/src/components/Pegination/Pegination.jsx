import React from 'react'
import Button from '../Button'

function Pegination({page,pageHandler,total,}) {

    return (
        <div className='text-center mt-8' >
            <Button classname='md:w-[70px] md:py-[8px] rounded-lg mx-2' disable={page === 1} onClick={() => pageHandler(page-1)} >Prev</Button>
            <Button classname='md:w-[70px] md:py-[8px] rounded-lg mx-2' disable={page === total} onClick={() => pageHandler(page+1)} >Next</Button>
        </div>
    )
}

export default Pegination;