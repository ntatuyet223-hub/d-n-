import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Sparkles, ShieldCheck, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { DRIVER_INFO } from '../data/mockData';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'driving' | 'opening' | 'finished'>('driving');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Auto stage shift
    const timer1 = setTimeout(() => {
      setStage('opening');
    }, 2800);

    const timer2 = setTimeout(() => {
      setStage('finished');
      onComplete();
    }, 3800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('finished');
    onComplete();
  };

  return (
    <AnimatePresence>
      {stage !== 'finished' && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-zinc-950 text-white overflow-hidden select-none"
        >
          {/* Background Highway Effect */}
          <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
            {/* Perspective road grid */}
            <div 
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />
            {/* Speed lines */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: (i - 6) * 120, opacity: 0 }}
                animate={{ 
                  y: [0, 800], 
                  opacity: [0, 0.8, 0] 
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2 + (i % 3) * 0.3,
                  delay: (i * 0.15) % 1,
                  ease: 'linear'
                }}
                className="absolute top-0 w-0.5 h-32 bg-amber-400/40 rounded-full"
              />
            ))}
          </div>

          {/* Top Bar Header */}
          <div className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-lg shadow-lg shadow-amber-500/10">
                DVH
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-medium block">Dịch Vụ Lái Xe Chuyên Nghiệp</span>
                <span className="text-sm font-semibold text-zinc-200">{DRIVER_INFO.name}</span>
              </div>
            </div>

            <button
              onClick={handleSkip}
              className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-amber-500 hover:text-slate-950 border border-white/20 hover:border-amber-400 text-xs font-semibold tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
            >
              <span>VÀO TRANG WEB</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Center Stage Animation: Car Driving Away into the Distance */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4 max-w-3xl">
            {/* Title Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-medium mb-6 backdrop-blur-md"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Chuyến đi an toàn • Lái xe tận tâm • Phục vụ 24/7</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight"
            >
              CHÚC QUÝ KHÁCH MỘT HÀNH TRÌNH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                THƯỢNG LỘ BÌNH AN
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm md:text-base text-zinc-300 max-w-xl font-light mb-10"
            >
              Đồng hành cùng tài xế <strong className="text-amber-400 font-semibold">{DRIVER_INFO.name}</strong> – Đưa đón tận nơi, lái xe hộ chu đáo, chuẩn giờ 100%.
            </motion.p>

            {/* Animation Canvas Container: Car Moving into Distance */}
            <div className="relative w-full h-48 md:h-64 flex items-center justify-center my-4">
              {/* Perspective Road Track */}
              <div className="absolute inset-x-8 md:inset-x-24 bottom-0 h-36 bg-gradient-to-t from-zinc-800 to-zinc-950 rounded-t-3xl border-t border-amber-500/20 overflow-hidden">
                {/* Lane Divider Lines animating downward */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 flex flex-col justify-between py-2">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, 40] }}
                      transition={{ repeat: Infinity, duration: 0.4, ease: 'linear' }}
                      className="w-1 h-6 bg-amber-400/80 rounded"
                    />
                  ))}
                </div>
              </div>

              {/* The Car Graphic driving away / perspective zoom */}
              <motion.div
                initial={{ scale: 1.4, y: 30, opacity: 1 }}
                animate={
                  stage === 'opening'
                    ? { scale: 0.25, y: -60, opacity: 0 }
                    : { 
                        scale: [1.3, 1.1, 0.9, 0.7], 
                        y: [20, 0, -20, -40],
                        filter: ['drop-shadow(0 20px 20px rgba(245,158,11,0.3))', 'drop-shadow(0 10px 10px rgba(245,158,11,0.2))'] 
                      }
                }
                transition={{ duration: 3.2, ease: 'easeInOut' }}
                className="relative z-20 flex flex-col items-center"
              >
                {/* Taillights Glow */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute -left-12 -top-2 w-8 h-8 bg-red-500/60 rounded-full blur-md animate-pulse" />
                  <div className="absolute -right-12 -top-2 w-8 h-8 bg-red-500/60 rounded-full blur-md animate-pulse" />
                  
                  {/* Car Visual Icon */}
                  <div className="p-4 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-amber-400/50 shadow-2xl text-amber-400">
                    <Car className="w-16 h-16 md:w-20 md:h-20" />
                  </div>
                </div>

                {/* License Plate Graphic */}
                <div className="mt-2 px-3 py-0.5 bg-white border border-zinc-400 text-slate-900 rounded font-mono font-bold text-xs tracking-wider shadow">
                  30H - 888.88
                </div>

                {/* Tire Smoke / Dust particles */}
                <div className="flex justify-between w-32 -mt-1 opacity-50">
                  <motion.div 
                    animate={{ scale: [1, 2], opacity: [0.8, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.5 }} 
                    className="w-4 h-4 bg-amber-300/30 rounded-full blur-xs"
                  />
                  <motion.div 
                    animate={{ scale: [1, 2], opacity: [0.8, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} 
                    className="w-4 h-4 bg-amber-300/30 rounded-full blur-xs"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Progress Indicator */}
          <div className="w-full max-w-md mx-auto px-6 mb-8 z-10 flex flex-col items-center">
            <div className="flex items-center justify-between w-full text-xs text-zinc-400 mb-2">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Đang sẵn sàng đón quý khách...</span>
              </span>
              <span className="font-mono text-amber-400 font-semibold">{progress}%</span>
            </div>

            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
