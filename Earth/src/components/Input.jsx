import React, { useId } from 'react'

function Input({
    label="",
    labelclass,
    type="text",
    placeholder,
    classname,
    ...propes
},ref) {

    const id = useId();

  return (
    <>
        {
            label && <label htmlFor={id} className={`block text-sm text-dark-green font-semibold leading-5 ${labelclass}`}>{label}</label>
        }
        <input 
            type={type} 
            id={id}
            className={`outline-none bg-transparent border-b-2 placeholder:text-sm placeholder:tracking-wide  border-gray-600 py-2 focus:border-light-green duration-300 text-sm mb-4 w-full ${classname}`} 
            {...propes}
            ref={ref}
            placeholder={placeholder}
        />
    </>
  )
}

export default React.forwardRef(Input);