import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-6 shadow-md bg-card border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-accent hover:text-accent/90 transition-colors">
          <Gamepad2 className="h-7 w-7" />
          <span>CS2 Match Tracker</span>
        </Link>
        <nav>
          {/* Navigation links can be added here if needed */}
        </nav>
      </div>
    </header>
  );
}
