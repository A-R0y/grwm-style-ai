import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import logo from "@/assets/grwm-logo-clean.png";

type Gender = "female" | "male" | null;

interface BodyType {
  id: string;
  name: string;
  description: string;
  image: string;
}

const femaleBodyTypes: BodyType[] = [
  {
    id: "hourglass",
    name: "Hourglass",
    description: "Balanced bust and hips with a defined narrow waist",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop",
  },
  {
    id: "pear",
    name: "Pear",
    description: "Hips wider than shoulders with a defined waist",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop",
  },
  {
    id: "apple",
    name: "Apple",
    description: "Broader shoulders and bust with narrower hips",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    description: "Bust, waist, and hips similar in width",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop",
  },
  {
    id: "spoon",
    name: "Spoon / Oval",
    description: "Fuller midsection with defined waist or pear-like shape",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop",
  },
];

const maleBodyTypes: BodyType[] = [
  {
    id: "inverted-triangle",
    name: "Inverted Triangle",
    description: "Wide shoulders and chest with narrow hips",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    description: "Shoulders, waist, and hips have similar widths",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
  },
  {
    id: "trapezium",
    name: "Trapezium",
    description: "Broad shoulders, slightly smaller waist, strong limbs",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
  },
  {
    id: "oval",
    name: "Oval / Round",
    description: "Weight concentrated in the stomach area",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop",
  },
];

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=selfie, 1=gender, 2=body type, 3=loading
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelfiePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step === 2 && selectedBodyType) {
      setStep(3);
      // Simulate AI personalization
      setTimeout(() => {
        localStorage.setItem("grwm-onboarded", "true");
        localStorage.setItem(
          "grwm-profile",
          JSON.stringify({ gender, bodyType: selectedBodyType })
        );
        navigate("/app");
      }, 3500);
    } else {
      setStep((s) => s + 1);
    }
  };

  const canProceed =
    (step === 0 && selfiePreview) ||
    (step === 1 && gender) ||
    (step === 2 && selectedBodyType);

  const bodyTypes = gender === "male" ? maleBodyTypes : femaleBodyTypes;

  // Step 3: Loading / Personalization
  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center animate-pulse">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-primary/30 animate-spin" style={{ borderTopColor: "transparent" }} />
        </div>
        <h2 className="text-xl font-bold text-gradient mb-2">Personalization in Progress</h2>
        <p className="text-muted-foreground text-sm text-center max-w-[260px]">
          Our AI is analyzing your features to create your perfect color palette & style profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <img src={logo} alt="GRWM" className="w-10 h-10 object-contain" />
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i <= step ? "gradient-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Step 0: Selfie */}
      {step === 0 && (
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-1">Let's get to know you</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Take or upload a selfie so our AI can analyze your skin tone
          </p>

          {selfiePreview ? (
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-primary/20">
                <img src={selfiePreview} alt="Selfie" className="w-full h-full object-cover" />
              </div>
              <button
                onClick={() => setSelfiePreview(null)}
                className="text-sm text-primary font-medium"
              >
                Retake / Change Photo
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4">
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={handleFileUpload}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="glass rounded-2xl p-6 flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm">Take a Selfie</h3>
                  <p className="text-muted-foreground text-xs">Use your camera</p>
                </div>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="glass rounded-2xl p-6 flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm">Upload from Gallery</h3>
                  <p className="text-muted-foreground text-xs">Choose an existing photo</p>
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 1: Gender */}
      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-1">Select your gender</h2>
          <p className="text-muted-foreground text-sm mb-6">
            This helps us show the right body type options
          </p>
          <div className="flex flex-col gap-4">
            {(["female", "male"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`glass rounded-2xl p-6 text-left transition-all active:scale-[0.98] ${
                  gender === g ? "ring-2 ring-primary shadow-lg shadow-primary/10" : ""
                }`}
              >
                <h3 className="font-semibold text-base capitalize">{g}</h3>
                <p className="text-muted-foreground text-xs mt-1">
                  {g === "female" ? "Show female body type options" : "Show male body type options"}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Body Type */}
      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-1">Select your body type</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Tap the one that best describes you
          </p>
          <div className="grid grid-cols-2 gap-3 overflow-y-auto flex-1 pb-4">
            {bodyTypes.map((bt) => (
              <button
                key={bt.id}
                onClick={() => setSelectedBodyType(bt.id)}
                className={`glass rounded-2xl overflow-hidden text-left transition-all active:scale-[0.97] ${
                  selectedBodyType === bt.id
                    ? "ring-2 ring-primary shadow-lg shadow-primary/10"
                    : ""
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={bt.image}
                    alt={bt.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-xs">{bt.name}</h4>
                  <p className="text-muted-foreground text-[10px] mt-0.5 line-clamp-2">
                    {bt.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      {step < 3 && (
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-full py-4 rounded-3xl text-base font-semibold flex items-center justify-center gap-2 transition-all mt-4 ${
            canProceed
              ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/30 active:scale-95"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {step === 2 ? "Analyze & Continue" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default OnboardingFlow;
