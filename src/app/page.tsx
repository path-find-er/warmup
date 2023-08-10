'use client';

import * as React from 'react';

import Game from '@/components/game/Game';
export default function HomePage() {
  return (
    <main>
      <section className='max-w-3xl  bg-white'>
        <Game />
      </section>
    </main>
  );
}
