export interface Leader {
  id: string;
  name: string;
  country: string;
  avatar: string;
  position: number;
  previousPosition: number;
  approvalRating: number;
  keyAchievements: string[];
  recentPolicies: string;
}

export const leaders: Leader[] = [
  {
    id: '1',
    name: 'Nana Akufo-Addo',
    country: 'Ghana',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ghana',
    position: 1,
    previousPosition: 2,
    approvalRating: 72,
    keyAchievements: [
      'Free Secondary Education Initiative',
      'Digital Infrastructure Development',
      'Economic Stability Measures'
    ],
    recentPolicies: 'Implementation of AfCFTA headquarters agreement'
  },
  {
    id: '2',
    name: 'Paul Kagame',
    country: 'Rwanda',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rwanda',
    position: 2,
    previousPosition: 1,
    approvalRating: 71,
    keyAchievements: [
      'Digital Transformation',
      'Environmental Protection',
      'Economic Growth'
    ],
    recentPolicies: 'Green growth and climate resilience strategy'
  },
  {
    id: '3',
    name: 'Samia Suluhu Hassan',
    country: 'Tanzania',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanzania',
    position: 3,
    previousPosition: 4,
    approvalRating: 68,
    keyAchievements: [
      'COVID-19 Response Reform',
      'Press Freedom Improvements',
      'Foreign Investment Growth'
    ],
    recentPolicies: 'Tourism sector revival program'
  }
];