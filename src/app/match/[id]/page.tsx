'use client';

import { useEffect, useState } from 'react';
import type { Match } from '@/services/hltv';
import { getMatchDetails } from '@/services/hltv';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock, ExternalLink, ServerCrash, Tv, Users, ShieldQuestion } from 'lucide-react';
import { format } from 'date-fns';

interface MatchDetailsPageProps {
  params: {
    id: string;
  };
}

export default function MatchDetailsPage({ params }: MatchDetailsPageProps) {
  const { id } = params;
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadMatchDetails() {
      try {
        setLoading(true);
        setError(null);
        const details = await getMatchDetails(id as string);
        if (!details) {
          setError('Match not found.');
        }
        setMatch(details);
      } catch (err) {
        console.error(`Failed to fetch match details for ID ${id}:`, err);
        setError('Failed to load match details. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadMatchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner size={48} />
        <p className="mt-4 text-muted-foreground">Loading match details...</p>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Alert variant="destructive" className="max-w-md mx-auto">
          {error === 'Match not found.' ? <ShieldQuestion className="h-5 w-5" /> : <ServerCrash className="h-5 w-5" />}
          <AlertTitle>{error === 'Match not found.' ? 'Not Found' : 'Error'}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Matches
          </Link>
        </Button>
      </div>
    );
  }

  const { teams, event, startTime, matchPageUrl } = match;

  return (
    <div className="max-w-3xl mx-auto">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Matches
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-xl bg-card">
        <CardHeader className="p-6 border-b border-border">
          <CardTitle className="text-2xl font-bold text-foreground">
            {teams[0].name} vs {teams[1].name}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground flex items-center gap-1.5 mt-1">
            <Tv className="h-5 w-5" /> {event.name}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-around items-center gap-6">
            <div className="flex flex-col items-center text-center w-full sm:w-auto">
              <Image
                src={teams[0].logoUrl}
                alt={`${teams[0].name} logo`}
                width={96}
                height={96}
                className="rounded-full mb-2 object-contain"
                data-ai-hint="team logo"
              />
              <h3 className="text-xl font-semibold text-foreground">{teams[0].name}</h3>
            </div>
            <span className="text-3xl font-bold text-accent">VS</span>
            <div className="flex flex-col items-center text-center w-full sm:w-auto">
              <Image
                src={teams[1].logoUrl}
                alt={`${teams[1].name} logo`}
                width={96}
                height={96}
                className="rounded-full mb-2 object-contain"
                data-ai-hint="team logo"
              />
              <h3 className="text-xl font-semibold text-foreground">{teams[1].name}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-md">
              <CalendarDays className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{format(new Date(startTime), 'EEEE, MMMM d, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-md">
              <Clock className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium text-foreground">{format(new Date(startTime), 'p (zzzz)')}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-accent" /> Players</h4>
            <p className="text-muted-foreground">Player information and detailed scores would be displayed here if available from the API.</p>
            {/* Placeholder for player lists/scores */}
             <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-card-foreground/5">
                    <CardHeader><CardTitle className="text-sm text-center">{teams[0].name} Players</CardTitle></CardHeader>
                    <CardContent className="text-center text-xs text-muted-foreground">Player list unavailable</CardContent>
                </Card>
                 <Card className="bg-card-foreground/5">
                    <CardHeader><CardTitle className="text-sm text-center">{teams[1].name} Players</CardTitle></CardHeader>
                    <CardContent className="text-center text-xs text-muted-foreground">Player list unavailable</CardContent>
                </Card>
             </div>
          </div>

          {matchPageUrl && (
            <div className="pt-4 border-t border-border">
              <Button asChild variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <a href={matchPageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  View on HLTV.org
                  <ExternalLink className="h-5 w-5" />
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
