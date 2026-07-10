import { MdCheckCircle, MdContentCopy, MdShare } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { trackEvent } from "../../lib/analytics";
import {
  DIMENSION_LABELS,
  DIMENSION_INSIGHTS,
  DIMENSION_TRANSLATIONS,
  SEVERITY_HEADLINES,
  DOMINANT_RECOVERY_PROMISE,
  QUICK_ACTION_TIPS,
  getDimensionSeverity,
} from "../../lib/scoreAnswersService";

/**
 * SVG radar (pentagon) chart for 5 cognitive-fatigue dimensions.
 */
function RadarChart({ dimensions }) {
  const keys = Object.keys(DIMENSION_LABELS);
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 90;
  const levels = 4; // concentric rings

  // Convert dimension index to angle (start from top, go clockwise)
  const angle = (i) => (Math.PI * 2 * i) / keys.length - Math.PI / 2;

  const point = (i, r) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  // Grid rings
  const rings = Array.from({ length: levels }, (_, lvl) => {
    const r = (radius / levels) * (lvl + 1);
    const pts = keys.map((_, i) => point(i, r));
    return pts.map((p) => `${p.x},${p.y}`).join(" ");
  });

  // Axis lines
  const axes = keys.map((_, i) => point(i, radius));

  // Data polygon
  const dataPoints = keys.map((key, i) => {
    const score = dimensions[key] ?? 0;
    const r = (score / 100) * radius;
    return point(i, r);
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Label positions (outside the chart with enough clearance)
  const labelPoints = keys.map((key, i) => {
    const p = point(i, radius + 40);
    return { ...p, label: DIMENSION_LABELS[key] };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[360px] mx-auto" style={{ overflow: "visible" }}>
      {/* Grid rings */}
      {rings.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="#e8dacd"
          strokeWidth="0.8"
          opacity={0.5 + i * 0.12}
        />
      ))}

      {/* Axis lines */}
      {axes.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="#e8dacd"
          strokeWidth="0.8"
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={dataPolygon}
        fill="rgba(182, 75, 22, 0.15)"
        stroke="#b64b16"
        strokeWidth="2"
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#b64b16" />
      ))}

      {/* Labels */}
      {labelPoints.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-on-surface-variant"
          style={{ fontSize: "9.5px", fontWeight: 600 }}
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}

const SEVERITY_STYLES = {
  low: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    label: "Low Fatigue",
    emoji: "🟢",
  },
  moderate: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    label: "Moderate Fatigue",
    emoji: "🟡",
  },
  high: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    label: "High Fatigue",
    emoji: "🔴",
  },
};

/**
 * Results view after survey submission.
 * Receives scored data and renders personalised recovery insights.
 *
 * Structure (3-act):
 *  Act 1 — Headline insight (interpreted severity sentence + waitlist pill)
 *  Act 2 — What's driving it (dominant dimension card + radar + dimension breakdowns)
 *  Act 3 — What Restora does about it + share hook
 */
