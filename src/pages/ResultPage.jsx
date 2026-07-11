import { useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  MdCheckCircle,
  MdOutlineCheck,
  MdOutlineClose,
  MdOutlineHelpOutline,
  MdOutlineFavoriteBorder,
  MdShare,
  MdContentCopy,
  MdShowChart
} from 'react-icons/md';
import * as LucideIcons from 'lucide-react';
import tiredBrainImg from '../assets/images/tired_brain.png';
import thinkingBrainImg from '../assets/images/thinking_mascot.png';
import {
  DIMENSION_LABELS,
  DIMENSION_TRANSLATIONS,
  QUICK_ACTION_TIPS,
  SEVERITY_HEADLINES,
  getDimensionSeverity,
} from '../lib/scoreAnswersService';
import { trackEvent } from '../lib/analytics';

const SEVERITY_STYLES = {
  low: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    label: 'Low Fatigue',
    emoji: '🟢',
  },
  moderate: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    label: 'Moderate Fatigue',
    emoji: '🟡',
  },
  high: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    label: 'High Fatigue',
    emoji: '🔴',
  },
};

const Icon = ({ name, ...props }) => {
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
  return <IconComponent {...props} />;
};

export default function ResultPage() {
  const location = useLocation();
  const { scoreResult, name } = location.state || {};
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!scoreResult) {
    return <Navigate to="/" replace />;
  }

  const { dimensions, overall, dominantDimension, severity } = scoreResult;
  const sev = SEVERITY_STYLES[severity] || SEVERITY_STYLES.moderate;
  const dominantLabel = DIMENSION_LABELS[dominantDimension];
  const headline = SEVERITY_HEADLINES[severity] || SEVERITY_HEADLINES.moderate;
  const dominantTranslation =
    DIMENSION_TRANSLATIONS[dominantDimension]?.[
      getDimensionSeverity(dimensions[dominantDimension])
    ] || '';
  
  const tips = QUICK_ACTION_TIPS[dominantDimension] || QUICK_ACTION_TIPS.recovery_quality;

  const handleCopyLink = async () => {
    const shareUrl = window.location.origin;
    const shareText = `I just took a 60-second cognitive fatigue assessment — turns out my brain's been running on fumes. Take it here: ${shareUrl}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Restora — Cognitive Fatigue Assessment',
          text: shareText,
          url: shareUrl,
        });
        trackEvent('Result Shared', { method: 'native_share', severity });
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setLinkCopied(true);
      trackEvent('Result Shared', { method: 'clipboard_copy', severity });
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setLinkCopied(true);
      trackEvent('Result Shared', { method: 'fallback_copy', severity });
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcf9] font-sans pb-24">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 pt-12 md:pt-20">
        
        {/* ─── Header Section ─── */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 text-green-800 rounded-full px-4 py-1.5 text-sm font-bold mb-8 shadow-sm">
            <MdCheckCircle size={18} className="text-green-600" />
            Waitlist spot confirmed
          </div>
          
          <p className="text-[11px] font-bold tracking-[0.25em] text-[#b64b16] mb-4 uppercase">
            Your Focus Snapshot
          </p>
          
          <h1 className="text-[#92360b] text-[32px] md:text-[44px] font-bold leading-[1.1] mb-6 max-w-[800px]">
            {headline}
          </h1>
          
          <div
            className={`inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full border mb-8 text-sm font-semibold ${sev.bg} ${sev.border} ${sev.text}`}
          >
            <span>{sev.emoji}</span>
            <span>{sev.label}</span>
          </div>
          
          <p className="text-[#8c6b5d] text-lg font-medium leading-relaxed">
            You're working harder than it should.<br className="hidden md:block" />
            The good news? This is reversible.
          </p>
        </div>

        {/* ─── Top Grid (Mascot & Score) ─── */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-24 mb-20 animate-fade-in-up delay-100">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img src={tiredBrainImg} alt="Tired brain" className="w-[280px] md:w-[320px] max-w-full object-contain" />
          </div>
          <div className="w-full md:w-[380px] flex justify-center md:justify-start md:pt-4">
            {/* Score card */}
            <div className="bg-white border-2 border-[#f4ece3] rounded-[32px] p-8 md:p-10 shadow-sm text-center w-full relative">
              <div className="flex justify-center mb-4 text-[#f3d9cd]">
                <LucideIcons.Brain size={48} strokeWidth={1.5} />
              </div>
              <p className="text-[#4a3f35] font-bold text-[15px] mb-2">Your Focus Score</p>
              <div className="flex items-baseline justify-center gap-1 mb-5">
                <span className="text-[#b64b16] text-[72px] font-black leading-none">{overall}</span>
                <span className="text-[#a0938b] text-2xl font-bold">/100</span>
              </div>
              <div className="w-full h-3 bg-[#f4ece3] rounded-full overflow-hidden flex mb-5">
                <div
                  className="h-full bg-[#b64b16] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${overall}%` }}
                />
              </div>
              <p className="text-[#8c6b5d] font-semibold text-sm">{sev.label}</p>
            </div>
          </div>
        </div>

        {/* ─── YOUR BIGGEST INSIGHT ─── */}
        <div className="bg-[#fffaf5] border-2 border-[#f4ece3] rounded-[32px] p-8 md:p-12 mb-16 flex flex-col md:flex-row gap-10 md:gap-16 animate-fade-in-up delay-200">
          {/* Left */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center bg-[#b64b16] text-white rounded-full w-10 h-10 font-black text-lg shadow-sm">
                #1
              </div>
              <p className="text-[12px] font-bold tracking-[0.15em] text-[#92360b] uppercase">Your Biggest Insight</p>
            </div>
            <h2 className="text-[#92360b] text-[32px] md:text-[36px] font-bold mb-4 leading-tight">{dominantLabel}</h2>
            <p className="text-[#4a3f35] text-[17px] leading-relaxed mb-6 font-medium">
              {dominantTranslation}
            </p>
            <p className="text-[#8c6b5d] text-[15px] leading-relaxed">
              That's why you're feeling mentally drained before lunch.
            </p>
          </div>
          {/* Right */}
          <div className="md:w-1/2 flex flex-col justify-center border-t-2 md:border-t-0 md:border-l-2 border-[#f4ece3] pt-8 md:pt-0 md:pl-12">
            <div className="flex items-center gap-2.5 mb-8 text-[#e0a843]">
              <LucideIcons.Sparkles size={24} />
              <span className="font-bold text-sm tracking-wide uppercase text-[#4a3f35]">Try this today</span>
            </div>
            <div className="space-y-6">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-0.5 p-2.5 bg-[#fcece4] text-[#b64b16] rounded-full shrink-0">
                    <Icon name={tip.icon} size={20} strokeWidth={2.5} />
                  </div>
                  <p className="text-[#4a3f35] font-medium leading-snug text-[15px] pt-1">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── COMPARISON AND VALIDATION ─── */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20 animate-fade-in-up delay-300">
          {/* Today vs Potential */}
          <div className="lg:w-[55%]">
            <div className="flex items-center gap-2.5 text-[#92360b] mb-6 pl-2">
              <MdShowChart size={24} />
              <h3 className="font-bold tracking-widest uppercase text-[12px]">Today vs. Your Potential</h3>
            </div>
            <div className="bg-white border-2 border-[#f4ece3] rounded-[32px] p-6 shadow-sm flex flex-col sm:flex-row relative h-[calc(100%-48px)]">
              {/* Box 1 */}
              <div className="flex-1 bg-[#fffaf5] border border-[#f4ece3] rounded-2xl p-6 text-center">
                <h4 className="text-[#b64b16] font-bold text-[17px] mb-1">Today</h4>
                <p className="text-[13px] text-[#8c6b5d] mb-6">Running on low battery</p>
                <img src={tiredBrainImg} className="h-28 mx-auto mb-8 object-contain" alt="Tired brain" />
                <ul className="text-left space-y-3.5">
                  {['Brain fog', 'Constant distractions', 'Mental exhaustion', 'Hard to switch off'].map((t, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-[#4a3f35] text-[13px] font-medium">
                      <MdOutlineClose className="text-red-400 mt-[3px] flex-shrink-0" size={16} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Arrow */}
              <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-[#f4ece3] rounded-full items-center justify-center text-[#b64b16] shadow-sm z-10">
                <LucideIcons.ArrowRight size={20} strokeWidth={2.5} />
              </div>

              {/* Box 2 */}
              <div className="flex-1 bg-[#f4fcf6] border border-[#d1fae5] rounded-2xl p-6 text-center mt-4 sm:mt-0 sm:ml-4">
                <h4 className="text-green-700 font-bold text-[17px] mb-1">With Restora</h4>
                <p className="text-[13px] text-green-700/70 mb-6">Feeling like yourself again</p>
                <img src={thinkingBrainImg} className="h-28 mx-auto mb-8 object-contain" alt="Happy brain" />
                <ul className="text-left space-y-3.5">
                  {['Clear thinking', 'Longer focus', 'More mental energy', 'Better daily rhythm'].map((t, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-[#4a3f35] text-[13px] font-medium">
                      <MdCheckCircle className="text-green-500 mt-[3px] flex-shrink-0" size={16} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Does this sound familiar */}
          <div className="lg:w-[45%]">
            <div className="flex items-center gap-2.5 text-[#92360b] mb-6 pl-2">
              <MdOutlineHelpOutline size={24} />
              <h3 className="font-bold tracking-widest uppercase text-[12px]">Does this sound familiar?</h3>
            </div>
            <div className="bg-white border-2 border-[#f4ece3] rounded-[32px] p-8 shadow-sm h-[calc(100%-48px)] flex flex-col justify-between">
              <ul className="space-y-6 mb-8 mt-2">
                {['Coffee isn\'t helping anymore', 'You reread the same paragraph', 'Small decisions feel exhausting', 'You pick up your phone without realizing', 'You feel mentally tired before the day is over'].map((t, i) => (
                  <li key={i} className="flex gap-4 items-start text-[#4a3f35] font-medium text-[15px] leading-snug">
                    <div className="bg-[#fffaf5] border border-[#f4ece3] rounded-full p-1 text-[#b64b16] mt-0 shrink-0">
                      <MdOutlineCheck size={16} />
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t-2 border-[#f4ece3] flex justify-between items-center text-[#8c6b5d] italic text-sm">
                <p className="leading-relaxed">You're not alone. Your brain is just<br/>asking for better support.</p>
                <MdOutlineFavoriteBorder size={32} className="text-[#e0a843] shrink-0 ml-4" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── WHEN RESTORA LAUNCHES ─── */}
        <div className="mb-24 animate-fade-in-up delay-400">
          <div className="flex items-center gap-2.5 text-[#92360b] mb-6 pl-2">
            <LucideIcons.Gift size={24} />
            <h3 className="font-bold tracking-widest uppercase text-[12px]">When Restora launches, you'll get</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Personalized Recovery Roadmap', text: 'Tailored to your brain and lifestyle', icon: LucideIcons.Brain },
              { title: 'Weekly Focus Score', text: 'Track progress and see what improves', icon: LucideIcons.BarChart2 },
              { title: 'Daily Focus Rituals', text: 'Simple practices for real mental recovery', icon: LucideIcons.Target },
              { title: 'AI Insights That Understand You', text: 'Smart recommendations that adapt over time', icon: LucideIcons.Sparkles },
              { title: 'Gentle Nudges Before Burnout', text: 'Timely reminders to protect your energy', icon: LucideIcons.Bell }
            ].map((feature, i) => (
              <div key={i} className="bg-white border-2 border-[#f4ece3] rounded-[24px] p-6 text-center shadow-sm flex flex-col items-center">
                <div className="text-[#b64b16] bg-[#fcece4] p-3.5 rounded-full mb-5">
                  <feature.icon size={26} strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[#4a3f35] text-[13px] mb-2 leading-snug">{feature.title}</h4>
                <p className="text-[12px] text-[#8c6b5d] leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FOOTER / SHARE ─── */}
        <div className="bg-[#fffaf5] border-2 border-[#f4ece3] rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-12 md:gap-20 animate-fade-in-up delay-500">
          {/* Left */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 text-[#92360b] mb-5">
              <LucideIcons.Users size={24} />
              <h3 className="font-bold tracking-widest uppercase text-[12px]">Know someone running on empty?</h3>
            </div>
            <p className="text-[#4a3f35] mb-8 font-medium text-[17px] leading-relaxed">
              Share your Focus Snapshot and help them<br className="hidden md:block" />
              take the first step toward feeling better.
            </p>
            
            <button
              onClick={handleCopyLink}
              className="w-full max-w-[320px] py-4 bg-[#b64b16] text-white rounded-full font-bold text-base hover:bg-[#92360b] transition-colors shadow-lg shadow-orange-900/10 flex justify-center items-center gap-2 mb-4"
            >
              {linkCopied ? (
                <>
                  <MdCheckCircle size={20} />
                  Link copied!
                </>
              ) : (
                <>
                  {typeof navigator !== "undefined" && navigator.share ? (
                    <MdShare size={20} />
                  ) : (
                    <MdContentCopy size={20} />
                  )}
                  Share My Snapshot
                </>
              )}
            </button>
            <p className="text-[13px] text-[#8c6b5d] italic mb-10">It takes just 60 seconds for them.</p>

            <div className="flex flex-wrap md:flex-nowrap items-start gap-6 pt-8 border-t-2 border-[#f4ece3]">
              <div className="flex gap-2.5">
                <LucideIcons.Clock size={18} className="text-[#b64b16] flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#8c6b5d] leading-relaxed">Takes just<br/><strong className="text-[#4a3f35]">60 seconds</strong></p>
              </div>
              <div className="flex gap-2.5">
                <LucideIcons.Brain size={18} className="text-[#b64b16] flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#8c6b5d] leading-relaxed">Helps them understand<br/><strong className="text-[#4a3f35]">their brain fatigue</strong></p>
              </div>
              <div className="flex gap-2.5">
                <LucideIcons.Heart size={18} className="text-[#b64b16] flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#8c6b5d] leading-relaxed">You're helping them<br/><strong className="text-[#4a3f35]">feel like themselves again</strong></p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="md:w-1/2 flex flex-col relative pt-4 md:pt-0">
            <h3 className="font-bold tracking-widest uppercase text-[12px] text-[#92360b] mb-2">Your Snapshot Preview</h3>
            <p className="text-[#8c6b5d] text-[13px] mb-8">This is what your friends will see.</p>
            
            {/* Mini Snapshot Card */}
            <div className="bg-[#fffaf5] border-2 border-[#f4ece3] rounded-[24px] p-6 shadow-xl shadow-orange-900/5 max-w-[340px] w-full relative overflow-hidden flex flex-col z-10 mx-auto md:mx-0">
              <div className="flex items-center gap-1.5 text-[#b64b16] font-black text-[11px] tracking-[0.2em] mb-5">
                <LucideIcons.ArrowDownCircle size={16} strokeWidth={2.5} />
                RESTORA
              </div>
              <p className="text-[9px] font-bold tracking-[0.15em] text-[#8c6b5d] mb-1.5 uppercase">
                Focus Snapshot
              </p>
              <h2 className="text-[#92360b] text-[20px] font-bold leading-[1.1] mb-5 w-[70%]">
                {headline}
              </h2>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-[11px] font-bold w-fit mb-4">
                <span>{sev.emoji}</span>
                <span>{sev.label}</span>
              </div>
              <img src={tiredBrainImg} className="absolute -right-6 -bottom-2 w-32 opacity-90 object-contain drop-shadow-md" alt="Preview Mascot" />
              
              <div className="flex justify-between items-center text-[#a0938b] text-[10px] mt-8 font-bold">
                <span>restora.app</span>
                <span>#RestoraFocus</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
