import { MdClose, MdCheckCircle, MdShare, MdContentCopy } from "react-icons/md";
import { Users, Clock, Brain, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";

export default function ResultTeaser({
  name,
  contactMethod,
  contactValue,
  scoreResult,
  referralCode,
  alreadyWaitlisted,
}) {
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (scoreResult) {
      trackEvent("Result Viewed", {
        overall_score: scoreResult.overall,
        dominant_dimension: scoreResult.dominantDimension,
        severity: scoreResult.severity,
      });
    }
  }, [scoreResult]);

  if (!scoreResult) return null;

  const { severity } = scoreResult;

  const handleCopyLink = async () => {
    const shareUrl = referralCode 
      ? `${window.location.origin}?ref=${referralCode}`
      : window.location.origin;
    const shareText = `I just took a 60-second cognitive fatigue assessment — turns out my brain's been running on fumes. Take it here: ${shareUrl}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Restora — Cognitive Fatigue Assessment",
          text: shareText,
          url: shareUrl,
        });
        trackEvent("Result Shared", {
          method: "native_share",
          severity: severity,
        });
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setLinkCopied(true);
      trackEvent("Result Shared", {
        method: "clipboard_copy",
        severity: severity,
      });
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setLinkCopied(true);
      trackEvent("Result Shared", {
        method: "fallback_copy",
        severity: severity,
      });
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  const handleSeeMore = () => {
    navigate("/result", {
      state: { scoreResult, name, contactMethod, contactValue },
    });
  };

  const handleClose = () => {
    window.location.reload(); // Quick way to reset the survey
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 animate-fade-in">
      <div className="relative flex flex-col gap-8 md:gap-10 bg-[#fffaf5] shadow-2xl p-6 md:p-10 rounded-[32px] w-full max-w-[420px] md:max-w-[850px] max-h-[90vh] text-center md:text-left animate-fade-in-up overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="top-5 right-5 z-10 absolute text-[#8c6b5d] hover:text-primary transition-colors"
        >
          <MdClose size={24} />
        </button>

        {/* Success Message Area */}
        <div className="flex flex-col justify-center items-center px-4 py-6 md:py-10 w-full text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 shadow-sm mb-8 px-5 py-2 border border-green-300 rounded-full font-bold text-base text-green-800 animate-fade-in">
            <MdCheckCircle size={22} className="text-green-600" />
            {alreadyWaitlisted ? "Already on the waitlist" : "Waitlist spot confirmed"}
          </div>

          <h2 className="mb-5 font-bold text-[#92360b] text-3xl md:text-4xl">
            {alreadyWaitlisted ? "You're already on the list!" : "You're on the list!"}
          </h2>
          <p className="max-w-sm font-medium text-[#4a3f35] text-lg leading-relaxed">
            We'll notify you as soon as Restora is ready for you. Hang tight!
          </p>
        </div>

        {/* Bottom Share Section */}
        <div className="flex flex-col items-center bg-[#fffaf5] md:p-8 pt-8 border-[#f4ece3] md:border-2 border-t md:border-t-0 rounded-none md:rounded-[24px] w-full w-full text-center">
          <div className="flex justify-center items-center gap-2.5 mb-4 text-[#92360b]">
            <Users size={24} />
            <h3 className="font-bold text-[12px] md:text-[13px] uppercase tracking-widest">
              Know someone running on empty?
            </h3>
          </div>
          <p className="mb-6 max-w-md font-medium text-[#4a3f35] text-[15px] md:text-[16px]">
            Share your Focus Snapshot and help them take the first step toward
            feeling better.
          </p>

          <button
            onClick={handleCopyLink}
            className="flex justify-center items-center gap-2 bg-[#b64b16] hover:bg-[#92360b] shadow-lg shadow-orange-900/10 mb-8 py-4 rounded-full w-full max-w-[320px] font-bold text-base text-white transition-colors"
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
                Share with friends
              </>
            )}
          </button>

          <div className="flex sm:flex-row flex-col justify-center items-center sm:items-start gap-6 sm:gap-10 px-4 pt-6 border-[#f4ece3] border-t w-full">
            <div className="flex items-center sm:items-start gap-3 max-w-[180px] text-left">
              <Clock
                size={22}
                className="flex-shrink-0 mt-0.5 text-[#b64b16]"
              />
              <p className="text-[#8c6b5d] text-[12px] leading-relaxed">
                Takes just
                <br />
                <strong className="text-[#4a3f35]">60 seconds</strong>
              </p>
            </div>
            <div className="sm:block hidden bg-[#f4ece3] w-[1px] h-10" />
            {/* <div className="flex items-center sm:items-start gap-3 max-w-[200px] text-left">
              <Brain
                size={22}
                className="flex-shrink-0 mt-0.5 text-[#b64b16]"
              />
              <p className="text-[#8c6b5d] text-[12px] leading-relaxed">
                Helps them understand
                <br />
                <strong className="text-[#4a3f35]">their brain fatigue</strong>
              </p>
            </div> */}
            <div className="sm:block hidden bg-[#f4ece3] w-[1px] h-10" />
            <div className="flex items-center sm:items-start gap-3 max-w-[200px] text-left">
              <Heart
                size={22}
                className="flex-shrink-0 mt-0.5 text-[#b64b16]"
              />
              <p className="text-[#8c6b5d] text-[12px] leading-relaxed">
                You're helping them
                <br />
                <strong className="text-[#4a3f35]">
                  feel like themselves again
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
