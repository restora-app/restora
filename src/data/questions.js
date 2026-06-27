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
    icon: 'auto_stories',
    text: "I reread the same sentence multiple times because I can't focus.",
  },
  {
    id: 'q2',
    icon: 'psychology_alt',
    text: "I feel decision fatigue by midday even after a full night's sleep.",
  },
  {
    id: 'q3',
    icon: 'restaurant_menu',
    text: "I avoid making small choices (what to eat, wear) because I'm mentally tapped out.",
  },
  {
    id: 'q4',
    icon: 'cloud',
    text: "My brain feels 'foggy' or physically tight after long stretches of screen time.",
  },
  {
    id: 'q5',
    icon: 'smart_display',
    text: "I find myself scrolling mindlessly without remembering what I've seen.",
  },
  {
    id: 'q6',
    icon: 'bolt',
    text: 'Simple tasks feel like they require massive willpower to start.',
  },
];

export default questions;
