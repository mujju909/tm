import React from 'react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { Phone, MessageCircle, HeartHandshake } from 'lucide-react';
import { FloralDivider } from './IslamicOrnaments';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-14 md:py-24 px-4 bg-[#FAF7F2]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8E2B43]/10 text-[#6B1D2F] rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C5A059]" />
            Warm Hospitality
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#6B1D2F]">
            For Any Queries, Please Contact Us
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B6B] mt-2 max-w-md mx-auto">
            Please feel free to connect with our family representatives for venue directions, timings, or RSVP inquiries.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {WEDDING_CONFIG.contacts.map((contact) => {
            const cleanDigits = `${contact.countryCode}${contact.rawPhone.replace(/\D/g, '')}`;
            const telHref = `tel:+${cleanDigits}`;
            const whatsappMsg = encodeURIComponent(
              `Assalamu Alaikum! Heartiest congratulations on the wedding of Taufique & Madiha. I would like to inquire about the ceremony.`
            );
            const waHref = `https://wa.me/${cleanDigits}?text=${whatsappMsg}`;

            return (
              <div
                key={contact.id}
                className="bg-[#FFFDF9] border border-[#E8D3A2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8D3A2] flex items-center justify-center text-[#8E2B43] mb-3">
                  <Phone className="w-5 h-5" />
                </div>

                <h3 className="font-cinzel text-lg font-bold text-[#6B1D2F]">
                  {contact.name}
                </h3>
                <p className="text-xs text-[#7A6B6B] mb-2">{contact.role}</p>

                <div className="text-base font-bold text-[#2D2424] tracking-wide my-3 font-mono">
                  {contact.formattedPhone}
                </div>

                {/* Call and WhatsApp Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#E8D3A2]/40">
                  <a
                    href={telHref}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#6B1D2F] hover:bg-[#5A1222] transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Card Calligraphy & Verse (From original invitation card) */}
        <div className="mt-14 text-center p-6 sm:p-8 bg-[#FFFDF9] border border-[#E8D3A2]/70 rounded-2xl shadow-sm">
          <FloralDivider className="mb-4" />
          <p className="font-arabic text-2xl sm:text-3xl text-[#6B1D2F] font-bold">
            {WEDDING_CONFIG.quranicVerses.verse2.arabic}
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8E2B43] font-semibold mt-2">
            "{WEDDING_CONFIG.quranicVerses.verse2.translation}"
          </p>
          <p className="text-[11px] text-[#A68846] mt-0.5 font-medium">
            — {WEDDING_CONFIG.quranicVerses.verse2.reference} —
          </p>
        </div>
      </div>
    </section>
  );
};
