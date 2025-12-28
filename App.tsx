
import React, { useState, useCallback } from 'react';
import { AppState, AnalysisResult } from './types';
import { analyzeSketch, generate3DRender } from './services/geminiService';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultView from './components/ResultView';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    imageFile: null,
    previewUrl: null,
    isAnalyzing: false,
    result: null,
    generatedImageUrl: null,
    error: null,
  });

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setState(prev => ({
        ...prev,
        imageFile: file,
        previewUrl: reader.result as string,
        result: null,
        generatedImageUrl: null,
        error: null
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleTransform = async () => {
    if (!state.previewUrl) return;

    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));

    try {
      const base64Data = state.previewUrl.split(',')[1];
      
      // Step 1: Analyze with Gemini
      const analysis = await analyzeSketch(base64Data);
      
      // Step 2: Try to generate a 3D visual render
      let imageUrl = null;
      try {
        imageUrl = await generate3DRender(analysis.visualPrompt);
      } catch (imgError) {
        console.warn("Image generation failed, falling back to description only.", imgError);
      }

      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        result: analysis,
        generatedImageUrl: imageUrl,
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: err.message || "Đã xảy ra lỗi trong quá trình xử lý."
      }));
    }
  };

  const reset = () => {
    setState({
      imageFile: null,
      previewUrl: null,
      isAnalyzing: false,
      result: null,
      generatedImageUrl: null,
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <Header />
      
      <main className="w-full max-w-5xl px-4 py-8 flex flex-col items-center space-y-12">
        {!state.result && !state.isAnalyzing ? (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <UploadSection 
              onFileSelect={handleFileSelect} 
              previewUrl={state.previewUrl} 
            />
            
            {state.previewUrl && (
              <button
                onClick={handleTransform}
                disabled={state.isAnalyzing}
                className="mt-8 bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-12 rounded-full shadow-lg shadow-sky-200 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>✨ Biến hình 3D ngay</span>
              </button>
            )}
          </div>
        ) : (
          <ResultView 
            state={state} 
            onReset={reset} 
          />
        )}

        {state.error && (
          <div className="p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg w-full max-w-md text-center">
            {state.error}
          </div>
        )}
      </main>

      <footer className="mt-auto py-8 text-slate-400 text-sm">
        © 2024 Tuyen3D - Công cụ sáng tạo cho Nghệ nhân tương lai
      </footer>
    </div>
  );
};

export default App;
