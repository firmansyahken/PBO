import React from 'react'

const Validation = ({message}) => {
  return (
    <div className="text-red-500 text-sm">
        <p>{message}</p>
    </div>
  )
}

export default Validation