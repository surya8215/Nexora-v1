import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import axios from 'axios';
import { getFriendlyErrorMessage } from '../utils/errorHelper';
import { Sparkles, Mail, Lock, User, Heart, ChevronRight, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import BubbleBackground from '../components/BubbleBackground';
import PreferenceSelect from '../components/PreferenceSelect';
import { ButtonLoader } from '../components/NexoraLoader';
import { SpiderWebSpinner, SpiderOverlayLoader } from '../components/SpiderMascot';

const LoginHelper = ({ animating }) => {
  return (
    <div className="relative w-48 h-32 flex items-center justify-center select-none mb-4">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="helperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE047" />
            <stop offset="100%" stopColor="#F5B800" />
          </linearGradient>
          <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
          <linearGradient id="doorFrameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        <style>{`
          .helper-body {
            transform-origin: 110px 75px;
            animation: ${animating ? 'jumpBreathe 0.5s infinite ease-in-out' : 'idleBreathe 3s infinite ease-in-out'};
          }
          .helper-left-arm {
            transform-origin: 90px 75px;
            animation: ${animating ? 'waveLeftArm 0.25s infinite alternate ease-in-out' : 'idleLeftArm 3s infinite ease-in-out'};
          }
          .helper-right-arm {
            transform-origin: 130px 75px;
            animation: ${animating ? 'waveRightArm 0.25s infinite alternate ease-in-out' : 'idleRightArm 3s infinite ease-in-out'};
          }
          .helper-eyes {
            animation: blink 4s infinite step-end;
          }
          .door-panel {
            transform-origin: 50px 65px;
            animation: openDoor 1.5s forwards cubic-bezier(0.16, 1, 0.3, 1);
          }
          .door-glow {
            animation: glowPulse 2s infinite alternate ease-in-out;
          }

          @keyframes idleBreathe {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.02, 0.98) translateY(1px); }
          }
          @keyframes jumpBreathe {
            0%, 100% { transform: translateY(0) scale(1, 1); }
            50% { transform: translateY(-12px) scale(0.96, 1.05); }
          }
          @keyframes idleLeftArm {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-5deg); }
          }
          @keyframes idleRightArm {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(8deg); }
          }
          @keyframes waveLeftArm {
            0% { transform: rotate(-10deg); }
            100% { transform: rotate(15deg); }
          }
          @keyframes waveRightArm {
            0% { transform: rotate(35deg); }
            100% { transform: rotate(75deg); }
          }
          @keyframes blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          @keyframes openDoor {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(-35deg); }
          }
          @keyframes glowPulse {
            0% { opacity: 0.2; }
            100% { opacity: 0.6; }
          }
        `}</style>

        <ellipse cx="100" cy="115" rx="70" ry="8" fill="#000" fillOpacity="0.2" />

        <g filter="url(#softShadow)" style={{ perspective: '200px' }}>
          <rect x="35" y="20" width="40" height="90" rx="4" fill="#E2E8F0" fillOpacity="0.1" className="door-glow" />
          <path d="M35 110V20H75V110" stroke="url(#doorFrameGrad)" strokeWidth="4" strokeLinecap="round" />

          <g className="door-panel">
            <rect x="37" y="22" width="36" height="86" rx="2" fill="url(#doorGrad)" stroke="#4338CA" strokeWidth="1" />
            <rect x="43" y="30" width="10" height="22" rx="1" fill="#4F46E5" fillOpacity="0.4" />
            <rect x="57" y="30" width="10" height="22" rx="1" fill="#4F46E5" fillOpacity="0.4" />
            <rect x="43" y="60" width="24" height="38" rx="1" fill="#3730A3" fillOpacity="0.5" />
            <circle cx="68" cy="65" r="2.5" fill="#FFE047" />
          </g>
        </g>

        <g className="helper-body" filter="url(#softShadow)">
          <ellipse cx="110" cy="108" rx="22" ry="5" fill="#000" fillOpacity="0.15" />

          <path
            d="M90 75 Q72 65 67 65"
            stroke="#FFE047"
            strokeWidth="8"
            strokeLinecap="round"
            className="helper-left-arm"
          />

          <path
            d="M130 75 Q145 65 152 50"
            stroke="#FFE047"
            strokeWidth="8"
            strokeLinecap="round"
            className="helper-right-arm"
          />

          <rect x="100" y="98" width="8" height="12" rx="4" fill="#F5B800" />
          <circle cx="104" cy="110" r="5" fill="#FFE047" />

          <rect x="112" y="98" width="8" height="12" rx="4" fill="#F5B800" />
          <circle cx="116" cy="110" r="5" fill="#FFE047" />

          <circle cx="110" cy="75" r="24" fill="url(#helperGrad)" />

          <circle cx="98" cy="78" r="3" fill="#F43F5E" fillOpacity="0.6" />
          <circle cx="122" cy="78" r="3" fill="#F43F5E" fillOpacity="0.6" />

          <g className="helper-eyes" fill="#0F172A">
            <circle cx="102" cy="73" r="2.5" />
            <circle cx="118" cy="73" r="2.5" />
          </g>

          <path d="M107 78 Q110 82 113 78" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
};

const SuccessHelper = () => {
  return (
    <div className="relative w-48 h-36 flex items-center justify-center select-none mb-2">
      <svg
        viewBox="0 0 200 140"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE047" />
            <stop offset="100%" stopColor="#F5B800" />
          </linearGradient>
          <linearGradient id="partyHatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        <style>{`
          .mascot-body {
            transform-origin: 100px 75px;
            animation: mascotJump 0.8s infinite ease-in-out alternate;
          }
          .mascot-left-arm {
            transform-origin: 80px 75px;
            animation: waveLeft 0.4s infinite alternate ease-in-out;
          }
          .mascot-right-arm {
            transform-origin: 120px 75px;
            animation: waveRight 0.4s infinite alternate ease-in-out;
          }
          .mascot-eyes {
            animation: blinkEyes 3s infinite step-end;
          }
          .sparkle-particle {
            animation: sparklePulse 1.5s infinite ease-in-out;
          }
          .sparkle-1 { animation-delay: 0s; transform-origin: 50px 40px; }
          .sparkle-2 { animation-delay: 0.3s; transform-origin: 150px 30px; }
          .sparkle-3 { animation-delay: 0.6s; transform-origin: 160px 80px; }
          .sparkle-4 { animation-delay: 0.9s; transform-origin: 40px 90px; }

          @keyframes mascotJump {
            0% { transform: translateY(5px) scale(1, 0.96); }
            100% { transform: translateY(-12px) scale(0.96, 1.04); }
          }
          @keyframes waveLeft {
            0% { transform: rotate(20deg); }
            100% { transform: rotate(-40deg); }
          }
          @keyframes waveRight {
            0% { transform: rotate(-20deg); }
            100% { transform: rotate(40deg); }
          }
          @keyframes blinkEyes {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          @keyframes sparklePulse {
            0%, 100% { transform: scale(0.6) rotate(0deg); opacity: 0.3; }
            50% { transform: scale(1.2) rotate(45deg); opacity: 1; }
          }
        `}</style>

        {/* Shadow */}
        <ellipse cx="100" cy="120" rx="40" ry="6" fill="#000" fillOpacity="0.25" />

        {/* Sparkles / Confetti */}
        <g className="sparkle-particle sparkle-1">
          <path d="M50 30 L53 35 L58 36 L53 37 L50 42 L47 37 L42 36 L47 35 Z" fill="#FFE047" />
        </g>
        <g className="sparkle-particle sparkle-2">
          <path d="M150 20 L152 24 L157 25 L152 26 L150 30 L148 26 L143 25 L148 24 Z" fill="#F43F5E" />
        </g>
        <g className="sparkle-particle sparkle-3">
          <path d="M165 75 L167 79 L172 80 L167 81 L165 85 L163 81 L158 80 L163 79 Z" fill="#3B82F6" />
        </g>
        <g className="sparkle-particle sparkle-4">
          <path d="M40 85 L42 89 L47 90 L42 91 L40 95 L38 91 L33 90 L38 89 Z" fill="#10B981" />
        </g>

        {/* Mascot */}
        <g className="mascot-body" filter="url(#softShadow)">
          {/* Arms */}
          <path
            d="M80 75 Q60 60 52 50"
            stroke="#FFE047"
            strokeWidth="8"
            strokeLinecap="round"
            className="mascot-left-arm"
          />
          <path
            d="M120 75 Q140 60 148 50"
            stroke="#FFE047"
            strokeWidth="8"
            strokeLinecap="round"
            className="mascot-right-arm"
          />

          {/* Feet */}
          <circle cx="92" cy="106" r="6" fill="#F5B800" />
          <circle cx="108" cy="106" r="6" fill="#F5B800" />

          {/* Main Body (yellow circle) */}
          <circle cx="100" cy="75" r="28" fill="url(#successGrad)" />

          {/* Party Hat */}
          <path d="M85 52 L100 24 L115 52 Z" fill="url(#partyHatGrad)" />
          {/* Hat Pom pom */}
          <circle cx="100" cy="22" r="5" fill="#FFE047" />

          {/* Rosy Cheeks */}
          <circle cx="86" cy="79" r="4.5" fill="#F43F5E" fillOpacity="0.75" />
          <circle cx="114" cy="79" r="4.5" fill="#F43F5E" fillOpacity="0.75" />

          {/* Eyes (happy curves) */}
          <path d="M90 73 Q94 70 98 73" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M102 73 Q106 70 110 73" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Mouth (smiling open) */}
          <path d="M95 82 Q100 90 105 82 Z" fill="#0F172A" />
        </g>
      </svg>
    </div>
  );
};

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading } = useAuth();
  const { showToast } = useToast();

  const isSetPasswordPath = location.pathname === '/set-password';

  // Determine active tab or view based on URL params
  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'signin';
  const tokenParam = searchParams.get('token');

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isVerifyView, setIsVerifyView] = useState(isSetPasswordPath || !!tokenParam);
  const [verificationToken, setVerificationToken] = useState(tokenParam || '');
  const [isForgotView, setIsForgotView] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState('');
  const [isResetAction, setIsResetAction] = useState(searchParams.get('action') === 'reset');
  const [isTokenChecking, setIsTokenChecking] = useState(!!tokenParam);
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('Processing...');

  // Form states
  const [signinForm, setSigninForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    favMovieGenre: 'Sci-Fi',
    favPlaceType: 'Mountains',
    favSeriesGenre: 'Thriller',
    favGameType: 'RPG'
  });
  const [verifyForm, setVerifyForm] = useState({ password: '', confirmPassword: '' });

  // Password validation checks
  const isLengthValid = verifyForm.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(verifyForm.password);
  const hasNumber = /[0-9]/.test(verifyForm.password);
  const hasSpecial = /[@$!%*?&]/.test(verifyForm.password);
  const isPasswordValid = isLengthValid && hasUppercase && hasNumber && hasSpecial;
  const passwordsMatch = verifyForm.password === verifyForm.confirmPassword && verifyForm.password.length > 0;

  // Auth feedback states
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/feed');
    }
  }, [isAuthenticated, navigate]);

  // Alert on session expiration
  useEffect(() => {
    if (searchParams.get('expired') === 'true') {
      showToast('Session expired or unauthorized. Please sign in.', 'error');
      navigate('/login?tab=signin', { replace: true });
    }
  }, [searchParams, showToast, navigate]);

  // Sync tab status with query params
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') setActiveTab('signup');
    else if (tab === 'signin') setActiveTab('signin');

    const token = searchParams.get('token');
    const action = searchParams.get('action');
    if (token) {
      setVerificationToken(token);
      setIsVerifyView(true);
      setIsResetAction(action === 'reset');
      
      // Verify token validity with backend
      const verifyTokenValidity = async () => {
        setIsTokenChecking(true);
        setIsTokenInvalid(false);
        try {
          const res = await axios.get('/api/v1/auth/check-token', {
            params: { token, action }
          });
          if (res.data && res.data.valid === false) {
            setIsTokenInvalid(true);
          }
        } catch (err) {
          setIsTokenInvalid(true);
        } finally {
          setIsTokenChecking(false);
        }
      };
      verifyTokenValidity();
    } else {
      if (isSetPasswordPath) {
        setIsVerifyView(true);
        if (!verificationToken) {
          setIsTokenInvalid(true);
        }
      } else {
        setIsVerifyView(false);
        setIsTokenInvalid(false);
      }
    }
  }, [searchParams, isSetPasswordPath, verificationToken]);



  const handleSigninChange = (e) => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleVerifyChange = (e) => {
    setVerifyForm({ ...verifyForm, [e.target.name]: e.target.value });
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitMessage('Signing you in...');
    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/v1/auth/login', signinForm);
      login(res.data.token, res.data.user);
      showToast('Login successful! Welcome to Nexora.', 'success');
      navigate('/feed');
    } catch (error) {
      const msg = getFriendlyErrorMessage(error, 'Failed to sign in. Please verify your credentials.');
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSubmitMessage('Creating your Nexora account...');
    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/v1/auth/signup', signupForm);
      setSuccessMessage('Registration requested! We have sent a verification email to your address. Please check your inbox and click the verification link to set your password.');
      showToast('Registration successful! A verification link has been sent to your email.', 'success');
      // Reset form
      setSignupForm({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        favMovieGenre: 'Sci-Fi',
        favPlaceType: 'Mountains',
        favSeriesGenre: 'Thriller',
        favGameType: 'RPG'
      });
    } catch (error) {
      const msg = getFriendlyErrorMessage(error, 'Failed to sign up. Please try again.');
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSubmitMessage('Sending reset link...');
    setIsSubmitting(true);
    try {
      await axios.post('/api/v1/auth/forgot-password', { email: forgotEmail });
      setSuccessModalMessage(`Successfully sent email to ${forgotEmail}.`);
      setShowSuccessModal(true);
      showToast('Reset password link sent successfully!', 'success');
      setForgotEmail('');
    } catch (error) {
      const msg = getFriendlyErrorMessage(error, 'Failed to request password reset. Please verify your email address.');
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!isPasswordValid) {
      setErrorMessage('Please ensure your password meets all requirements.');
      showToast('Please ensure your password meets all requirements.', 'error');
      return;
    }

    if (!passwordsMatch) {
      setErrorMessage('Passwords do not match.');
      showToast('Passwords do not match.', 'error');
      return;
    }

    const endpoint = isResetAction ? '/api/v1/auth/reset-password' : '/api/v1/auth/verify';

    setSubmitMessage(isResetAction ? 'Resetting password...' : 'Activating account...');
    setIsSubmitting(true);
    try {
      await axios.post(endpoint, {
        token: verificationToken,
        password: verifyForm.password
      });
      
      if (isResetAction) {
        showToast('Password reset successfully!', 'success');
        setSuccessMessage('Your password has been reset successfully. You can now sign in with your new password.');
      } else {
        showToast('Password set successfully! Account activated.', 'success');
        setSuccessMessage('Account activated successfully! You can now sign in.');
      }

      setIsVerifyView(false);
      setActiveTab('signin');
      navigate('/login?tab=signin');
      setVerifyForm({ password: '', confirmPassword: '' });
      setVerificationToken('');
    } catch (error) {
      const msg = getFriendlyErrorMessage(error, 'Verification failed. The activation or reset token may be invalid or expired.');
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <SpiderWebSpinner size={130} message="Authenticating..." />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-slate-100 z-10 px-4 py-12">
      <BubbleBackground />
      <SpiderOverlayLoader visible={isSubmitting} message={submitMessage} />

      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-8 cursor-pointer z-10" onClick={() => navigate('/')}>
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Nexora
        </span>
      </div>

      {/* Main Auth Card */}
      <div className="w-full max-w-lg glass rounded-3xl p-8 z-10 shadow-2xl relative overflow-hidden">
        
        {/* Error / Success Alerts */}
        {/* {errorMessage && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-3 animate-fade-in">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm flex items-start gap-3 animate-fade-in">
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )} */}

        {isVerifyView ? (
          /* ==========================================
             VERIFICATION / SET PASSWORD VIEW
             ========================================== */
          isTokenChecking ? (
            <div className="py-12">
              <SpiderWebSpinner size={120} message="Validating Link Security..." />
            </div>
          ) : isTokenInvalid ? (
            <div className="flex flex-col items-center text-center space-y-6 py-6 animate-fade-in">
              <div className="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/20">
                <AlertCircle className="h-10 w-10 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                  Link Already Used or Expired
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                  This verification or password reset link is invalid, has already been used, or has expired. Please request a new link.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsVerifyView(false);
                  setIsTokenInvalid(false);
                  setActiveTab('signin');
                  navigate('/login?tab=signin');
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition transform active:scale-95 text-white cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-center">
                <LoginHelper animating={isSubmitting} />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">Set Your Password</h2>
              <p className="text-slate-400 text-center text-sm mb-6">
                Complete your verification and secure your account.
              </p>

              <form onSubmit={handleVerifySubmit} className="space-y-5">


                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="Min. 8 characters"
                      value={verifyForm.password}
                      onChange={handleVerifyChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                  
                  {verifyForm.password.length > 0 && (
                    <div className="space-y-1.5 mt-2 text-xs text-slate-400">
                      <div className={`flex items-center gap-2 transition-colors ${isLengthValid ? 'text-green-400' : ''}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> At least 8 characters
                      </div>
                      <div className={`flex items-center gap-2 transition-colors ${hasUppercase ? 'text-green-400' : ''}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> One uppercase letter
                      </div>
                      <div className={`flex items-center gap-2 transition-colors ${hasNumber ? 'text-green-400' : ''}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> One number
                      </div>
                      <div className={`flex items-center gap-2 transition-colors ${hasSpecial ? 'text-green-400' : ''}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> One special character (@$!%*?&)
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      placeholder="Re-enter password"
                      value={verifyForm.confirmPassword}
                      onChange={handleVerifyChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                  {verifyForm.confirmPassword.length > 0 && (
                    <div className={`mt-2 text-xs flex items-center gap-2 transition-colors ${passwordsMatch ? 'text-green-400' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isPasswordValid || !passwordsMatch}
                  className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <ButtonLoader text="Verifying..." /> : 'Verify & Activate'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => { setIsVerifyView(false); setActiveTab('signin'); navigate('/login?tab=signin'); }}
                  className="text-sm text-purple-400 hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          )
        ) : isForgotView ? (
          /* ==========================================
             FORGOT PASSWORD VIEW
             ========================================== */
          <div>
            <div className="flex justify-center">
              <LoginHelper animating={isSubmitting} />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>
            <p className="text-slate-400 text-center text-sm mb-6">
              Enter your registered email address to receive a password reset link.
            </p>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <ButtonLoader text="Sending..." /> : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                onClick={() => { setIsForgotView(false); setErrorMessage(''); setSuccessMessage(''); }}
                className="text-sm text-purple-400 hover:underline cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        ) : (
          /* ==========================================
             SIGN IN / SIGN UP TABS
             ========================================== */
          <div>
            <div className="flex justify-center">
              <LoginHelper animating={isSubmitting} />
            </div>
            {/* Tabs Trigger */}
            <div className="flex border-b border-slate-800 mb-8">
              <button
                onClick={() => { setActiveTab('signin'); navigate('/login?tab=signin'); setErrorMessage(''); setSuccessMessage(''); }}
                className={`flex-1 pb-4 text-center font-semibold text-sm transition relative ${
                  activeTab === 'signin' ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Sign In
                {activeTab === 'signin' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
                )}
              </button>
              <button
                onClick={() => { setActiveTab('signup'); navigate('/login?tab=signup'); setErrorMessage(''); setSuccessMessage(''); }}
                className={`flex-1 pb-4 text-center font-semibold text-sm transition relative ${
                  activeTab === 'signup' ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Sign Up
                {activeTab === 'signup' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
                )}
              </button>
            </div>

            {activeTab === 'signin' ? (
              /* SIGN IN FORM */
              <form onSubmit={handleSigninSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      value={signinForm.email}
                      onChange={handleSigninChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Password</label>
                    <button
                      type="button"
                      onClick={() => { setIsForgotView(true); setErrorMessage(''); setSuccessMessage(''); }}
                      className="text-xs font-semibold text-purple-400 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      value={signinForm.password}
                      onChange={handleSigninChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <ButtonLoader text="Signing In..." /> : 'Sign In'}
                </button>
              </form>
            ) : (
              /* SIGN UP FORM */
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="John"
                        value={signupForm.firstName}
                        onChange={handleSignupChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:outline-none transition"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Doe"
                      value={signupForm.lastName}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john.doe@example.com"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Mobile Number (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="+1 (555) 000-0000"
                      value={signupForm.mobileNumber}
                      onChange={handleSignupChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Preferences Segment */}
                <div className="border-t border-slate-800 pt-6">
                  <div className="flex items-center gap-2 mb-4 text-purple-300 text-sm font-semibold">
                    <Heart className="h-4 w-4 fill-purple-400 text-purple-400" />
                    Personalize Your Experience
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <PreferenceSelect
                      label="Fav Movie Genre"
                      name="favMovieGenre"
                      value={signupForm.favMovieGenre}
                      onChange={handleSignupChange}
                      className="py-2"
                    />
                    <PreferenceSelect
                      label="Fav Place Type"
                      name="favPlaceType"
                      value={signupForm.favPlaceType}
                      onChange={handleSignupChange}
                      className="py-2"
                    />
                    <PreferenceSelect
                      label="Fav Series Genre"
                      name="favSeriesGenre"
                      value={signupForm.favSeriesGenre}
                      onChange={handleSignupChange}
                      className="py-2"
                    />
                    <PreferenceSelect
                      label="Fav Game Type"
                      name="favGameType"
                      value={signupForm.favGameType}
                      onChange={handleSignupChange}
                      className="py-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <ButtonLoader text="Sending Request..." /> : 'Send Verification Request'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md transition-all duration-300">
          <div className="w-full max-w-md mx-4 p-6 glass rounded-3xl border border-slate-800 shadow-2xl relative transform scale-100 transition-all duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <SuccessHelper />
                {/* <div className="absolute -bottom-1 -right-1 h-11 w-11 rounded-full bg-green-500 border-2 border-slate-900 flex items-center justify-center text-white shadow-lg shadow-green-500/40 animate-bounce">
                  <CheckCircle2 className="h-6 w-6" />
                </div> */}
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Email Sent Successfully
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed px-2">
                {successModalMessage}
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setIsForgotView(false);
                  setActiveTab('signin');
                  navigate('/login?tab=signin');
                }}
                className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition transform active:scale-95 text-white cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Auth;
