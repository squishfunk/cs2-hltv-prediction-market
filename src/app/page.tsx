'use client';

import { useEffect, useState } from 'react';
import type { Match } from '@/services/hltv';
import { getUpcomingMatches } from '@/services/hltv';
import { MatchCard } from '@/components/MatchCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ServerCrash } from 'lucide-react';

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        setError(null);
        const upcomingMatches = await getUpcomingMatches();
        // Filter for matches in the next 7 days (already handled in service, but good to double check or adjust here)
        setMatches(upcomingMatches);
      } catch (err) {
        console.error('Failed to fetch matches:', err);
        setError('Failed to load match data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner size={48} />
        <p className="mt-4 text-muted-foreground">Loading matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <ServerCrash className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground tracking-tight">Upcoming CS2 Matches</h1>
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No upcoming matches found in the next week.</p>
        </div>
      )}
    </div>
  );
}
