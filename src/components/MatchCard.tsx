'use client';

import type { Match } from '@/services/hltv';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, Clock, ExternalLink, Tv } from 'lucide-react';
import { format } from 'date-fns';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const { teams, event, startTime, id } = match;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <CardHeader className="p-4 border-b border-border">
        <CardTitle className="text-lg font-semibold text-foreground truncate">
          {teams[0].name} vs {teams[1].name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground flex items-center gap-1">
          <Tv className="h-4 w-4" /> {event.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-around items-center mb-4">
          <div className="flex flex-col items-center text-center">
            <Image 
              src={teams[0].logoUrl} 
              alt={`${teams[0].name} logo`} 
              width={48} 
              height={48} 
              className="rounded-full mb-1 object-contain"
              data-ai-hint="team logo" 
            />
            <span className="text-sm font-medium text-foreground">{teams[0].name}</span>
          </div>
          <span className="text-xl font-bold text-accent">VS</span>
          <div className="flex flex-col items-center text-center">
            <Image 
              src={teams[1].logoUrl} 
              alt={`${teams[1].name} logo`} 
              width={48} 
              height={48} 
              className="rounded-full mb-1 object-contain"
              data-ai-hint="team logo"
            />
            <span className="text-sm font-medium text-foreground">{teams[1].name}</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-accent" />
            <span>{format(new Date(startTime), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            <span>{format(new Date(startTime), 'p')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t border-border">
        <Button asChild variant="outline" className="w-full text-accent border-accent hover:bg-accent/10">
          <Link href={`/match/${id}`} className="flex items-center gap-2">
            View Details
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
