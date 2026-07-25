import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Memory store for ride bookings
const bookingsStore: any[] = [];

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
  res.json({ status: "ok", service: "Đinh Văn Hiến Driving Service", timestamp: new Date().toISOString() });
});

// AI CSKH & Consultation Chat Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    const ai = getGeminiAI();

    const fallbackResponse = "Dịch vụ Lái xe Đinh Văn Hiến xin kính chào Quý khách! Anh Hiến chuyên phục vụ: Lái xe hộ người say/mệt mỏi, Đưa đón sân bay Nội Bài/TSN (chỉ từ 250k), Cho thuê xe 4-7 chỗ và Xe đi tỉnh. Hotline/Zalo trực tiếp: 0988.123.456. Quý khách muốn đặt lịch chuyến nào ạ?";

    if (!ai) {
      return res.json({ reply: fallbackResponse });
    }

    const systemContext = `Bạn là Trợ Lý AI Chăm Sóc Khách Hàng 24/7 của "Dịch Vụ Lái Xe & Xe Đưa Đón - Đinh Văn Hiến".
Thông tin chính về dịch vụ:
- Chủ xe/Tài xế chính: Đinh Văn Hiến (10+ năm kinh nghiệm lái xe an toàn, điềm đạm, không hút thuốc, thuộc đường xá miền Bắc và cả nước).
- Hotline / Zalo: 0988.123.456.
- Dịch vụ chính:
  1. Lái Xe Hộ (lái chính xe của khách khi say/mệt): Nội thành từ 150k - 250k/lượt, đêm từ 22h hỗ trợ nhiệt tình.
  2. Đưa Đón Sân Bay Nội Bài: Hà Nội ↔ Nội Bài trọn gói từ 230k - 300k (xe 4-7 chỗ đời mới).
  3. Xe Đi Tỉnh & Hợp Đồng: 9.000đ - 11.000đ/km (giảm 50% lượt về nếu đi 2 chiều trong ngày).
  4. Thuê xe 4 chỗ, 7 chỗ có tài xế riêng theo ngày/theo giờ.
- Cam kết: Đúng giờ 100%, xe sạch sẽ không mùi, tài xế văn minh, trả đồ tận tay nếu khách bỏ quên.

Nhiệm vụ của bạn:
- Trả lời thân thiện, lịch sự, chu đáo, báo giá tham khảo nhanh chóng.
- Luôn khuyến khích khách đặt lịch qua biểu mẫu hoặc gọi trực tiếp Hotline 0988.123.456 để anh Hiến xếp lịch nhanh nhất.
- Trả lời bằng tiếng Việt, ngắn gọn (dưới 120 từ), định dạng rõ ràng.`;

    const prompt = `${systemContext}\n\nKhách hỏi: "${message || "Cho tôi biết thêm thông tin về giá cước"}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ reply: response.text || fallbackResponse });
  } catch (err: any) {
    console.error("Error in AI Chat route:", err);
    res.json({
      reply: "Chào bạn, hệ thống AI đang hỗ trợ tốt nhất qua Hotline/Zalo: 0988.123.456. Anh Hiến sẵn sàng nghe máy và xếp xe cho bạn ngay lập tức!",
    });
  }
});

// AI Fare Estimator Endpoint
app.post("/api/gemini/fare-estimate", async (req, res) => {
  try {
    const { pickup, dropoff, serviceType, distanceKm, isRoundTrip, isNightTime } = req.body;

    let baseRatePerKm = 10000;
    let baseMinFare = 150000;

    if (serviceType === 'lai_xe_ho') {
      baseMinFare = 180000;
      baseRatePerKm = 12000;
    } else if (serviceType === 'dua_don_san_bay') {
      baseMinFare = 250000;
      baseRatePerKm = 8500;
    } else if (serviceType === 'thue_xe_7cho') {
      baseMinFare = 250000;
      baseRatePerKm = 12000;
    } else if (serviceType === 'xe_di_tinh') {
      baseMinFare = 300000;
      baseRatePerKm = 9500;
    }

    const distance = Math.max(1, Number(distanceKm) || 15);
    let total = Math.max(baseMinFare, Math.round(distance * baseRatePerKm));

    if (isRoundTrip) {
      total = Math.round(total * 1.5); // 50% discount on return
    }

    if (isNightTime) {
      total += 40000; // Night surcharge
    }

    const roundedPrice = Math.ceil(total / 10000) * 10000;

    res.json({
      success: true,
      serviceType,
      pickup,
      dropoff,
      distanceKm: distance,
      estimatedPrice: roundedPrice,
      formattedPrice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(roundedPrice),
      note: isRoundTrip ? 'Đã áp dụng giảm 50% lượt về trong ngày.' : 'Chưa bao gồm vé cầu đường (nếu có).'
    });
  } catch (err: any) {
    res.status(500).json({ error: "Lỗi tính cước." });
  }
});

// Handle Ride Booking
app.post("/api/booking", (req, res) => {
  try {
    const booking = {
      id: `DVH-${Math.floor(1000 + Math.random() * 9000)}`,
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    bookingsStore.push(booking);

    res.json({
      success: true,
      booking,
      message: "Đặt chuyến thành công! Tài xế Đinh Văn Hiến sẽ gọi điện xác nhận trong 3-5 phút.",
    });
  } catch (err: any) {
    res.status(500).json({ error: "Không thể gửi yêu cầu đặt xe." });
  }
});

// Get recent bookings (for admin or demo)
app.get("/api/bookings", (req, res) => {
  res.json({ bookings: bookingsStore });
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
