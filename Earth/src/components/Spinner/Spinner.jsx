import React from 'react'

function Spinner() {
    return (
        <div className="flex items-center justify-center h-screen relative">
            <div className="animate-spin  rounded-full border-t-[10px] border-blue-500 border-opacity-25 h-28 w-28 absolute"></div>
            <div className="animate-spin rounded-full border-l-[10px] border-green-500 border-opacity-25 h-28 w-28 absolute"></div>
            <div className="animate-spin rounded-full border-r-[10px] border-red-500 border-opacity-25 h-28 w-28 absolute"></div>
            <div className="animate-spin rounded-full border-b-[10px] border-yellow-500 border-opacity-25 h-28 w-28 absolute"></div>
        </div>
    )
}

export default Spinner;