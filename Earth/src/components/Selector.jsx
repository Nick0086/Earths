import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    labelclass,
    mainDivClass,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className={`w-full ${mainDivClass}`}>
            {
                label && <label htmlFor={id} className={`block text-sm text-dark-green font-semibold mb-2 leading-5 ${labelclass}`}>{label}</label>
            }
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)