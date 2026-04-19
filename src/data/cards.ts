import { TarotCard } from '../types';

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: '0',
    name: 'The Fool',
    arcana: 'Major',
    suit: 'None',
    number: 0,
    keywords: ['New beginnings', 'Innocence', 'Spontaneity', 'Free spirit'],
    description: 'The beginning of a journey. A leap of faith into the unknown.',
    upright: 'A new adventure is calling. Trust your intuition and take that leap of faith.',
    reversed: 'Be careful of recklessness. You may be overlooking important details in your haste.',
    image: 'https://picsum.photos/seed/tarot0/400/600'
  },
  {
    id: '1',
    name: 'The Magician',
    arcana: 'Major',
    suit: 'None',
    number: 1,
    keywords: ['Manifestation', 'Resourcefulness', 'Power', 'Inspired action'],
    description: 'The master of all elements, transforming thought into reality.',
    upright: 'You have all the tools you need to succeed. Now is the time for focused action.',
    reversed: 'Manipulation or untapped talent. You might be misusing your skills or lacking focus.',
    image: 'https://picsum.photos/seed/tarot1/400/600'
  },
  {
    id: '2',
    name: 'The High Priestess',
    arcana: 'Major',
    suit: 'None',
    number: 2,
    keywords: ['Intuition', 'Sacred knowledge', 'Divine feminine', 'The subconscious'],
    description: 'The keeper of secrets, standing between the veil of the worlds.',
    upright: 'Look within for answers. Your intuition is your strongest guide right now.',
    reversed: 'Secrets being revealed or disconnected from your inner self. Listen to your gut.',
    image: 'https://picsum.photos/seed/tarot2/400/600'
  },
  {
    id: '3',
    name: 'The Empress',
    arcana: 'Major',
    suit: 'None',
    number: 3,
    keywords: ['Femininity', 'Beauty', 'Nature', 'Abundance'],
    description: 'The mother archetype, representing creation and nurturing.',
    upright: 'Creativity and abundance are flowing. Nurture your projects and yourself.',
    reversed: 'Creative block or dependence. You may be over-nurturing others at your own expense.',
    image: 'https://picsum.photos/seed/tarot3/400/600'
  },
  {
    id: '4',
    name: 'The Emperor',
    arcana: 'Major',
    suit: 'None',
    number: 4,
    keywords: ['Authority', 'Structure', 'Control', 'Fatherhood'],
    description: 'The ruler and builder, creating order out of chaos.',
    upright: 'Establish structure and leadership. Your discipline will lead to stability.',
    reversed: 'Tyranny or lack of discipline. You might be too rigid or struggling with authority.',
    image: 'https://picsum.photos/seed/tarot4/400/600'
  },
  {
    id: '5',
    name: 'The Hierophant',
    arcana: 'Major',
    suit: 'None',
    number: 5,
    keywords: ['Spiritual wisdom', 'Tradition', 'Conformity', 'Institution'],
    description: 'The teacher of traditional wisdom and spiritual paths.',
    upright: 'Seek guidance from tradition or a mentor. It is a time for learning and ritual.',
    reversed: 'Personal beliefs or rebellion. You are questioning tradition and finding your own path.',
    image: 'https://picsum.photos/seed/tarot5/400/600'
  },
  {
    id: '6',
    name: 'The Lovers',
    arcana: 'Major',
    suit: 'None',
    number: 6,
    keywords: ['Love', 'Harmony', 'Relationships', 'Choices'],
    description: 'A deep connection and a significant choice based on values.',
    upright: 'Alignment in values and relationships. A big choice is coming from the heart.',
    reversed: 'Disharmony or misalignment. Re-evaluate your values and connections.',
    image: 'https://picsum.photos/seed/tarot6/400/600'
  },
  {
    id: '7',
    name: 'The Chariot',
    arcana: 'Major',
    suit: 'None',
    number: 7,
    keywords: ['Willpower', 'Victory', 'Determination', 'Discipline'],
    description: 'Overcoming obstacles through sheer force of will.',
    upright: 'Charge forward with confidence. Victory is yours if you maintain control.',
    reversed: 'Lack of direction or aggression. You might be losing control or facing roadblocks.',
    image: 'https://picsum.photos/seed/tarot7/400/600'
  },
  {
    id: '8',
    name: 'Strength',
    arcana: 'Major',
    suit: 'None',
    number: 8,
    keywords: ['Strength', 'Courage', 'Persuasion', 'Influence'],
    description: 'Taming the beast within through compassion and inner power.',
    upright: 'Inherent power and resilience. Face your fears with a gentle but firm spirit.',
    reversed: 'Self-doubt or weakness. You might be letting fear or impulse take the lead.',
    image: 'https://picsum.photos/seed/tarot8/400/600'
  },
  {
    id: '9',
    name: 'The Hermit',
    arcana: 'Major',
    suit: 'None',
    number: 9,
    keywords: ['Soul-searching', 'Introspection', 'Being alone', 'Inner guidance'],
    description: 'Seeking the light of knowledge within oneself.',
    upright: 'Take time for solitude and self-reflection. The answers are inside you.',
    reversed: 'Isolation or withdrawal. You may be hiding from the world too much or feeling lonely.',
    image: 'https://picsum.photos/seed/tarot9/400/600'
  },
  {
    id: '10',
    name: 'Wheel of Fortune',
    arcana: 'Major',
    suit: 'None',
    number: 10,
    keywords: ['Good luck', 'Karma', 'Life cycles', 'Destiny'],
    description: 'The ever-turning wheel of life, bringing change and new phases.',
    upright: 'A turning point is here. Trust the cycles of life; good luck is on its way.',
    reversed: 'Bad luck or resistance to change. Expect the unexpected and go with the flow.',
    image: 'https://picsum.photos/seed/tarot10/400/600'
  },
  {
    id: '11',
    name: 'Justice',
    arcana: 'Major',
    suit: 'None',
    number: 11,
    keywords: ['Justice', 'Fairness', 'Truth', 'Cause and effect'],
    description: 'The balance of truth and legal matters.',
    upright: 'Fairness will prevail. Be honest with yourself and others; accountability matters.',
    reversed: 'Unfairness or dishonesty. You might be avoiding responsibility or facing bias.',
    image: 'https://picsum.photos/seed/tarot11/400/600'
  },
  {
    id: '12',
    name: 'The Hanged Man',
    arcana: 'Major',
    suit: 'None',
    number: 12,
    keywords: ['Pause', 'Surrender', 'Letting go', 'New perspectives'],
    description: 'Voluntary sacrifice to gain a higher understanding.',
    upright: 'Suspend action and look at things from a new angle. Surrender to the process.',
    reversed: 'Stalling or resistance. You are avoiding a necessary pause or stuck in limbo.',
    image: 'https://picsum.photos/seed/tarot12/400/600'
  },
  {
    id: '13',
    name: 'Death',
    arcana: 'Major',
    suit: 'None',
    number: 13,
    keywords: ['Endings', 'Change', 'Transformation', 'Transition'],
    description: 'The end of a major phase, clearing the way for new life.',
    upright: 'Welcome the transformation. Let go of the old to make room for the new.',
    reversed: 'Resistance to change or stagnation. You are clinging to what no longer serves you.',
    image: 'https://picsum.photos/seed/tarot13/400/600'
  },
  {
    id: '14',
    name: 'Temperance',
    arcana: 'Major',
    suit: 'None',
    number: 14,
    keywords: ['Balance', 'Moderation', 'Patience', 'Purpose'],
    description: 'The alchemy of the self, finding the middle ground.',
    upright: 'Find balance and moderation. Patience and calm will bring peace.',
    reversed: 'Imbalance or excess. You may be overindulging or losing focus on your goals.',
    image: 'https://picsum.photos/seed/tarot14/400/600'
  },
  {
    id: '15',
    name: 'The Devil',
    arcana: 'Major',
    suit: 'None',
    number: 15,
    keywords: ['Shadow self', 'Attachment', 'Addiction', 'Restriction'],
    description: 'The bonds that tie us to the material world and our own shadows.',
    upright: 'Be aware of unhealthy attachments or habits. You have the power to break free.',
    reversed: 'Releasing limiting beliefs or detachment. You are breaking free from old chains.',
    image: 'https://picsum.photos/seed/tarot15/400/600'
  },
  {
    id: '16',
    name: 'The Tower',
    arcana: 'Major',
    suit: 'None',
    number: 16,
    keywords: ['Sudden change', 'Upheaval', 'Chaos', 'Revelation'],
    description: 'A sudden collapse of structures built on false foundations.',
    upright: 'A sudden shift is coming. It may be jarring, but it clears the way for truth.',
    reversed: 'Avoiding disaster or fear of change. You are delaying a necessary breakdown.',
    image: 'https://picsum.photos/seed/tarot16/400/600'
  },
  {
    id: '17',
    name: 'The Star',
    arcana: 'Major',
    suit: 'None',
    number: 17,
    keywords: ['Hope', 'Faith', 'Purpose', 'Renewal'],
    description: 'A glimmer of light in the darkness, bringing healing and hope.',
    upright: 'Have faith in the future. Healing and inspiration are available to you now.',
    reversed: 'Lack of faith or despair. You may be feeling disconnected from your purpose.',
    image: 'https://picsum.photos/seed/tarot17/400/600'
  },
  {
    id: '18',
    name: 'The Moon',
    arcana: 'Major',
    suit: 'None',
    number: 18,
    keywords: ['Illusion', 'Fear', 'Anxiety', 'Subconscious'],
    description: 'The world of shadows and dreams, where things are not as they seem.',
    upright: 'Listen to your dreams. Not all is as it appears; navigate the shadows with care.',
    reversed: 'Release of fear or confusion. The truth is starting to emerge from the darkness.',
    image: 'https://picsum.photos/seed/tarot18/400/600'
  },
  {
    id: '19',
    name: 'The Sun',
    arcana: 'Major',
    suit: 'None',
    number: 19,
    keywords: ['Positivity', 'Fun', 'Warmth', 'Success'],
    description: 'Radiant success, joy, and clarity.',
    upright: 'Success and happiness are yours. Celebrate the joy and clarity in your life.',
    reversed: 'Lack of enthusiasm or temporary sadness. The sun is still there, just behind a cloud.',
    image: 'https://picsum.photos/seed/tarot19/400/600'
  },
  {
    id: '20',
    name: 'Judgement',
    arcana: 'Major',
    suit: 'None',
    number: 20,
    keywords: ['Judgement', 'Rebirth', 'Inner calling', 'Absolution'],
    description: 'A final decision or a spiritual awakening.',
    upright: 'A time for reflection and absolution. Listen to your higher calling.',
    reversed: 'Self-doubt or inner critic. You are judging yourself too harshly or ignoring your call.',
    image: 'https://picsum.photos/seed/tarot20/400/600'
  },
  {
    id: '21',
    name: 'The World',
    arcana: 'Major',
    suit: 'None',
    number: 21,
    keywords: ['Completion', 'Integration', 'Accomplishment', 'Travel'],
    description: 'The end of a long journey, successfully integrated.',
    upright: 'You have reached a significant milestone. Celebrate your wholeness and success.',
    reversed: 'Lack of closure or short-cuts. You are close to completion but missing a final piece.',
    image: 'https://picsum.photos/seed/tarot21/400/600'
  }
];

