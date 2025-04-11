import React from 'react'

const Cards = ({ primaryColor, secondaryColor, count, value, currency, label }) => {
    return (
        <div
          className="p-6 rounded-lg text-center hover:cursor-pointer duration-400 group shadow-md shadow-slate-400"
          style={{
            backgroundImage: `linear-gradient(to bottom, white 1%, ${secondaryColor} 90%, ${primaryColor} 200%)`,
            color: 'black',
          }}
        >
          <p
            className="font-bold text-white p-2 rounded-md text-lg mb-4"
            style={{ backgroundColor: primaryColor }}
          >
            {label}
          </p>
          <div className="flex justify-center items-center flex-wrap">
            <p className="text-gray-600 font-bold text-2xl ml-12">{count}</p>
            <p className="text-gray-600 font-bold text-2xl ml-16">{value}</p>
            <p
              className="text-xs p-1 rounded-md ml-2 font-bold"
              style={{
                backgroundColor: `${primaryColor}20`,
                color: primaryColor,
              }}
            >
              {currency}
            </p>
          </div>
          <div className="flex justify-center">
                <p className="text-gray-600 font-medium mr-20">Total</p>
                <p className="text-gray-600 font-medium">Value</p>
            </div>
        </div>
      );
}

export default Cards