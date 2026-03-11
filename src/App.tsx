/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import UnrollingStudio from './components/UnrollingStudio';
import LayoutFormations from './components/LayoutFormations';
import StickyGridHero from './components/StickyGridHero';
import BookingSection from './components/BookingSection';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200">
      {/* Sticky Grid Hero Section (Replaces old Hero and Intro) */}
      <div id="about">
        <StickyGridHero />
      </div>

      {/* Layout Formations Section (replaces Depth Gallery) */}
      <section id="gallery">
        <LayoutFormations />
      </section>

      {/* Our Studio Section */}
      <section id="portfolio" className="relative">
        <UnrollingStudio />
      </section>

      {/* Booking Section */}
      <BookingSection />

      {/* Footer */}
      <footer id="contact" className="bg-stone-900 text-stone-400 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-white mb-8">Ready for your transformation?</h2>
          <button className="bg-white text-stone-900 px-8 py-4 rounded-full uppercase tracking-widest text-sm hover:bg-stone-200 transition-colors mb-16">
            Book an Appointment
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-stone-800 pt-8 text-sm tracking-widest uppercase">
            <div className="mb-4 md:mb-0">© 2026 enxhithemuaa</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Pinterest</a>
              <a href="#" className="hover:text-white transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
