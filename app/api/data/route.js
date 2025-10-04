import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const DATA_KEY = 'dashboard_data';

export async function GET() {
  try {
    const data = await kv.get(DATA_KEY);
    const initialData = data || { orders: [], marketplace: 0, atacado: 0 };
    return NextResponse.json(initialData);
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao buscar dados.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { marketplace, atacado } = await request.json();

    const currentData = await kv.get(DATA_KEY) || { orders: [], marketplace: 0, atacado: 0 };

    currentData.marketplace = Number(marketplace) || 0;
    currentData.atacado = Number(atacado) || 0;

    await kv.set(DATA_KEY, currentData);
    return NextResponse.json(currentData);
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao salvar dados.' }, { status: 500 });
  }
}