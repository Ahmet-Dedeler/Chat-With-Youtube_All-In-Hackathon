import React from 'react';
import { CheckCircle } from 'lucide-react';

export function SuccessBanner({showResponse}) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  return (
    <div style={containerStyle} className="rounded-md border-l-4 border-green-500 bg-green-100 p-4">
      <div className="flex items-center justify-between space-x-4">
        <h4>Response:</h4>
        <div>
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-green-600 float-left mt-4">
          {showResponse}
        </p>
      </div>
    </div>
  );
}
