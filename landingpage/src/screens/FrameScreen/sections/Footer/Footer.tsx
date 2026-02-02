export const Footer = (): JSX.Element => {
  return (
    <footer className="relative w-full mt-[200px] md:mt-[300px] mx-auto max-w-[1440px] bg-transparent">
      <img
        className="absolute w-full h-[185.18%] top-[-85.18%] left-0 object-cover"
        alt="Rectangle"
        src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/rectangle-3842.svg"
      />

      <div className="relative px-4 md:px-8 py-12 md:py-16">
        <div className="relative mb-8 md:mb-12">
          <img
            className="w-32 md:w-48 lg:w-56 h-auto mx-auto md:mx-0"
            alt="Group"
            src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/group-2036.png"
          />
        </div>

        <img
          className="w-full mb-8 md:mb-12"
          alt="Vector"
          src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/vector-5.svg"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col space-y-4">
            <div className="font-subtitle-1-18 font-[number:var(--subtitle-1-18-font-weight)] text-white text-[length:var(--subtitle-1-18-font-size)] tracking-[var(--subtitle-1-18-letter-spacing)] leading-[var(--subtitle-1-18-line-height)] [font-style:var(--subtitle-1-18-font-style)]">
              Company
            </div>

            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal]">
              About
            </div>

            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal]">
              Contact
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="font-subtitle-1-18 font-[number:var(--subtitle-1-18-font-weight)] text-white text-[length:var(--subtitle-1-18-font-size)] tracking-[var(--subtitle-1-18-letter-spacing)] leading-[var(--subtitle-1-18-line-height)] [font-style:var(--subtitle-1-18-font-style)]">
              Legal
            </div>

            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal]">
              Privacy Policy
            </div>

            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal]">
              Terms &amp; Services
            </div>

            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal]">
              Terms of Use
            </div>

            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal]">
              Refund Policy
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="font-subtitle-1-18 font-[number:var(--subtitle-1-18-font-weight)] text-white text-[length:var(--subtitle-1-18-font-size)] tracking-[var(--subtitle-1-18-letter-spacing)] leading-[var(--subtitle-1-18-line-height)] [font-style:var(--subtitle-1-18-font-style)]">
              Quick Links
            </div>

            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal]">
              SaaS Subscription
            </div>

            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal]">
              Website Building
            </div>

            <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal]">
              Service &amp; Technology
            </div>
          </div>

          <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-1">
            <div className="bg-[#131313] rounded-[10px] p-4 md:p-6">
              <div className="font-subtitle-1-18 font-[number:var(--subtitle-1-18-font-weight)] text-white text-[length:var(--subtitle-1-18-font-size)] tracking-[var(--subtitle-1-18-letter-spacing)] leading-[var(--subtitle-1-18-line-height)] [font-style:var(--subtitle-1-18-font-style)] mb-4">
                Join Our Newsletter
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <div className="flex-1 bg-[#1e1e1e] rounded px-3 py-3 md:py-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-transparent [font-family:'Poppins',Helvetica] font-normal text-[#606060] text-xs md:text-sm tracking-[0] leading-[normal] outline-none"
                  />
                </div>

                <button className="w-full sm:w-auto px-6 py-3 md:py-4 transition-all duration-300 hover:opacity-80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white rounded relative">
                  <img
                    className="absolute inset-0 w-full h-full rounded"
                    alt="Rectangle"
                    src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/rectangle-128.svg"
                  />
                  <span className="relative [font-family:'Poppins',Helvetica] font-medium text-white text-xs md:text-sm tracking-[0] leading-[normal]">
                    Subscribe
                  </span>
                </button>
              </div>

              <p className="opacity-50 [font-family:'Manrope',Helvetica] font-medium text-white text-xs md:text-[13px] tracking-[0] leading-[normal]">
                *&nbsp;&nbsp;Will send you weekly updates for your better tool
                management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
