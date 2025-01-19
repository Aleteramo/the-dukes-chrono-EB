import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth-options';
import { Session } from 'next-auth';

const prisma = new PrismaClient();

function isValidSession(session: Session | null): session is Session & { user: { username: string; role: string } } {
  return session !== null && 
         session.user !== undefined && 
         'username' in session.user &&
         'role' in session.user &&
         session.user.role === 'ADMIN';
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ora request è di tipo Request, quindi puoi usare direttamente text()
    const bodyText = await request.text();
    const body = JSON.parse(bodyText);
    
    const { contentKey, type, page, section, value, defaultValue } = body;
    const existingContent = await prisma.content.findUnique({
      where: { contentKey }
    });

    let content;
    if (existingContent) {
      await prisma.contentHistory.create({
        data: {
          contentKey,
          type: existingContent.type,
          page: existingContent.page,
          section: existingContent.section,
          value,
          userId: session.user.username
        }
      });

      content = await prisma.content.update({
        where: { contentKey },
        data: { 
          currentValue: value,
          updatedAt: new Date()
        }
      });
    } else {
      content = await prisma.content.create({
        data: {
          contentKey,
          type,
          page,
          section,
          defaultValue: defaultValue || value,
          currentValue: value
        }
      });
    }

    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    console.error('Content save error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = request.url ? new URL(request.url) : null;
    if (!url) {
      return NextResponse.json({ error: 'Invalid request URL' }, { status: 400 });
    }

    const contentKey = url.searchParams.get('contentKey');

    if (!contentKey) {
      return NextResponse.json({ error: 'Missing content key' }, { status: 400 });
    }

    const content = await prisma.content.findUnique({
      where: { contentKey }
    });

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    console.error('Content retrieval error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}