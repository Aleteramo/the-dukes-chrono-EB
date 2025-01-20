import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Non autorizzato' }, 
        { status: 401 }
      );
    }

    // Trova il watch nel database
    const existingWatch = await prisma.watch.findUnique({
      where: { id: params.id },
      include: { images: true } // Include le immagini associate
    });

    if (!existingWatch) {
      return NextResponse.json(
        { error: 'Watch non trovato' }, 
        { status: 404 }
      );
    }

    // Elimina i file immagine dal filesystem
    for (const image of existingWatch.images) {
      if (image.url.startsWith('/uploads/watches/')) {
        try {
          const imagePath = path.join(process.cwd(), 'public', image.url.slice(1));
          await fs.unlink(imagePath);
        } catch (error) {
          console.warn(`Impossibile eliminare l'immagine: ${image.url}`, error);
        }
      }
    }

    // Elimina il watch e le immagini associate dal database
    const deletedWatch = await prisma.watch.delete({
      where: { id: params.id },
      include: { images: true }
    });

    return NextResponse.json({
      message: 'Watch eliminato con successo',
      deletedWatch: deletedWatch
    });
  } catch (error) {
    console.error('Errore nell\'eliminazione del watch:', error);
    return NextResponse.json({
      error: 'Impossibile eliminare il watch',
      details: error instanceof Error ? error.message : 'Errore sconosciuto'
    }, { status: 500 });
  }
}