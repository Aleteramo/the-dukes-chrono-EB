import { NextResponse } from 'next/server';

export async function GET() {
  const routes = [
    { path: '/archive', label: 'Archive' },
    { path: '/contatti', label: 'Contatti' },
    { path: '/chi-sono', label: 'Chi Sono' }
  ];

  return NextResponse.json(routes);
}
