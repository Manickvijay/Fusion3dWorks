import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function SupportPage() {
  const { addToast } = useShop();
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketNumber, setTicketNumber] = useState(null);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'printer-setup',
    message: ''
  });

  const faqs = [
    {
      q: 'How do I resolve first-layer bed adhesion issues?',
      a: 'Clean the textured PEI plate using warm water and dish soap (avoid wet wipes with moisturizing oils). Ensure the bed temperature is at 60°C for PLA or 70°C for PETG. Check auto-bed leveling mesh bed tilt.'
    },
    {
      q: 'What is the recommended drying temperature for damp filament?',
      a: 'PLA: 45°C–50°C for 4 hours. PETG: 60°C–65°C for 6 hours. Nylon (PA-CF): 75°C–80°C for 8–12 hours. Always store unused spools in vacuum-sealed bags with fresh silica.'
    },
    {
      q: 'How fast can I print with Fusion3D HyperSpeed PLA+?',
      a: 'HyperSpeed PLA+ is flow-bench tested up to 32 mm³/s volumetric flow. On CoreXY printers like the Apex Pro, you can reliably run perimeters at 350–500 mm/s with 0.4mm nozzles.'
    },
    {
      q: 'What is covered under the 2-Year Hardware Warranty?',
      a: 'The warranty covers mainboards, stepper motors, linear rails, heated beds, power supplies, and structural gantry brackets. Consumables like brass nozzles and silicone socks have a 90-day guarantee.'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const generatedId = `F3D-SUP-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNumber(generatedId);
    addToast('Support ticket dispatched! An additive manufacturing engineer will respond within 4 hours.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Help Center & Technical Support</span>
        </div>

        {/* Hero Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-slate-800 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
            Maker Assistance & Engineering Lab
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How Can We Assist Your Additive Project?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Troubleshoot layer adhesion, download calibrated slicer profiles, or connect directly with our hardware technicians.
          </p>
        </div>

        {/* 3 Contact Support Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Direct Engineering Email</h3>
            <p className="text-xs text-slate-500">support@fusion3dworks.com</p>
            <span className="text-[10px] text-emerald-600 font-bold block">Avg Response: 2 Hours</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 mx-auto flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Toll-Free Phone Support</h3>
            <p className="text-xs text-slate-500">+1 (800) 348-7466</p>
            <span className="text-[10px] text-slate-400 block">Mon - Fri: 8am - 8pm EST</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Community Maker Discord</h3>
            <p className="text-xs text-slate-500">discord.gg/fusion3d</p>
            <span className="text-[10px] text-indigo-600 font-bold block">15,000+ Active Builders</span>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Frequently Asked Maker Questions
          </h2>
          <div className="divide-y divide-slate-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full flex justify-between items-center text-left text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Submit a Technical Support Ticket
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Include your printer model or spool lot number for faster diagnosis.
          </p>

          {ticketNumber ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-emerald-900">Ticket Dispatched</h3>
              <p className="text-xs text-emerald-700">
                Ticket #{ticketNumber} generated. Check your email for ticket updates.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Inquiry Topic</label>
                <select
                  value={contactForm.topic}
                  onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 outline-hidden font-medium"
                >
                  <option value="printer-setup">3D Printer Assembly & Calibration</option>
                  <option value="filament-tuning">Filament Temperatures & Wet Spools</option>
                  <option value="custom-quote">Custom 3D Printing Service Quote</option>
                  <option value="warranty-parts">Warranty Replacement Part Request</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Describe the Issue or Question *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Include hotend temperature, slicer settings, or machine behavior..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
