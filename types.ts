
export interface ThreeDConcept {
  surfaceMaterial: string;
  lightingAndShadow: string;
  professionalDetails: string;
  vividDescription: string;
}

export interface DIYGuide {
  materials: string[];
  steps: {
    title: string;
    description: string;
  }[];
}

export interface AnalysisResult {
  sketchAnalysis: string;
  threeDConcept: ThreeDConcept;
  diyGuide: DIYGuide;
  visualPrompt: string;
}

export interface AppState {
  imageFile: File | null;
  previewUrl: string | null;
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  generatedImageUrl: string | null;
  error: string | null;
}