export default function ResultTeaser({
  name,
  contactMethod,
  contactValue,
  scoreResult,
}) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(true);
  const thankYouTimerRef = useRef(null);

  if (!scoreResult) return null;

  const { dimensions, overall, dominantDimension, severity } = scoreResult;
  const sev = SEVERITY_STYLES[severity] || SEVERITY_STYLES.moderate;
  const dominantLabel = DIMENSION_LABELS[dominantDimension];
  const dominantInsight = DIMENSION_INSIGHTS[dominantDimension];
  const headline = SEVERITY_HEADLINES[severity] || SEVERITY_HEADLINES.moderate;
  const recoveryPromise = DOMINANT_RECOVERY_PROMISE[dominantDimension];
  const quickTip = QUICK_ACTION_TIPS[dominantDimension];

  // Collapse thank-you after 4 seconds
  useEffect(() => {
    thankYouTimerRef.current = setTimeout(() => {
      setThankYouVisible(false);
    }, 4000);
    return () => clearTimeout(thankYouTimerRef.current);
  }, []);

  useEffect(() => {
    trackEvent("Result Viewed", {
      overall_score: overall,
      dominant_dimension: dominantDimension,
      severity: severity,
    });
  }, [overall, dominantDimension, severity]);

  const handleCopyLink = async () => {
    const shareUrl = window.location.origin;
    const shareText = `I just took a 60-second cognitive fatigue assessment — turns out my brain's been running on fumes. Take it here: ${shareUrl}`;
    try {
      // Try native share first (mobile)
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
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      setLinkCopied(true);
      trackEvent("Result Shared", {
        method: "clipboard_copy",
        severity: severity,
      });
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      // Last resort
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

  const otherDimensions = Object.entries(DIMENSION_LABELS).filter(
    ([key]) => key !== dominantDimension
  );

  const firstName = name?.split(" ")[0] || name;

  return (
    <section className="mx-auto px-gutter py-xl max-w-[800px] animate-fade-in-up">
      {/* ─── Collapsible thank-you line ─── */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          thankYouVisible ? "max-h-20 opacity-100 mb-md" : "max-h-0 opacity-0 mb-0"
        }`}
      >
        <div className="flex items-center justify-center gap-2 text-sm text-on-surface-variant">
          <MdCheckCircle size={16} className="text-green-600 flex-shrink-0" />
          <span>Response recorded for {name}</span>
        </div>
      </div>

      {/* ═══════════════ ACT 1 — The headline insight ═══════════════ */}
      <div className="text-center mb-lg">
        {/* Waitlist confirmation pill */}
        <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-md">
          <MdCheckCircle size={14} />
          Waitlist spot confirmed
        </div>

        {/* Interpreted headline — the emotional hook */}
        <h2
          className="font-bold text-headline-lg mb-xs max-w-lg mx-auto"
          style={{ color: "var(--color-primary, #b64b16)" }}
        >
          {headline}
        </h2>

        {/* Severity pill */}
        <div className="flex items-center justify-center gap-3 mt-sm">
          <div
            className={`${sev.bg} ${sev.border} border-2 rounded-full px-5 py-2 font-bold text-sm ${sev.text}`}
          >
            {sev.emoji} {sev.label} — {overall}/100
          </div>
        </div>
      </div>

      {/* ═══════════════ ACT 2 — What's driving it ═══════════════ */}

      {/* ── Dominant dimension hero card ── */}
      <div className="bg-[#fcece4] border-2 border-[#f3d9cd] rounded-2xl p-6 mb-md">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex items-center justify-center bg-[#b64b16] rounded-full w-8 h-8 flex-shrink-0 mt-0.5">
            <span className="text-white text-sm font-black">#1</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-bold text-lg text-[#b64b16]">
                {dominantLabel}
              </h3>
              <span className="font-black text-xl text-[#b64b16]">
                {dimensions[dominantDimension]}
              </span>
            </div>
            <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
              {DIMENSION_TRANSLATIONS[dominantDimension]?.[
                getDimensionSeverity(dimensions[dominantDimension])
              ] || ""}
            </p>
          </div>
        </div>

        {/* Recovery promise */}
        <div className="border-t border-[#f3d9cd] pt-4 mt-2">
          <p className="text-on-surface font-semibold text-body-md leading-relaxed">
            {recoveryPromise}
          </p>
          <p className="text-on-surface-variant text-sm mt-3 leading-relaxed italic">
            {quickTip}
          </p>
        </div>
      </div>

      {/* ── Radar chart ── */}
      <div className="glass-panel border-2 border-[#f4ece3] rounded-2xl p-6 mb-md">
        <h3 className="text-center font-bold text-on-surface mb-4 text-lg">
          Your Cognitive Profile
        </h3>
        <RadarChart dimensions={dimensions} />
      </div>

      {/* ── Other dimensions ── */}
      <div className="space-y-3 mb-lg">
        {otherDimensions.map(([key, label]) => {
          const score = dimensions[key];
          const dimSeverity = getDimensionSeverity(score);
          const translation =
            DIMENSION_TRANSLATIONS[key]?.[dimSeverity] || "";

          return (
            <div
              key={key}
              className="bg-[#fcfaf8] border-2 border-[#f4ece3] rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-on-surface">
                  {label}
                </span>
                <span className="font-black text-lg text-on-surface-variant">
                  {score}
                </span>
              </div>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                {translation}
              </p>
            </div>
          );
        })}
      </div>

      {/* ═══════════════ ACT 3 — What Restora does + share hook ═══════════════ */}

      {/* Launch promise */}
      <div className="text-center mb-md">
        <p className="text-body-md text-on-surface-variant leading-relaxed max-w-md mx-auto">
          We'll be in touch when Restora launches — you'll be first.
        </p>
      </div>

      {/* Share hook */}
      <div className="bg-[#fcfaf8] border-2 border-[#f4ece3] rounded-2xl p-6 text-center">
        <p className="text-on-surface font-semibold text-body-md mb-1">
          Know someone running on empty?
        </p>
        <p className="text-on-surface-variant text-sm mb-4">
          This takes 60 seconds.
        </p>
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg bloom-shadow-primary cursor-pointer"
          style={{ backgroundColor: "var(--color-primary, #b64b16)" }}
        >
          {linkCopied ? (
            <>
              <MdCheckCircle size={18} />
              Link copied!
            </>
          ) : (
            <>
              {typeof navigator !== "undefined" && navigator.share ? (
                <MdShare size={18} />
              ) : (
                <MdContentCopy size={18} />
              )}
              Share the assessment
            </>
          )}
        </button>
      </div>
    </section>
  );
}
