import { Spread } from '../types';

export const SPREADS: Spread[] = [
  {
    id: 'daily',
    name: 'Daily Pull',
    description: 'A single card for guidance on the energy of your day.',
    cardCount: 1,
    positions: ['Daily Guidance'],
    positionMeanings: ['The core energy or lesson for your day.'],
    isPremium: false
  },
  {
    id: 'three-card',
    name: 'Past, Present, Future',
    description: 'Understand the timeline of your current situation.',
    cardCount: 3,
    positions: ['Past', 'Present', 'Future'],
    positionMeanings: [
      'The energies that led to the current moment.',
      'Where you stand right now.',
      'The path where things are currently heading.'
    ],
    isPremium: false
  },
  {
    id: 'love',
    name: 'Love & Relationships',
    description: 'Deep insights into your heart and connections.',
    cardCount: 3,
    positions: ['You', 'Potential Connection', 'The Path Forward'],
    positionMeanings: [
      'Your current emotional state and desires.',
      'The energy of the other person or your potential together.',
      'How to nurture or navigate the relationship.'
    ],
    isPremium: false
  },
  {
    id: 'career',
    name: 'Career & Path',
    description: 'Guidance on professional growth and ambition.',
    cardCount: 3,
    positions: ['Current Work', 'Blockages', 'Opportunities'],
    positionMeanings: [
      'Your current standing in your professional life.',
      'What is holding you back from your potential.',
      'The next big opportunity waiting for you.'
    ],
    isPremium: false
  },
  {
    id: 'decision',
    name: 'Decision Maker',
    description: 'Help choosing between two paths.',
    cardCount: 3,
    positions: ['The Situation', 'Path A', 'Path B'],
    positionMeanings: [
      'The context of the choice you face.',
      'The outcome or energy of the first option.',
      'The outcome or energy of the second option.'
    ],
    isPremium: false
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'The classic 10-card spread for comprehensive insight.',
    cardCount: 10,
    positions: [
      'The Present', 'The Challenge', 'The Past', 'The Future',
      'The Goal', 'The Subconscious', 'Your Influence',
      'Others Influence', 'Hopes & Fears', 'Final Outcome'
    ],
    positionMeanings: [
      'The current state of affairs.',
      'The immediate obstacle in your way.',
      'Recent events that shaped the now.',
      'The energy coming into your life soon.',
      'What you consciously work towards.',
      'Root causes you may not be aware of.',
      'How you are affecting the situation.',
      'Environmental or social factors at play.',
      'Your internal expectations.',
      'The logical result of these combined energies.'
    ],
    isPremium: false
  }
];
