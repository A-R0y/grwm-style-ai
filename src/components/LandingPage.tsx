import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Fashion" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-end min-h-screen p-8 pb-16">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
          <span className="text-primary-foreground/80 font-medium tracking-widest text-xs uppercase font-[Outfit]">
            AI-Powered
          </span>
        </div>
        <h1 className="text-4xl font-extrabold text-primary-foreground leading-tight mb-4">
          Your Personal<br />AI Stylist
        </h1>
        <p className="text-primary-foreground/70 text-base mb-8 max-w-xs font-[Outfit]">
          Curate your wardrobe, discover your best colors, and get outfit suggestions powered by AI.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="gradient-primary text-primary-foreground font-semibold py-4 px-8 rounded-3xl text-lg w-full active:scale-95 transition-transform shadow-lg shadow-primary/30"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
