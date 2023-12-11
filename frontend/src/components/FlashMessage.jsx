import React from 'react'

const FlashMessage = ({message, type}) => {
  const types = {
    success: "bg-green-400",
    danger: "bg-red-400"
  }
  return (
    <div className={`${types[type]} text-sm text-white px-4 py-3 mb-4`}>{message}</div>
  )
}

export default FlashMessage