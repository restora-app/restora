/**
 * Self-assessment question data for the cognitive fatigue survey.
 * Each object contains:
 *   - id: unique identifier
 *   - icon: react-icons import name reference
 *   - text: the statement participants can relate to
 */
const questions = [
  {
    id: 'q1',
    category: 'Reading Focus',
    icon: 'auto_stories',
    text: "I reread the same sentence multiple times because I can't focus.",
    quote: "There are no right or wrong answers. Just be honest with yourself.",
  },
  {
    id: 'q5',
    category: 'Reading Focus',
    icon: 'smart_display',
    text: "I find myself scrolling mindlessly without remembering what I've seen.",
    quote: "Mindless scrolling is a common symptom of fatigue.",
  },
  {
    id: 'q2',
    category: 'Mental Ability',
    icon: 'psychology_alt',
    text: "I feel decision fatigue by midday even after a full night's sleep.",
    quote: "Decision fatigue is a real thing. Your answers will help us understand.",
  },
  {
    id: 'q4',
    category: 'Mental Ability',
    icon: 'cloud',
    text: "My brain feels 'foggy' or physically tight after long stretches of screen time.",
    quote: "Screen fatigue affects us all differently.",
  },
  {
    id: 'q3',
    category: 'Aptitude Skills',
    icon: 'restaurant_menu',
    text: "I avoid making small choices (what to eat, wear) because I'm mentally tapped out.",
    quote: "Small choices can add up. Be as honest as possible.",
    options: [
      { label: 'Often', value: 'often' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'Rarely', value: 'rarely' },
      { label: 'Never', value: 'never' },
    ],
  },
  {
    id: 'q6',
    category: 'Aptitude Skills',
    icon: 'bolt',
    text: 'Simple tasks feel like they require massive willpower to start.',
    quote: "Willpower is a finite resource. There are no wrong answers.",
  },
];

export default questions;
