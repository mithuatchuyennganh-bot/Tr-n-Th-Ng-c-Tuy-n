
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            T
          </div>
          <span className="text-2xl font-black gradient-text tracking-tighter">Tuyen3D</span>
        </div>
        <nav className="hidden md:flex gap-6 text-slate-600 font-medium">
          <a href="#" className="hover:text-sky-600 transition-colors">Trang chủ</a>
          <a href="#" className="hover:text-sky-600 transition-colors">Cảm hứng</a>
          <a href="#" className="hover:text-sky-600 transition-colors">Hướng dẫn</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
