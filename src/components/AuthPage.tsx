import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/grwm-logo-clean.png";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <button onClick={() => navigate("/")} className="self-start mb-6 text-muted-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="flex justify-center mb-8">
        <img src={logo} alt="GRWM" className="w-20 h-20 object-contain" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h2>
      <p className="text-muted-foreground text-center text-sm mb-8">
        {isSignUp ? "Join your AI styling journey" : "Sign in to continue"}
      </p>

      <div className="glass rounded-2xl p-1 flex mb-8">
        <button
          onClick={() => setIsSignUp(false)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            !isSignUp ? "gradient-primary text-primary-foreground shadow-md" : "text-muted-foreground"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsSignUp(true)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isSignUp ? "gradient-primary text-primary-foreground shadow-md" : "text-muted-foreground"
          }`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full glass rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full glass rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full glass rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          className="w-full gradient-primary text-primary-foreground font-semibold py-4 rounded-3xl text-base active:scale-95 transition-transform shadow-lg shadow-primary/30"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
