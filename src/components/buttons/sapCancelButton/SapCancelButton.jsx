import React from 'react'

const SapCancelButton = ({ title }) => {
  return (
    <button
        className="bg-slate-500 hover:bg-slate-600 rounded text-white"
        style={{
          padding: '6px 12px',
          fontSize: '12px',
          cursor: 'pointer',
        }}
      >
        {title}
      </button>
  )
}

export default SapCancelButton