export const MINOR_ARCANA_SAMPLES: TarotCard[] = [
  // Cups
  {
    id: 'c1',
    name: 'Ace of Cups',
    arcana: 'Minor',
    suit: 'Cups',
    number: 1,
    keywords: ['Love', 'New feelings', 'Spirituality', 'Intuition'],
    description: 'Total emotional abundance and the overflow of the heart.',
    upright: 'A new emotional beginning. Love, joy, and compassion are overflowing.',
    reversed: 'Self-love or repressed emotions. You may be ignoring your emotional needs.',
    image: 'https://picsum.photos/seed/tarotc1/400/600'
  },
  // Wands
  {
    id: 'w1',
    name: 'Ace of Wands',
    arcana: 'Minor',
    suit: 'Wands',
    number: 1,
    keywords: ['Inspiration', 'New opportunities', 'Growth', 'Potential'],
    description: 'A burst of creative energy and passion.',
    upright: 'A new spark of inspiration. Seize the opportunity and follow your passion.',
    reversed: 'Lack of direction or delays. You have the idea but lack the energy to start.',
    image: 'https://picsum.photos/seed/tarotw1/400/600'
  },
  // Swords
  {
    id: 's1',
    name: 'Ace of Swords',
    arcana: 'Minor',
    suit: 'Swords',
    number: 1,
    keywords: ['Breakthrough', 'Clarity', 'Sharp mind', 'Success'],
    description: 'A moment of absolute mental clarity and decisive victory.',
    upright: 'A mental breakthrough. Use your intellect and logic to cut through confusion.',
    reversed: 'Confusion or chaos. Your thoughts may be clouded, or you are acting on impulse.',
    image: 'https://picsum.photos/seed/tarots1/400/600'
  },
  // Pentacles
  {
    id: 'p1',
    name: 'Ace of Pentacles',
    arcana: 'Minor',
    suit: 'Pentacles',
    number: 1,
    keywords: ['Prosperity', 'New venture', 'Security', 'Manifestation'],
    description: 'A gift of material abundance or a new financial opportunity.',
    upright: 'A new financial or physical beginning. Abundance and security are within reach.',
    reversed: 'Missed opportunity or insecurity. You may be focusing too much on lack.',
    image: 'https://picsum.photos/seed/tarotp1/400/600'
  }
];

export const TAROT_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA_SAMPLES];
