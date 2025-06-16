
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { RecaptchaVerifier } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { toast } from "@/hooks/use-toast";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaContainer = useRef<HTMLDivElement | null>(null);

  const from = location.state?.from || '/';

  // Clean up reCAPTCHA on component unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // Reset reCAPTCHA verifier
  const resetRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  };

  // Setup reCAPTCHA verifier
  const setupRecaptcha = () => {
    resetRecaptcha();
    
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log("reCAPTCHA solved");
          },
          'expired-callback': () => {
            console.log("reCAPTCHA expired");
            resetRecaptcha();
          }
        }
      );
    }
  };

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      toast({ title: "Please enter a valid 10-digit phone number", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    const phone = `+91${phoneNumber}`;
    
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setStep('otp');
      toast({ title: "OTP sent!", description: `OTP sent to +91${phoneNumber}` });
    } catch (error: any) {
      console.error("Failed to send OTP:", error);
      resetRecaptcha();
      
      let errorMessage = "Failed to send OTP";
      if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many requests. Please try again later.";
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Invalid phone number format";
      } else if (error.code === 'auth/missing-phone-number') {
        errorMessage = "Phone number is required";
      }
      
      toast({ 
        title: errorMessage, 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setOtp(''); // Clear current OTP
    
    try {
      // Reset and setup new reCAPTCHA
      setupRecaptcha();
      const phone = `+91${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      toast({ title: "OTP resent!", description: `New OTP sent to +91${phoneNumber}` });
    } catch (error: any) {
      console.error("Failed to resend OTP:", error);
      resetRecaptcha();
      
      let errorMessage = "Failed to resend OTP";
      if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many requests. Please wait before requesting again.";
      }
      
      toast({ 
        title: errorMessage, 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({ title: "Please enter the complete OTP", variant: "destructive" });
      return;
    }
    if (!confirmationResult) {
      toast({ title: "Session expired", description: "Please resend OTP", variant: "destructive" });
      setStep('phone');
      setOtp('');
      return;
    }
    setIsLoading(true);
    try {
      await confirmationResult.confirm(otp);
      login(phoneNumber);
      toast({ title: "Login successful!" });
      // Clean up reCAPTCHA after successful login
      resetRecaptcha();
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("OTP verification failed:", error);
      let errorMessage = "Invalid OTP";
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = "Invalid OTP. Please check and try again.";
      } else if (error.code === 'auth/code-expired') {
        errorMessage = "OTP has expired. Please request a new one.";
      }
      toast({ title: errorMessage, description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setConfirmationResult(null);
    resetRecaptcha();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => step === 'otp' ? handleBackToPhone() : navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {step === 'phone' ? 'Sign In' : 'Verify OTP'}
          </h1>
        </div>

        {step === 'phone' ? (
          <div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter your mobile number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                We'll send you an OTP to verify your number
              </p>
            </div>
            <div ref={recaptchaContainer} id="recaptcha-container" />
            <button
              onClick={handleSendOTP}
              disabled={phoneNumber.length !== 10 || isLoading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                We've sent a 6-digit OTP to +91 {phoneNumber}
              </p>
              
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter OTP
              </label>
              
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mb-4"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              onClick={handleBackToPhone}
              className="w-full text-orange-500 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
            >
              Change Number
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Didn't receive OTP?{' '}
                <button 
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-orange-500 font-medium hover:underline disabled:opacity-50"
                >
                  {isLoading ? 'Resending...' : 'Resend'}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

declare global {
  interface Window {
    recaptchaVerifier?: any;
  }
}

export default Auth;
