import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "../QuestionCard/QuestionCard";
import supabase from "../../lib/supabase";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdSend,
  MdCheckCircle,
  MdErrorOutline,
  MdArrowForward,
  MdArrowBack,
  MdAccessTime,
  MdSpa,
  MdAutoStories,
  MdPsychologyAlt,
  MdRestaurantMenu,
  MdCloud,
  MdSmartDisplay,
  MdBolt,
} from "react-icons/md";

const iconMap = {
  auto_stories: MdAutoStories,
  psychology_alt: MdPsychologyAlt,
  restaurant_menu: MdRestaurantMenu,
  cloud: MdCloud,
  smart_display: MdSmartDisplay,
  bolt: MdBolt,
};

/**
 * Step-by-step questionnaire form section.
 * Step 0: Personal info
 * Step 1..N: Questions
 */
export default function SurveySection({ questions = [] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState(""); // '' | 'email' | 'mobile'
  const [contactValue, setContactValue] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totalSteps = questions.length + 1; // 1 for personal info

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const isPersonalInfoValid =
    name.trim() !== "" && contactMethod !== "" && contactValue.trim() !== "";

  const handleNext = () => {
    if (currentStep === 0 && !isPersonalInfoValid) return;
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const answeredCount = Object.keys(answers).length;
  // Let's stick with a minimum number of required questions, e.g. 3,
  // or require all questions if it's step-by-step. Let's stick to 3 like the original.
  const minRequired = Math.min(3, questions.length);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!isPersonalInfoValid) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { error } = await supabase.from("survey_responses").insert([
        {
          name: name.trim(),
          contact_method: contactMethod,
          contact_value: contactValue.trim(),
          answers: answers,
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      console.error("Supabase insert error:", err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="mx-auto px-gutter py-xl max-w-[800px]">
        <div className="p-xl border-2 border-secondary/30 rounded-xl text-center animate-fade-in-up glass-panel">
          <div className="bg-secondary-fixed flex justify-center items-center mx-auto mb-md rounded-full w-20 h-20 animate-gentle-bounce">
            <MdCheckCircle size={40} className="text-primary" />
          </div>
          <h2 className="mb-sm text-headline-lg text-primary">
            Thank You, {name}!
          </h2>
          <p className="mx-auto mb-md max-w-md text-body-lg text-on-surface-variant">
            Your response has been recorded successfully. We'll reach out via{" "}
            <span className="font-semibold text-secondary">
              {contactMethod === "email" ? "email" : "mobile"}
            </span>{" "}
            at{" "}
            <span className="font-semibold text-primary">{contactValue}</span>{" "}
            with the research findings.
          </p>
          <div className="inline-block bg-primary-fixed/50 text-on-primary-fixed px-md py-sm rounded-full text-label-md">
            🧠 Your contribution matters to science
          </div>
        </div>
      </section>
    );
  }

  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  // Figure out if we can go to next based on step
  let canGoNext = false;
  if (currentStep === 0) {
    canGoNext = isPersonalInfoValid;
  } else {
    const currentQuestion = questions[currentStep - 1];
    canGoNext =
      answers[currentQuestion?.id] !== undefined &&
      answers[currentQuestion?.id] !== null;
  }

  return (
    <section
      id="survey-anchor"
      className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] mx-auto px-gutter py-2 max-w-[800px]"
    >
      {/* Progress Indicator */}
      <div className="flex flex-col items-center mb-md w-full">
        <div className="mb-sm font-semibold text-body-md text-on-surface">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div className="relative bg-[#f4ece3] mb-3 rounded-full w-full max-w-md h-2 overflow-hidden">
          <div
            className="top-0 bottom-0 left-0 absolute bg-[#b64b16] rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: "var(--color-primary, #b64b16)",
            }}
          />
        </div>
        <div className="flex items-center gap-1 font-medium text-on-surface-variant text-sm">
          <MdAccessTime size={16} />
          <span>
            About {Math.max(1, Math.ceil((totalSteps - currentStep) * 0.25))}{" "}
            minutes to go
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-[600px] bg-surface shadow-md p-5 md:p-8 border-[#f4ece3] border-2 rounded-3xl glass-panel">
        <AnimatePresence mode="wait">
          {/* Step 0: Personal Info */}
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } }}
              className="text-center flex flex-col w-full"
            >
            <div className="flex justify-center items-center bg-[#f4ece3] mx-auto mb-sm rounded-full w-12 h-12">
              <MdPerson size={24} className="text-[#6d4c41]" />
            </div>
            <h2
              className="mb-xs font-bold text-headline-md text-primary"
              style={{ color: "var(--color-primary, #b64b16)" }}
            >
              Tell us about yourself
            </h2>
            <p className="mb-md text-body-md text-on-surface-variant">
              This helps us personalize your focus assessment.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className="flex flex-col gap-md text-left"
            >
              {/* Name Field */}
              <div className="group">
                <label
                  htmlFor="participant-name"
                  className="block mb-xs font-bold text-label-md text-on-surface-variant"
                >
                  Full Name <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <MdPerson
                    size={20}
                    className="top-1/2 left-4 absolute text-outline group-focus-within:text-primary transition-colors -translate-y-1/2"
                  />
                  <input
                    id="participant-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-[#fcfaf8] py-3 pr-4 pl-12 border-[#f4ece3] border-2 hover:border-outline focus:border-primary rounded-xl w-full text-body-md text-on-surface placeholder:text-outline/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block mb-sm font-bold text-label-md text-on-surface-variant">
                  Preferred Contact Method <span className="text-error">*</span>
                </label>
                <div className="flex gap-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setContactMethod("email");
                      setContactValue("");
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-md rounded-xl font-semibold text-sm transition-all duration-300 border-2
                      ${
                        contactMethod === "email"
                          ? "bg-primary/10 text-primary border-primary bloom-shadow-primary scale-[1.02]"
                          : "bg-[#fcfaf8] text-on-surface-variant border-[#f4ece3] hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01]"
                      }`}
                  >
                    <MdEmail size={20} />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setContactMethod("mobile");
                      setContactValue("");
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-md rounded-xl font-semibold text-sm transition-all duration-300 border-2
                      ${
                        contactMethod === "mobile"
                          ? "bg-primary/10 text-primary border-primary bloom-shadow-primary scale-[1.02]"
                          : "bg-[#fcfaf8] text-on-surface-variant border-[#f4ece3] hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01]"
                      }`}
                  >
                    <MdPhone size={20} />
                    Mobile
                  </button>
                </div>
              </div>

              {/* Conditional Contact Input */}
              {contactMethod && (
                <div
                  className="group animate-fade-in-up"
                  style={{ animationDuration: "0.4s" }}
                >
                  <label
                    htmlFor="contact-value"
                    className="block mb-xs font-bold text-label-md text-on-surface-variant"
                  >
                    {contactMethod === "email"
                      ? "Email Address"
                      : "Mobile Number"}{" "}
                    <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    {contactMethod === "email" ? (
                      <MdEmail
                        size={20}
                        className="top-1/2 left-4 absolute text-outline group-focus-within:text-primary -translate-y-1/2"
                      />
                    ) : (
                      <MdPhone
                        size={20}
                        className="top-1/2 left-4 absolute text-outline group-focus-within:text-primary -translate-y-1/2"
                      />
                    )}
                    <input
                      id="contact-value"
                      type={contactMethod === "email" ? "email" : "tel"}
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={
                        contactMethod === "email"
                          ? "you@example.com"
                          : "+91 98765 43210"
                      }
                      className="bg-[#fcfaf8] py-3 pr-4 pl-12 border-[#f4ece3] border-2 hover:border-outline focus:border-primary rounded-xl w-full text-body-md text-on-surface placeholder:text-outline/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!isPersonalInfoValid}
                className={`mt-6 w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-lg transition-all duration-300
                  ${
                    isPersonalInfoValid
                      ? "bg-primary text-white hover:scale-[1.02] hover:shadow-lg bloom-shadow-primary cursor-pointer"
                      : "bg-surface-container-high text-outline cursor-not-allowed"
                  }`}
                style={
                  isPersonalInfoValid
                    ? { backgroundColor: "var(--color-primary, #b64b16)" }
                    : {}
                }
              >
                Continue <MdArrowForward size={20} />
              </button>
            </form>
          </motion.div>
        )}

          {/* Step 1..N: Questions */}
          {currentStep > 0 && (() => {
            const currentQuestion = questions[currentStep - 1];
            const categoryQuestions = questions.filter((q) => q.category === currentQuestion.category);
            const indexInCategory = categoryQuestions.findIndex((q) => q.id === currentQuestion.id) + 1;
            const IconComponent = iconMap[currentQuestion.icon];

            return (
              <motion.div
                key={`step${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } }}
                className="flex flex-col w-full"
              >
              
              {/* Header */}
              <div className="flex justify-center items-center relative mb-4 w-full">
                <button
                  type="button"
                  onClick={handleBack}
                  className="absolute left-0 top-0 text-on-surface-variant font-medium flex items-center gap-1 hover:text-primary transition-colors text-sm"
                >
                  <MdArrowBack size={18} /> Previous
                </button>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#fcece4] rounded-full flex items-center justify-center mb-2 text-[#b64b16]">
                    {IconComponent && <IconComponent size={28} />}
                  </div>
                  <h2 className="text-lg font-bold text-[#b64b16]">
                    {currentQuestion.category}
                  </h2>
                  <span className="text-xs font-medium text-on-surface-variant mt-1">
                    Question {indexInCategory} of {categoryQuestions.length}
                  </span>
                  <div className="w-8 h-[2px] bg-[#f3d9cd] rounded-full mt-2"></div>
                </div>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="flex items-center gap-3 bg-error-container mb-lg p-sm rounded-lg text-on-error-container animate-fade-in-up">
                  <MdErrorOutline
                    size={20}
                    className="flex-shrink-0 text-error"
                  />
                  <p className="flex-1 text-sm">{submitError}</p>
                </div>
              )}

              {/* QuestionCard */}
              <div className="flex justify-center items-center mb-4 w-full flex-1">
                <QuestionCard
                  key={currentQuestion.id}
                  text={currentQuestion.text}
                  answer={answers[currentQuestion.id]}
                  options={currentQuestion.options}
                  onAnswer={(ans) => {
                    handleAnswer(currentQuestion.id, ans);
                    // Auto-advance after a short delay
                    if (ans && currentStep < totalSteps - 1) {
                      setTimeout(() => {
                        setCurrentStep((prev) => prev + 1);
                      }, 400);
                    }
                  }}
                />
              </div>

              {/* Submit Button (Only on last question) */}
              {currentStep === totalSteps - 1 && (
                <div className="flex flex-col items-center mt-4 mb-8">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || answeredCount < minRequired}
                    className={`py-3 px-10 rounded-full font-bold transition-all duration-300 flex items-center gap-2
                      ${
                        !isSubmitting && answeredCount >= minRequired
                          ? "bg-primary text-white hover:scale-105 hover:shadow-lg bloom-shadow-primary cursor-pointer"
                          : "bg-surface-container-high text-outline cursor-not-allowed"
                      }`}
                    style={
                      !isSubmitting && answeredCount >= minRequired
                        ? { backgroundColor: "var(--color-primary, #b64b16)" }
                        : {}
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <span className="border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit <MdSend size={20} />
                      </>
                    )}
                  </button>
                  {answeredCount < minRequired && (
                    <p className="mt-4 text-center text-error text-sm animate-fade-in-up">
                      Please answer at least {minRequired} questions to submit.
                    </p>
                  )}
                </div>
              )}

              {/* Footer Quote */}
              <div className="mt-2 text-center flex flex-col items-center justify-end">
                <MdSpa size={24} className="text-[#f3d9cd] mb-1" />
                <p className="text-xs font-medium text-on-surface-variant max-w-xs mx-auto">
                  {currentQuestion.quote}
                </p>
              </div>

              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
