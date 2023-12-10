import React from 'react'

const FlashMessage = ({message}) => {
  return (
    <div className="bg-green-400 text-sm text-white px-4 py-3 mb-4">{message}</div>
  )
}

export default FlashMessage