
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeSketch = async (base64Image: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    Bạn là một chuyên gia thiết kế sản phẩm 3D và nghệ nhân tái chế sáng tạo. 
    Nhiệm vụ của bạn là phân tích hình ảnh phác thảo 2D này và chuyển đổi nó thành một concept sản phẩm 3D chuyên nghiệp, sau đó cung cấp hướng dẫn làm đồ tái chế (DIY).

    Hãy thực hiện các bước sau:
    1. Phân tích đường nét, hình khối và ý tưởng cốt lõi của bức vẽ.
    2. Mô tả concept 3D: Chất liệu bề mặt (nhám, bóng, gỗ, kim loại), ánh sáng & đổ bóng để tạo khối, và các chi tiết nâng cấp (nút bấm, khớp nối).
    3. Hướng dẫn DIY: Danh sách vật liệu tái chế thực tế và các bước thực hiện.
    4. Tạo một "visualPrompt" ngắn gọn bằng tiếng Anh để dùng cho model sinh ảnh, mô tả sản phẩm 3D này ở chất lượng cao nhất (cinematic render, 4k, realistic materials).

    Phản hồi bằng tiếng Việt (trừ visualPrompt).
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: prompt }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sketchAnalysis: { type: Type.STRING },
          threeDConcept: {
            type: Type.OBJECT,
            properties: {
              surfaceMaterial: { type: Type.STRING },
              lightingAndShadow: { type: Type.STRING },
              professionalDetails: { type: Type.STRING },
              vividDescription: { type: Type.STRING }
            },
            required: ["surfaceMaterial", "lightingAndShadow", "professionalDetails", "vividDescription"]
          },
          diyGuide: {
            type: Type.OBJECT,
            properties: {
              materials: { type: Type.ARRAY, items: { type: Type.STRING } },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["title", "description"]
                }
              }
            },
            required: ["materials", "steps"]
          },
          visualPrompt: { type: Type.STRING }
        },
        required: ["sketchAnalysis", "threeDConcept", "diyGuide", "visualPrompt"]
      }
    }
  });

  const resultText = response.text;
  if (!resultText) throw new Error("Không nhận được phản hồi từ AI");
  return JSON.parse(resultText) as AnalysisResult;
};

export const generate3DRender = async (visualPrompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A high-quality 3D product render based on this description: ${visualPrompt}. 3D model style, professional lighting, isolated on a clean minimal studio background, 4k resolution, hyper-realistic textures.` }
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("Không thể tạo hình ảnh 3D");
};
