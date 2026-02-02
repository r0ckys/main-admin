export const DivWrapper = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full max-w-[970px] mx-auto items-center gap-8 md:gap-12 relative mt-[750px] md:mt-[900px] lg:mt-[1050px] px-4 md:px-8">
      <div className="flex flex-col items-center gap-2 relative w-full">
        <p className="relative w-full max-w-[946px] mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-[#4e4e4e] text-base md:text-lg text-center tracking-[0] leading-6 md:leading-[27px]">
          We offer a SaaS dashboard with live chat and AI-powered assistance to
          create landing pages, manage products, and complete tasks faster.
        </p>

        <p className="relative w-full [font-family:'Roboto',Helvetica] font-medium text-black text-3xl md:text-4xl lg:text-[56px] text-center tracking-[-0.72px] md:tracking-[-1.12px] leading-tight md:leading-[normal]">
          Support for essential Business features
        </p>
      </div>

      <div className="relative w-full max-w-[970px] min-h-[400px] md:min-h-[539px]">
        <div className="absolute top-4 md:top-[19px] left-1/2 -translate-x-1/2 w-full max-w-[732px] flex flex-col px-4">
          <img
            className="w-full max-w-[646px] h-auto mx-auto"
            alt="Elm"
            src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/elm2.png"
          />

          <img
            className="w-full h-auto"
            alt="Group"
            src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/group-14.png"
          />

          <img
            className="w-full h-auto self-center"
            alt="Image"
            src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/image-953.png"
          />
        </div>

        <div className="absolute top-[200px] md:top-[261px] left-0 w-full flex flex-col gap-4 md:gap-0 px-4">
          <div className="ml-0 md:ml-[81px] w-full max-w-[221px] h-[53px] relative">
            <div className="absolute top-0 left-0 w-[219px] h-[53px] bg-white rounded-[200px] shadow-[0px_0px_20px_#f7f7f7]" />

            <div className="absolute top-[9px] left-2.5 w-[35px] h-[35px] bg-[#c491d7] rounded-[17.5px]" />

            <div className="absolute top-[18px] left-[54px] [font-family:'Inter',Helvetica] font-bold text-[#454452] text-sm tracking-[0] leading-[normal]">
              INTEGRATED SYSTEM
            </div>

            <img
              className="absolute top-[19px] left-5 w-4 h-4"
              alt="Exchange alt"
              src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/exchange-alt.svg"
            />
          </div>

          <div className="ml-0 md:ml-auto w-full max-w-[243px] h-[53px] relative mt-4 md:mt-[39px] md:mr-0">
            <div className="w-[241px] absolute top-0 left-0 h-[53px] bg-white rounded-[200px] shadow-[0px_0px_20px_#f7f7f7]" />

            <div className="bg-[#fea68b] absolute top-[9px] left-2.5 w-[35px] h-[35px] rounded-[17.5px]" />

            <div className="absolute top-[18px] left-[54px] [font-family:'Inter',Helvetica] font-bold text-[#454452] text-sm tracking-[0] leading-[normal]">
              MONITORED CASH FLOW
            </div>

            <img
              className="absolute top-5 left-[21px] w-3.5 h-3.5"
              alt="Eye"
              src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/eye.svg"
            />
          </div>

          <div className="w-full max-w-[266px] h-[53px] relative mt-4 md:mt-[30px]">
            <div className="w-[264px] absolute top-0 left-0 h-[53px] bg-white rounded-[200px] shadow-[0px_0px_20px_#f7f7f7]" />

            <div className="bg-[#a586fe] absolute top-[9px] left-2.5 w-[35px] h-[35px] rounded-[17.5px]" />

            <div className="absolute top-[18px] left-[54px] [font-family:'Inter',Helvetica] font-bold text-[#454452] text-sm tracking-[0] leading-[normal]">
              INVENTORY MANAGEMENT
            </div>

            <img
              className="absolute top-5 left-[21px] w-3.5 h-3.5"
              alt="Dice"
              src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/dice-d20.svg"
            />
          </div>
        </div>

        <img
          className="hidden lg:block absolute top-px right-0 w-[68px] h-[156px]"
          alt="Arrow"
          src="https://c.animaapp.com/ml59rzgj7IZLZ2/img/arrow.png"
        />
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 3110, behavior: 'smooth' })}
        className="all-[unset] box-border inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] rounded-[88px] bg-[linear-gradient(138deg,rgba(255,107,1,1)_0%,rgba(255,159,28,1)_100%)] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-orange-400 w-full md:w-auto max-w-[250px]"
      >
        <div className="w-auto mt-[-2.00px] [font-family:'Roboto',Helvetica] font-medium text-neutralwhite tracking-[-0.32px] leading-6 relative text-base text-center">
          View Pricing
        </div>
      </button>
    </div>
  );
};
