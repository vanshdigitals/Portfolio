import portrait from "../assets/New Profile Icon DP.png";

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen pt-[96px] pb-0 flex flex-col justify-end overflow-hidden bg-bg border-b border-border transition-colors duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)]"
    >
      {/* LAYER 2: The Photo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] pointer-events-none z-10 flex justify-center items-end">
        <img 
          src={portrait} 
          alt="Vansh Gupta, graphic designer"
          className="w-auto h-[60vh] md:h-[82vh] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] origin-bottom"
        />
      </div>
    </section>
  );
}
