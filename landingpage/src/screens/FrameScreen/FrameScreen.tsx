import { useState, useEffect } from "react";
import { Div } from "./sections/Div";
import { DivWrapper } from "./sections/DivWrapper";
import { Footer } from "./sections/Footer";
import { Frame } from "./sections/Frame";
import { Frame1 } from "./sections/Frame1";
import { Frame2 } from "./sections/Frame2";
import { Frame3 } from "./sections/Frame3";
import { Frame4 } from "./sections/Frame4";
import { FrameWrapper } from "./sections/FrameWrapper";
import { Group } from "./sections/Group";
import { SectionComponentNode } from "./sections/SectionComponentNode";

export const FrameScreen = (): JSX.Element => {
  const [showChat, setShowChat] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="bg-white overflow-hidden w-full relative"
      data-model-id="570:9788"
    >
      <Frame />
      <FrameWrapper />
      <DivWrapper />
      <Div />
      <SectionComponentNode />
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
      
      {/* Floating Chat Widget */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-[100px] md:h-[100px] z-50 transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-400"
        aria-label="Open chat"
      >
        <img
          alt="Chat widget"
          src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/lets-icons-chat-fill.svg"
          className="w-full h-full drop-shadow-lg"
        />
      </button>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed bottom-24 right-4 md:bottom-32 md:right-8 w-[calc(100vw-2rem)] max-w-[350px] bg-white rounded-2xl shadow-2xl z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="text-white font-semibold text-lg">Live Chat Support</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 h-[300px] overflow-y-auto">
            <div className="bg-gray-100 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700">Hello! How can we help you today?</p>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 md:bottom-32 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-orange-400 animate-fade-in"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <Footer />
      <Group />
    </div>
  );
};
