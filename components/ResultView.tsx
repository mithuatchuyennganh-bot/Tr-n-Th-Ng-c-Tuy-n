
import React from 'react';
import { AppState } from '../types';

interface ResultViewProps {
  state: AppState;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ state, onReset }) => {
  const { result, generatedImageUrl, isAnalyzing, previewUrl } = state;

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-sky-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 animate-pulse">
              <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Đang tái tạo Concept 3D...</h2>
          <p className="text-slate-500 animate-pulse">Các chuyên gia AI đang phân tích đường nét của bạn</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="w-full space-y-12 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 space-y-4">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <img src={previewUrl!} alt="Sketch" className="w-full h-auto rounded-xl" />
          </div>
          <p className="text-sm font-medium text-slate-500 text-center uppercase tracking-wider">Phác thảo ban đầu</p>
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Phân tích Sản phẩm</h2>
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
             <p className="text-slate-700 leading-relaxed text-lg italic">"{result.sketchAnalysis}"</p>
          </div>
          <button 
            onClick={onReset}
            className="text-sky-600 font-semibold flex items-center gap-2 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Tạo thiết kế mới
          </button>
        </div>
      </div>

      {/* 3D Concept Visualization */}
      <section className="space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900 border-l-4 border-sky-500 pl-4">Concept 3D Sống Động</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative aspect-square bg-slate-200 rounded-3xl overflow-hidden shadow-xl ring-8 ring-white">
            {generatedImageUrl ? (
              <img src={generatedImageUrl} alt="3D Render" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-sky-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-sky-200 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-sky-400">Hình ảnh mô phỏng đang được lưu trữ, hãy xem mô tả chi tiết bên cạnh.</p>
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-xl">
              <p className="text-sm font-medium text-slate-800">{result.threeDConcept.vividDescription}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-sky-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                Chất liệu bề mặt
              </h3>
              <p className="text-slate-600">{result.threeDConcept.surfaceMaterial}</p>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Ánh sáng & Đổ khối
              </h3>
              <p className="text-slate-600">{result.threeDConcept.lightingAndShadow}</p>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-amber-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                Chi tiết chuyên nghiệp
              </h3>
              <p className="text-slate-600">{result.threeDConcept.professionalDetails}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIY Guide Section */}
      <section className="space-y-8 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-2">HƯỚNG DẪN CHẾ TÁC (DIY)</h2>
          <p className="text-slate-500 uppercase tracking-widest text-sm font-bold">Thực tế hóa bằng vật liệu tái chế</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Materials */}
          <div className="col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Nguyên vật liệu
            </h3>
            <ul className="space-y-3">
              {result.diyGuide.materials.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">{i + 1}</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-sky-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Các bước thực hiện
            </h3>
            <div className="space-y-6">
              {result.diyGuide.steps.map((step, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-sky-200 z-10">
                    {i + 1}
                  </div>
                  {i < result.diyGuide.steps.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-slate-200"></div>
                  )}
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 italic">Hãy bắt đầu hành trình biến ý tưởng thành sự thật ngay hôm nay!</p>
        </div>
      </section>
    </div>
  );
};

export default ResultView;
