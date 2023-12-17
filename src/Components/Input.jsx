import React from 'react';

export function DefaultInput({ placeholder, classN , input , setInput }) {
  return (
    <div className="w-full">
      <input
        className={`  h-10 rounded-md  border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 w-full border-black-900 border-4 ${classN}`}
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        
      />
    </div>
  );
}
