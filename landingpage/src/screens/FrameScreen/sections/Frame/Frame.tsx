import { useState } from "react";

export const Frame = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("services");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    
    const sectionMap: { [key: string]: number } = {
      services: 1621,
      saas: 3110,
      websites: 4177,
      marketing: 4995,
      tools: 5693,
      contact: 8051
    };

    const targetPosition = sectionMap[sectionId] || 0;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-auto min-h-[600px] md:min-h-[800px] lg:min-h-[950px] rounded-[0px_0px_60px_60px] md:rounded-[0px_0px_100px_100px] lg:rounded-[0px_0px_120px_120px] overflow-hidden">
      {/* Background Image - responsive */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover bg-blend-lighten"
        alt="Nature"
        src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/nature-17.png"
      />

      {/* Left Side Image - hidden on mobile, visible on larger screens */}
      <img
        className="hidden md:block absolute top-0 left-0 w-1/2 h-full object-cover"
        alt="Group"
        src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/group-890.png"
      />

      {/* Vertical blur strips - only visible on large screens */}
      <div className="hidden lg:block absolute top-0 left-1/2 w-[4%] h-full backdrop-blur-[107.35px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(107.35px)_brightness(100%)] bg-blend-overlay bg-[linear-gradient(270deg,rgba(255,255,255,0.01)_0%,rgba(0,0,0,0.2)_76%,rgba(255,255,255,0.01)_100%)]" />

      {/* Overlay gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(0,140,255,0.72)_100%)]" />

      <div className="flex flex-col w-full max-w-[1152px] px-4 md:px-8 items-center justify-center gap-6 md:gap-[33px] absolute top-[120px] md:top-[195px] left-1/2 -translate-x-1/2 animate-fade-up" style={{ "--animation-delay": "0.2s" } as React.CSSProperties}>
        <div className="flex flex-col items-start gap-4 md:gap-[29px] relative w-full">
          <p className="relative w-full mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-[#ff9c1b] text-sm md:text-[17px] text-center tracking-[0.56px] md:tracking-[0.68px] leading-4">
            FROM IDEA TO ONLINE SUCCESS
          </p>
        </div>

        <p className="relative w-full [font-family:'Poppins',Helvetica] font-medium text-gray-700 text-sm md:text-base text-center tracking-[-0.28px] md:tracking-[-0.32px] leading-5 md:leading-6 px-4">
          Accelerate your business growth with modern, scalable, and
          result-driven digital solutions.
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-[1152px] px-4 gap-3 md:gap-4 absolute top-[300px] md:top-[402px] left-1/2 -translate-x-1/2 items-center justify-center animate-fade-up" style={{ "--animation-delay": "0.4s" } as React.CSSProperties}>
        <div className="inline-flex flex-col md:flex-row items-center justify-center gap-2 md:gap-1 relative flex-[0_0_auto] w-full md:w-auto">
          <button 
            onClick={() => scrollToSection("contact")}
            className="all-[unset] box-border inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] rounded-[88px] bg-[linear-gradient(138deg,rgba(255,107,1,1)_0%,rgba(255,159,28,1)_100%)] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-400 cursor-pointer w-full md:w-auto"
          >
            <div className="relative w-fit mt-[-2.00px] [font-family:'Roboto',Helvetica] font-medium text-neutralwhite text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
              Book a Call
            </div>
          </button>

          <button 
            onClick={() => scrollToSection("services")}
            className="all-[unset] box-border inline-flex gap-2 px-6 py-2 relative flex-[0_0_auto] rounded-[99px] items-center justify-center transition-all duration-300 hover:bg-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 w-full md:w-auto"
          >
            <div className="relative w-fit [font-family:'Poppins',Helvetica] font-medium text-[#ff6f03] text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
              How it works
            </div>

            <img
              className="relative w-8 h-8 transition-transform duration-300 group-hover:translate-x-1"
              alt="Icon"
              src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/icon.svg"
            />
          </button>
        </div>
      </div>

      {/* Header Navigation */}
      <div className="absolute top-[-11px] left-0 w-full h-[88px] flex bg-[#ffffff0f] overflow-hidden backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] z-50">
        <div className="w-full h-auto min-h-[88px] relative overflow-hidden">
          {/* Desktop Navigation */}
          <div className="hidden lg:inline-flex items-start gap-2 p-1 absolute top-7 left-1/2 -translate-x-1/2">
            <button
              onClick={() => scrollToSection("services")}
              className={`inline-flex items-center gap-0.5 px-4 py-2 relative flex-[0_0_auto] rounded-lg transition-all duration-300 hover:bg-white/20 cursor-pointer ${
                activeSection === "services" ? "bg-white/30" : ""
              }`}
            >
              <div className={`relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-base tracking-[-0.32px] leading-6 whitespace-nowrap ${
                activeSection === "services" ? "text-gray-900 font-semibold" : "text-gray-900"
              }`}>
                Services
              </div>

              <img
                className="relative w-4 h-4"
                alt="Expand more"
                src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/expand-more.svg"
              />
            </button>

            <button
              onClick={() => scrollToSection("saas")}
              className={`inline-flex items-center gap-0.5 px-4 py-2 relative flex-[0_0_auto] rounded-lg transition-all duration-300 hover:bg-white/20 cursor-pointer ${
                activeSection === "saas" ? "bg-white/30" : ""
              }`}
            >
              <div className={`relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-base tracking-[-0.32px] leading-6 whitespace-nowrap ${
                activeSection === "saas" ? "text-gray-900 font-semibold" : "text-gray-900"
              }`}>
                SaaS
              </div>
            </button>

            <button
              onClick={() => scrollToSection("websites")}
              className={`inline-flex items-center gap-0.5 px-4 py-2 relative flex-[0_0_auto] rounded-lg transition-all duration-300 hover:bg-white/20 cursor-pointer ${
                activeSection === "websites" ? "bg-white/30" : ""
              }`}
            >
              <div className={`relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-base tracking-[-0.32px] leading-6 whitespace-nowrap ${
                activeSection === "websites" ? "text-gray-900 font-semibold" : "text-gray-900"
              }`}>
                Websites
              </div>
            </button>

            <button
              onClick={() => scrollToSection("marketing")}
              className={`inline-flex items-center gap-0.5 px-4 py-2 relative flex-[0_0_auto] rounded-lg transition-all duration-300 hover:bg-white/20 cursor-pointer ${
                activeSection === "marketing" ? "bg-white/30" : ""
              }`}
            >
              <div className={`relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-base tracking-[-0.32px] leading-6 whitespace-nowrap ${
                activeSection === "marketing" ? "text-gray-900 font-semibold" : "text-gray-900"
              }`}>
                Marketing
              </div>
            </button>

            <button
              onClick={() => scrollToSection("tools")}
              className={`inline-flex items-center gap-0.5 px-4 py-2 relative flex-[0_0_auto] rounded-lg transition-all duration-300 hover:bg-white/20 cursor-pointer ${
                activeSection === "tools" ? "bg-white/30" : ""
              }`}
            >
              <div className={`relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-base tracking-[-0.32px] leading-6 whitespace-nowrap ${
                activeSection === "tools" ? "text-gray-900 font-semibold" : "text-gray-900"
              }`}>
                Tools
              </div>
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className={`inline-flex items-center gap-0.5 px-4 py-2 relative flex-[0_0_auto] rounded-lg transition-all duration-300 hover:bg-white/20 cursor-pointer ${
                activeSection === "contact" ? "bg-white/30" : ""
              }`}
            >
              <div className={`relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-base tracking-[-0.32px] leading-6 whitespace-nowrap ${
                activeSection === "contact" ? "text-gray-900 font-semibold" : "text-gray-900"
              }`}>
                Contact us
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden absolute top-7 right-8 z-50 p-2 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-[88px] left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg z-40 animate-fade-in max-h-[calc(100vh-88px)] overflow-y-auto">
              <div className="flex flex-col p-4 gap-2">
                <button
                  onClick={() => scrollToSection("services")}
                  className={`px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === "services" ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("saas")}
                  className={`px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === "saas" ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  SaaS
                </button>
                <button
                  onClick={() => scrollToSection("websites")}
                  className={`px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === "websites" ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  Websites
                </button>
                <button
                  onClick={() => scrollToSection("marketing")}
                  className={`px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === "marketing" ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  Marketing
                </button>
                <button
                  onClick={() => scrollToSection("tools")}
                  className={`px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === "tools" ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  Tools
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === "contact" ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  Contact us
                </button>
              </div>
            </div>
          )}

          <div className="hidden lg:inline-flex items-center justify-center gap-1 absolute top-6 right-8">
            <button className="all-[unset] box-border inline-flex gap-2 px-6 py-3 relative flex-[0_0_auto] rounded-[99px] items-center justify-center transition-all duration-300 hover:bg-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400">
              <img
                className="relative w-8 h-8"
                alt="Carbon language"
                src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/carbon-language.svg"
              />

              <div className="relative w-fit [font-family:'Poppins',Helvetica] font-medium text-[#ff6f03] text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                বল
              </div>
            </button>

            <button className="all-[unset] box-border inline-flex gap-2 px-6 py-3 relative flex-[0_0_auto] rounded-[99px] items-center justify-center transition-all duration-300 hover:bg-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400">
              <div className="relative w-fit [font-family:'Poppins',Helvetica] font-medium text-[#ff6f03] text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                Sign in
              </div>
            </button>

            <button 
              onClick={() => scrollToSection("contact")}
              className="all-[unset] box-border inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] rounded-[88px] bg-[linear-gradient(138deg,rgba(255,107,1,1)_0%,rgba(255,159,28,1)_100%)] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-orange-400"
            >
              <div className="relative w-fit mt-[-2.00px] [font-family:'Roboto',Helvetica] font-medium text-neutralwhite text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                Book a Call
              </div>
            </button>
          </div>

          <img
            className="absolute top-6 left-4 md:left-10 w-[180px] md:w-[262px] h-auto"
            alt="Frame"
            src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/frame-1000001802.png"
          />
        </div>
      </div>

      <img
        className="hidden md:block absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[600px] lg:max-w-[900px] h-auto animate-fade-up px-4"
        style={{ "--animation-delay": "0.6s" } as React.CSSProperties}
        alt="Element"
        src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/6-6.png"
      />
    </div>
  );
};
