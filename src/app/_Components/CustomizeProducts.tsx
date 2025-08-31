


import React from 'react'

export default function CustomizeProducts() {
  return (
    <div className="flex flex-col gap-6">
      {/* Colors */}
      <div className="flex flex-col gap-4 py-2">
        <h4 className="font-medium">Choose a Color</h4>
        <ul className="flex items-center gap-3">
          {/* disabled */}
          <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative bg-white  cursor-not-allowed">
            <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </li>
          {/* selected */}
          <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative bg-amber-500 cursor-pointer">
            <div className="absolute w-9 h-9 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </li>
          {/* another one */}
          <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative bg-blue-500 cursor-pointer"></li>
        </ul>
      </div>
      {/* Others */}
      <div className="flex flex-col gap-4 py-2">
        <h4 className="font-medium">Choose a Size</h4>
        <ul className="flex items-center gap-3">
          <li className="ring-1 ring-[#F35C7A] text-[#F35C7A] text-sm font-medium rounded-md px-4 py-1 cursor-pointer ">
            Small
          </li>
          <li className="ring-1 ring-[#F35C7A] text-[#F35C7A] text-sm font-medium rounded-md px-4 py-1 cursor-pointer ">
            Medium
          </li>
          <li className="ring-1 ring-[#F35C7A] text-[#F35C7A] text-sm font-medium rounded-md px-4 py-1 cursor-pointer ">
            Large
          </li>
        </ul>
      </div>
    </div>
  );
}
