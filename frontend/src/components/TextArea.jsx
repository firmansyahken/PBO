import React from 'react'

const TextArea = (props) => {
  return (
    <textarea {...props} className="text-sm sm:text-md w-full border-[1.5px] border-gray-300 resize-none px-6 py-2 outline-none">{props.value}</textarea>
  )
}

export default TextArea