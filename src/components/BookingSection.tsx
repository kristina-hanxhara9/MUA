import { useState } from 'react';
import { Calendar, Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const services = ['Bridal Makeup', 'Event Makeup', 'Editorial / Photoshoot', 'Makeup Lesson'];
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', 
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', 
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', 
    '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formatted = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    // Add timezone offset fix to display correct date
    const displayDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    setSelectedDate(displayDate);
    setSelectedTime('');
    setIsCalendarOpen(false);
  };

  return (
    <section id="booking" className="relative py-32 px-6 bg-stone-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.pexels.com/photos/32427370/pexels-photo-32427370.jpeg" className="w-full h-full object-cover opacity-20" alt="Background" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-white drop-shadow-2xl">Book an Appointment</h2>
          <p className="text-stone-300 tracking-widest uppercase text-sm font-medium drop-shadow-md">Secure your date for a flawless look</p>
        </div>
        
        <form className="bg-stone-950/70 backdrop-blur-md p-6 md:p-12 rounded-[2rem] shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2 ml-1">Full Name</label>
              <input type="text" className="w-full bg-stone-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-stone-900/80 transition-all placeholder-stone-600 text-white" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2 ml-1">Email Address</label>
              <input type="email" className="w-full bg-stone-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-stone-900/80 transition-all placeholder-stone-600 text-white" placeholder="jane@example.com" />
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-semibold mb-4 ml-1">
              <Sparkles className="w-4 h-4" /> Service
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(service => (
                <label key={service} className="relative flex items-center p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all bg-stone-900/30 group">
                  <input 
                    type="radio" 
                    name="service" 
                    value={service}
                    checked={selectedService === service}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="peer sr-only" 
                  />
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-white transition-all"></div>
                  <span className="text-sm text-stone-300 font-medium peer-checked:text-white">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2 ml-1">
                <Calendar className="w-4 h-4" /> Date
              </label>
              <div className="relative">
                <div 
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="w-full bg-stone-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-stone-900/80 transition-all text-white font-medium cursor-pointer min-h-[50px] flex items-center justify-between"
                >
                  <span className={selectedDate ? "text-white" : "text-stone-500"}>
                    {selectedDate ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}
                  </span>
                  <Calendar className="w-4 h-4 text-stone-400" />
                </div>

                <AnimatePresence>
                  {isCalendarOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-full bg-stone-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 z-50"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-stone-800 rounded-full transition-colors">
                          <ChevronLeft className="w-5 h-5 text-stone-400" />
                        </button>
                        <span className="font-serif text-white font-medium">
                          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-stone-800 rounded-full transition-colors">
                          <ChevronRight className="w-5 h-5 text-stone-400" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <div key={day} className="text-center text-xs font-semibold text-stone-500 py-1">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                          <div key={`empty-${i}`} className="p-2" />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                          const isSelected = selectedDate === dateStr;
                          const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();
                          
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => handleDateSelect(day)}
                              className={`p-2 text-sm rounded-lg flex items-center justify-center transition-all ${
                                isSelected 
                                  ? 'bg-white text-stone-900 font-medium shadow-md' 
                                  : isToday
                                    ? 'bg-stone-800 text-white font-medium hover:bg-stone-700'
                                    : 'text-stone-300 hover:bg-white/10 hover:shadow-sm'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2 ml-1">
                <Clock className="w-4 h-4" /> Time Slot
              </label>
              
              <AnimatePresence mode="wait">
                {!selectedDate ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-full min-h-[50px] flex items-center justify-center bg-stone-900/30 border border-white/10 rounded-xl border-dashed"
                  >
                    <span className="text-sm text-stone-500 font-medium">Please select a date first</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="slots"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2 max-h-48 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-stone-600"
                  >
                    {timeSlots.map(time => (
                      <label key={time} className="text-center relative">
                        <input 
                          type="radio" 
                          name="time" 
                          value={time}
                          checked={selectedTime === time}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="peer sr-only" 
                        />
                        <div className="py-2 px-1 border border-white/10 rounded-lg text-xs cursor-pointer peer-checked:bg-white peer-checked:text-stone-900 peer-checked:border-white hover:bg-white/10 transition-all bg-stone-900/50 text-stone-300 font-medium">
                          {time}
                        </div>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mb-12">
            <label className="block text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2 ml-1">Message</label>
            <textarea className="w-full bg-stone-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-stone-900/80 transition-all placeholder-stone-600 text-white resize-none h-24" placeholder="Tell us about your event..."></textarea>
          </div>
          <a href="https://mua.butterfly-ai.co.uk" target="_blank" rel="noopener noreferrer" className="block w-full bg-white text-stone-900 py-5 rounded-xl uppercase tracking-widest text-sm font-bold hover:bg-stone-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center">
            Request Booking
          </a>
        </form>
      </div>
    </section>
  );
}
