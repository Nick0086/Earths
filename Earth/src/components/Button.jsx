import React from 'react'

function Button({
    children,
    type="button",
    classname="",
    disable = false,
    ...propes
}) {
  return (
    <button {...propes} type={type} disabled={disable} className={` bg-light-green ${disable? "opacity-70 hover:bg-light-green" : ""} duration-500 ease-in-out hover:bg-dark-green uppercase text-white
    md:w-[160px]  md:p-3 p-2 ${classname}`} >{children}</button>
  )
}

export default Button