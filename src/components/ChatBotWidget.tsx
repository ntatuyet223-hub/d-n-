import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Phone, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { DRIVER_INFO, MOCK_CHAT_FAQS } from '../data/mockData';

interface ChatBotWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenBooking: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const ChatBotWidget: React.FC<ChatBotWidgetProps> = ({
  isOpen,
  onToggle,
  onOpenBooking,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Xin chào quý khách! Tôi là Trợ lý AI CSKH của tài xế Đinh Văn Hiến (0988.888.888). Quý khách cần hỏi giá cước, đặt lịch lái xe hộ hay đưa đón sân bay?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      setIsTyping(false);

      const botReply = data.reply || getLocalFallbackReply(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setIsTyping(false);
      const fallbackText = getLocalFallbackReply(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallbackText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }
  };

  const getLocalFallbackReply = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('sân bay') || q.includes('nội bài')) {
      return 'Dịch vụ đưa đón sân bay Nội Bài trọn gói từ 230.000đ. Đưa đón đúng giờ 100%, có hỗ trợ bê mang hành lý tận nơi. Quý khách có thể bấm nút "Đặt Xe Ngay" để lên lịch!';
    }
    if (q.includes('lái xe hộ') || q.includes('say') || q.includes('uống rượu')) {
      return 'Dịch vụ lái xe hộ người say của tài xế Đinh Văn Hiến phục vụ 24/7. Anh Hiến sẽ đi xe máy đến điểm hẹn, cất xe gọn gàng và lái ô tô đưa bạn về nhà an toàn 100%.';
    }
    if (q.includes('tỉnh') || q.includes('đường dài')) {
      return 'Chuyến xe đi tỉnh khứ hồi giảm ngay 40% chiều về! Các tuyến đi Ninh Bình, Hải Phòng, Quảng Ninh, Phú Thọ luôn sẵn sàng 24/7.';
    }
    if (q.includes('giá') || q.includes('bao nhiêu')) {
      return 'Bảng giá cước minh bạch từ 10.000đ/km. Bạn có thể sử dụng công cụ "Bảng Giá & Tính Cước" trên giao diện để tự ước tính cước tức thì!';
    }
    return `Cảm ơn quý khách! Mọi yêu cầu chi tiết quý khách có thể liên hệ trực tiếp tài xế Đinh Văn Hiến qua Hotline/Zalo ${DRIVER_INFO.formattedPhone} hoặc bấm "Đặt Xe Ngay" bên dưới!`;
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold shadow-xl shadow-amber-500/30 flex items-center space-x-2 transition-all cursor-pointer transform hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 fill-slate-950" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </div>
          <span className="hidden sm:inline text-xs font-black uppercase tracking-wide">Tư Vấn AI 24/7</span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md h-[520px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn text-slate-900">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold flex items-center gap-1.5">
                  CSKH AI Đinh Văn Hiến
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <span className="text-[10px] text-amber-400 font-bold">Sẵn sàng phản hồi 24/7</span>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ Prompts Chips */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex space-x-2 overflow-x-auto text-xs font-bold text-slate-700">
            {MOCK_CHAT_FAQS.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(faq)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 hover:text-amber-900 border border-slate-200 whitespace-nowrap transition-colors cursor-pointer text-[11px]"
              >
                {faq}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-100/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed font-medium shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl text-xs text-slate-500 font-medium flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  <span>Trợ lý AI đang soạn câu trả lời...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Bottom Action Footer */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Nhập câu hỏi của bạn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                onToggle();
                onOpenBooking();
              }}
              className="w-full py-2 bg-slate-900 text-amber-400 font-extrabold text-xs rounded-xl flex items-center justify-center space-x-1 hover:bg-slate-800"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>ĐẶT XE TRỰC TUYẾN NGAY</span>
            </button>
          </div>

        </div>
      )}
    </>
  );
};
