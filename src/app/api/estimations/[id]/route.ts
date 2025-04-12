import { connectDB } from '@/lib/db';
import EstimationData from '@/models/EstimationData';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const estimation = await EstimationData.findById(id);

    if (!estimation) {
      return NextResponse.json({ error: 'Estimation not found' }, { status: 404 });
    }

    return NextResponse.json(estimation, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
