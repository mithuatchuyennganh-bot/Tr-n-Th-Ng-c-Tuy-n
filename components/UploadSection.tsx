
import React from 'react';

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
  previewUrl: string | null;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onFileSelect, previewUrl }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Từ Phác Thảo Đến <span className="gradient-text">Hiện Thực 3D</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Tải lên bản vẽ tay của bạn, chúng tôi sẽ biến nó thành concept 3D chuyên nghiệp và hướng dẫn bạn chế tác từ vật liệu tái chế.
        </p>
      </div>

      <div className="relative group cursor-pointer w-full max-w-xl aspect-[4/3] bg-white border-2 border-dashed border-slate-300 rounded-3xl overflow-hidden hover:border-sky-400 transition-all shadow-sm">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-slate-800">Nhấn để tải tranh vẽ của bạn</p>
            <p className="text-slate-400 mt-2">Định dạng JPG, PNG hoặc WEBP</p>
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          onChange={handleFileChange}
        />
      </div>
      
      {previewUrl && (
        <p className="mt-4 text-slate-500 italic">"Hãy biến bức vẽ này thành sản phẩm 3D và hướng dẫn tôi làm từ vật liệu thực tế."</p>
      )}
    </div>
  );
};

export default UploadSection;
