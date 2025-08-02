import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-end bg-white">
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-700">Advocate John Doe</div>
          <div className="text-xs text-slate-500">Mumbai High Court</div>
        </div>
        <div className="relative">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
        </div>
        <button className="md:hidden bg-gray-100 p-2 rounded-lg">
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;