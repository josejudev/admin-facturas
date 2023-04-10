import React from 'react'

const ActionsButtons = ({
    isDisabled
}) => {
  return (
    <>
      <button
        disabled={isDisabled}
        className="disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-500 disabled:hover:shadow-none disabled:border-gray-500 disabled:text-gray-500 shadow-md shadow-teal-500/10 border border-teal-500 text-teal-500 hover:bg-teal-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center w-1/2 justify-center">
        Agregar
      </button>
    </>
  )
}

export default ActionsButtons
