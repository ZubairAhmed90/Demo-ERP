import React from 'react'

const SapCopyButton = ({ title, primaryColor }) => {
  return (
    <button
          style={{
            padding: '6px 12px',
            backgroundColor: primaryColor,
            color: '#fff',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          {title}
        </button>
  )
}

export default SapCopyButton