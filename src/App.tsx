import React, { useState } from 'react';
import { IntroAnimation } from './components/IntroAnimation';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServiceSection } from './components/ServiceSection';
import { FareCalculator } from './components/FareCalculator';
import { JourneysSection } from './components/JourneysSection';
import { FeedbackSection } from './components/FeedbackSection';
import { BookingModal } from './components/BookingModal';
import { ChatBotWidget } from './components/ChatBotWidget';
import { Footer } from './components/Footer';
import { ServiceType } from './types';

export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingService, setBookingService] = useState<ServiceType | string>('lai_xe_ho');
  const [prefilledFare, setPrefilledFare] = useState<any | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleOpenBooking = (
    serviceType?: string,
    prefilledData?: { pickupLocation?: string; dropoffLocation?: string }
  ) => {
    if (serviceType) {
      setBookingService(serviceType as ServiceType);
    }
    if (prefilledData) {
      setPrefilledFare({
        serviceType,
        pickupLocation: prefilledData.pickupLocation,
        dropoffLocation: prefilledData.dropoffLocation,
      });
    }
    setIsBookingOpen(true);
  };

  const handleBookWithFare = (fareData: any) => {
    setPrefilledFare(fareData);
    if (fareData.serviceType) {
      setBookingService(fareData.serviceType);
    }
    setIsBookingOpen(true);
  };

  const handleSelectRouteToBook = (fromTo: string, price: string) => {
    setPrefilledFare({
      pickupLocation: fromTo.split('⇆')[0]?.trim() || 'Hà Nội',
      dropoffLocation: fromTo.split('⇆')[1]?.trim() || '',
      serviceType: 'dua_don_san_bay'
    });
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Opening Intro Animation (The car driving away into the distance sequence) */}
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. Sticky Navigation Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenChat={() => setIsChatOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* 3. Hero Section with Quick Ride Booking Form */}
      <main>
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onOpenFareCalc={() => {
            const el = document.getElementById('fare-calculator');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Services Showcase (Giới Thiệu Dịch Vụ) */}
        <ServiceSection
          onSelectServiceToBook={(srv) => {
            setBookingService(srv);
            setIsBookingOpen(true);
          }}
        />

        {/* 5. Interactive Fare Calculator (Bảng Giá & Ước Tính Cước) */}
        <FareCalculator onBookWithFare={handleBookWithFare} />

        {/* 6. Journeys, Stats & Driver Bio (Chặng Đường & Kinh Nghiệm) */}
        <JourneysSection onSelectRoute={handleSelectRouteToBook} />

        {/* 7. Customer Reviews & Feedback */}
        <FeedbackSection />
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* 9. Booking Popup Modal & Ticket Confirmation */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setPrefilledFare(null);
        }}
        preselectedService={bookingService}
        prefilledFareData={prefilledFare}
      />

      {/* 10. AI CSKH 24/7 Live Chat Floating Widget & Hotline Speed Dial */}
      <ChatBotWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

    </div>
  );
}

export default App;
