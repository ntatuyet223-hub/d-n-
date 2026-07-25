import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceType } from '../types';
import { ShieldCheck, Plane, Car, Users, MapPin, Briefcase, Check, ArrowRight, Sparkles, Info, X, Phone } from 'lucide-react';
import { DRIVER_INFO } from '../data/mockData';

interface ServiceSectionProps {
  onSelectServiceToBook: (serviceType: ServiceType) => void;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [detailModalService, setDetailModalService] = useState<any | null>(null);

  const filteredServices = selectedFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.id === selectedFilter);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-600" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-amber-600" />;
      case 'Car':
        return <Car className="w-6 h-6 text-amber-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-amber-600" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-amber-600" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-amber-600" />;
      default:
        return <Car className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-wider uppercase inline-block mb-3">
            Dịch Vụ Chuyên Nghiệp 24/7
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            DANH MỤC DỊCH VỤ CỦA TÀI XẾ ĐINH VĂN HIẾN
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Đáp ứng đa dạng mọi nhu cầu di chuyển của quý khách với tiêu chuẩn an toàn, lịch sự, đúng giờ 100% và bảo mật thông tin.
          </p>
        </div>

        {/* Interactive Filter Badges */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Tất Cả Dịch Vụ
          </button>
          {SERVICES_DATA.map((srv) => (
            <button
              key={srv.id}
              onClick={() => setSelectedFilter(srv.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === srv.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {srv.title.split(' ')[0]} {srv.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-amber-500 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  {/* Top Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-amber-900 border border-amber-300 text-xs font-bold shadow-md backdrop-blur-md">
                    {service.badge}
                  </span>

                  {/* Floating Icon */}
                  <div className="absolute bottom-3 right-4 w-12 h-12 rounded-2xl bg-white border border-amber-400 flex items-center justify-center shadow-md">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-amber-800 font-bold mt-1 mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5 font-normal">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 mb-6">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Price & Action Buttons */}
              <div className="p-6 pt-0 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-slate-400 block">Giá niêm yết từ</span>
                  <span className="text-base font-black text-amber-600 font-mono">{service.basePriceText}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setDetailModalService(service)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer text-xs font-bold"
                    title="Xem chi tiết dịch vụ"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectServiceToBook(service.id)}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center space-x-1 transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
                  >
                    <span>Đặt Xe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Service Detail Popup Modal */}
      {detailModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setDetailModalService(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-44 rounded-2xl overflow-hidden mb-6">
              <img
                src={detailModalService.image}
                alt={detailModalService.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full shadow">
                {detailModalService.badge}
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-1">{detailModalService.title}</h3>
            <p className="text-xs text-amber-700 font-bold mb-4">{detailModalService.tagline}</p>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              {detailModalService.description}
            </p>

            <h4 className="text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-3">
              Cam kết dịch vụ & Quyền lợi khách hàng:
            </h4>
            <div className="space-y-2.5 text-xs text-slate-700 font-medium mb-8">
              {detailModalService.features.map((f: string, i: number) => (
                <div key={i} className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 gap-3">
              <a
                href={`tel:${DRIVER_INFO.phone}`}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-center text-xs flex items-center justify-center space-x-1.5 border border-slate-300"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Gọi Điện Tư Vấn</span>
              </a>

              <button
                onClick={() => {
                  const srvId = detailModalService.id;
                  setDetailModalService(null);
                  onSelectServiceToBook(srvId);
                }}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-center text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-amber-500/20"
              >
                <span>Đặt Xe Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
