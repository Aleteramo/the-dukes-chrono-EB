import { NextResponse } from 'next/server';

export async function GET() {
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/catalogo', label: 'Catalogo' },
    { path: '/contatti', label: 'Contatti' },
    { path: '/servizi', label: 'Servizi' },
    { path: '/chi-sono', label: 'Chi Sono' }
  ];

  return NextResponse.json(routes);
}
