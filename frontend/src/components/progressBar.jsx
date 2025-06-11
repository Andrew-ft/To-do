import React from 'react'

export default function ProgressBar({ percentage }) {
  return (
    <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-1 bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-indigo-500 transition-all duration-500 ease-in-out" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
