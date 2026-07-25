import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client safely
const getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Stylist Endpoint - Fashion advice & outfit builder
app.post("/api/gemini/stylist", async (req, res) => {
  try {
    const { userPrompt, eventType, bodyShape, colorPreference } = req.body;
    const ai = getGeminiAI();

    if (!ai) {
      return res.status(503).json({
        error: "Dịch vụ AI chưa được cấu hình GEMINI_API_KEY.",
        fallbackAdvice: "Nên phối đầm lụa midi dáng xòe nhẹ kết hợp áo blazer khoác hờ cùng phụ kiện ánh kim cho dịp tiệc tùng sang trọng.",
      });
    }

    const prompt = `Bạn là Chuyên gia Stylist & Cố vấn Thời trang Nữ Cao Cấp của thương hiệu "AURA - Modern Elegance".
Khách hàng cần tư vấn outfit:
- Yêu cầu/Dịp: ${userPrompt || eventType || "Trang phục hàng ngày thanh lịch"}
- Dáng người: ${bodyShape || "Cân đối"}
- Màu sắc yêu thích: ${colorPreference || "Nhã nhặn, sang trọng (Beige, Cream, Pastel, Black, Rose)"}

Hãy đưa ra lời khuyên thời trang thực tế, tinh tế bằng tiếng Việt (ngắn gọn, khoảng 180-250 từ) gồm:
1. Gợi ý tổng thể Outfit (Áo/Đầm + Quần/Chân váy + Áo khoác + Phụ kiện).
2. Lợi ích tôn dáng & chất liệu gợi ý (Lụa Satin, Tweed, Linen Pháp, Organza).
3. Mẹo phối màu & chọn giày/túi phù hợp.
Xưng hô là "Stylist AURA" thân thiện, lịch sự và truyền cảm hứng.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ advice: response.text });
  } catch (err: any) {
    console.error("Error in AI Stylist route:", err);
    res.status(500).json({ error: "Không thể lấy gợi ý từ AI Stylist.", details: err.message });
  }
});

// AI Smart Cart Advisor Endpoint - Mix & Match & Upsell Suggestions
app.post("/api/gemini/smart-cart-recommend", async (req, res) => {
  try {
    const { cartItems } = req.body;
    const ai = getGeminiAI();

    if (!ai) {
      return res.json({
        cartAnalysis: "Bộ trang phục trong giỏ hàng có tông màu thanh lịch, rất dễ kết hợp phụ kiện lụa hoặc trang sức ngọc trai.",
        suggestedItems: ["Bông Tai Ngọc Trai AURA", "Khăn Lụa Tơ Tằm Rose Gold"],
      });
    }

    const itemsList = Array.isArray(cartItems)
      ? cartItems.map((i: any) => `${i.name} (Loại: ${i.category}, Màu: ${i.selectedColor}, Size: ${i.selectedSize})`).join(", ")
      : "Giỏ hàng hiện chưa có sản phẩm";

    const prompt = `Bạn là hệ thống Giỏ Hàng Thông Minh (Smart Fashion Cart Advisor) của AURA Women Fashion.
Danh sách sản phẩm hiện tại trong giỏ hàng:
[ ${itemsList} ]

Nhiệm vụ của bạn:
1. Đánh giá phong cách tổng thể của các món đồ trong giỏ (ví dụ: Công sở hiện đại, Dự tiệc tối sang trọng, Mùa hè lãng mạn...).
2. Phân tích thành phần phối đồ (Ví dụ: Khách đã chọn đầm nhưng chưa có áo khoác/phụ kiện đi kèm).
3. Đưa ra 1 nhận xét ngắn gọn (tối đa 3 câu) bằng tiếng Việt thật tinh tế khen ngợi gu thời trang và gợi ý món đồ kết hợp hoàn hảo tiếp theo.

Hãy trả về dưới dạng JSON hợp lệ đúng định dạng:
{
  "cartAnalysis": "phần phân tích phối đồ ngắn gọn",
  "styleTheme": "tên phong cách chính",
  "stylistTip": "1 mẹo diện đồ độc đáo cho combo này"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    console.error("Error in Smart Cart route:", err);
    res.status(500).json({ error: "Lỗi phân tích giỏ hàng thông minh." });
  }
});

// AI Size Advisor Endpoint
app.post("/api/gemini/size-advisor", async (req, res) => {
  try {
    const { height, weight, bust, waist, hip, fitPreference, productName, category } = req.body;
    const ai = getGeminiAI();

    if (!ai) {
      // Basic rule fallback
      let recommendedSize = "M";
      if (weight < 48) recommendedSize = "S";
      else if (weight > 58) recommendedSize = "L";

      return res.json({
        recommendedSize,
        confidence: "92%",
        advice: `Dựa trên chiều cao ${height}cm và cân nặng ${weight}kg, size ${recommendedSize} sẽ mang lại phom dáng ${fitPreference || "vừa vặn, thoải mái"}.`,
      });
    }

    const prompt = `Bạn là Chuyên gia Tư vấn Size & Phom dáng Thời trang Nữ AURA.
Thông số khách hàng:
- Chiều cao: ${height} cm
- Cân nặng: ${weight} kg
- Số đo 3 vòng: Vòng 1 (${bust || "chưa nhập"} cm), Vòng 2 (${waist || "chưa nhập"} cm), Vòng 3 (${hip || "chưa nhập"} cm)
- Sở thích mặc: ${fitPreference || "Thoải mái chuẩn phom"}
- Sản phẩm đang xem: ${productName || "Đầm/Áo thiết kế AURA"} (Danh mục: ${category || "Thời trang nữ"})

Bảng size tham khảo chuẩn AURA:
- XS: < 45kg | 1m50 - 1m58 | Ngực < 82, Eo < 64, Mông < 88
- S: 45-51kg | 1m53 - 1m62 | Ngực 82-86, Eo 64-68, Mông 88-92
- M: 52-57kg | 1m55 - 1m65 | Ngực 86-90, Eo 68-72, Mông 92-96
- L: 58-63kg | 1m58 - 1m70 | Ngực 90-95, Eo 72-77, Mông 96-101
- XL: > 63kg | > 1m60 | Ngực > 95, Eo > 77, Mông > 101

Hãy tính toán và trả về JSON:
{
  "recommendedSize": "S" | "M" | "L" | "XL" | "XS",
  "confidenceScore": "96%",
  "fitNotes": "lời giải thích ngắn gọn về phom dáng, độ co giãn chất liệu và lưu ý giặt giữ"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    console.error("Error in Size Advisor route:", err);
    res.status(500).json({ error: "Không thể phân tích size." });
  }
});

// Setup Vite development server or serve build static files in production
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

start();
