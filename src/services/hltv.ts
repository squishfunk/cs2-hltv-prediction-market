import { addDays, isWithinInterval, startOfDay } from 'date-fns';

/**
 * Represents a team competing in a match.
 */
export interface Team {
  /**
   * The name of the team.
   */
  name: string;
  /**
   * The team's logo URL.
   */
  logoUrl: string;
}

/**
 * Represents an event (tournament) in which a match takes place.
 */
export interface Event {
  /**
   * The name of the event.
   */
  name: string;
}

/**
 * Represents a CS2 match.
 */
export interface Match {
  /**
   * The match ID.
   */
  id: string;
  /**
   * The participating teams.
   */
  teams: [Team, Team];
  /**
   * The event the match belongs to.
   */
  event: Event;
  /**
   * The start time of the match in ISO format.
   */
  startTime: string;
  /**
   * URL to the match page
   */
  matchPageUrl: string;
}

// Simulate API delay
const MOCK_API_DELAY = 500; // 0.5 seconds

const mockTeams: Team[] = [
  { name: 'Astralis', logoUrl: 'https://picsum.photos/seed/Astralis/64/64' },
  { name: 'Natus Vincere', logoUrl: 'https://picsum.photos/seed/Navi/64/64' },
  { name: 'FaZe Clan', logoUrl: 'https://picsum.photos/seed/FaZe/64/64' },
  { name: 'G2 Esports', logoUrl: 'https://picsum.photos/seed/G2/64/64' },
  { name: 'Team Vitality', logoUrl: 'https://picsum.photos/seed/Vitality/64/64' },
  { name: 'MOUZ', logoUrl: 'https://picsum.photos/seed/MOUZ/64/64' },
  { name: 'Complexity', logoUrl: 'https://picsum.photos/seed/Complexity/64/64' },
  { name: 'Heroic', logoUrl: 'https://picsum.photos/seed/Heroic/64/64' },
  { name: 'Virtus.pro', logoUrl: 'https://picsum.photos/seed/VP/64/64' },
  { name: 'Team Spirit', logoUrl: 'https://picsum.photos/seed/Spirit/64/64' },
];

const mockEvents: Event[] = [
  { name: 'PGL Major Copenhagen Qualifiers' },
  { name: 'BLAST Premier Spring Groups' },
  { name: 'IEM Katowice Playoffs' },
  { name: 'ESL Pro League Season 20' },
  { name: 'DreamHack Masters Winter' },
];

const generateMockMatches = (count: number): Match[] => {
  const matches: Match[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const team1Index = Math.floor(Math.random() * mockTeams.length);
    let team2Index = Math.floor(Math.random() * mockTeams.length);
    while (team2Index === team1Index) {
      team2Index = Math.floor(Math.random() * mockTeams.length);
    }

    const eventIndex = Math.floor(Math.random() * mockEvents.length);
    const daysToAdd = Math.floor(Math.random() * 14) - 2; // Matches from 2 days ago to 12 days in future for broader testing
    const hour = Math.floor(Math.random() * 24);
    const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    
    const startTime = new Date(today);
    startTime.setDate(today.getDate() + daysToAdd);
    startTime.setHours(hour, minute, 0, 0);

    matches.push({
      id: (i + 1).toString(),
      teams: [mockTeams[team1Index], mockTeams[team2Index]],
      event: mockEvents[eventIndex],
      startTime: startTime.toISOString(),
      matchPageUrl: `https://www.hltv.org/matches/${i + 1}/mock-match-page`,
    });
  }
  return matches;
};

const allMockMatches = generateMockMatches(20);

/**
 * Asynchronously retrieves a list of upcoming CS2 matches within the next week.
 * @returns A promise that resolves to an array of Match objects.
 */
export async function getUpcomingMatches(): Promise<Match[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const today = startOfDay(new Date());
      const nextWeek = addDays(today, 7);
      const upcoming = allMockMatches.filter(match => {
        const matchDate = new Date(match.startTime);
        return isWithinInterval(matchDate, { start: today, end: nextWeek });
      });
      resolve(upcoming.sort((a,b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()));
    }, MOCK_API_DELAY);
  });
}

/**
 * Asynchronously retrieves details for a specific CS2 match.
 * @param matchId The ID of the match to retrieve.
 * @returns A promise that resolves to a Match object containing detailed match information, or null if not found.
 */
export async function getMatchDetails(matchId: string): Promise<Match | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const match = allMockMatches.find(m => m.id === matchId);
      resolve(match || null);
    }, MOCK_API_DELAY);
  });
}
