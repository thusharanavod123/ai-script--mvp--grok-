import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';  // Your Supabase client

export async function POST(req: Request) {
  const payload = await req.text();
  const heads = headers();
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);  // Get secret from Clerk

  let evt;
  try {
    evt = wh.verify(payload, {
      'svix-id': heads.get('svix-id')!,
      'svix-timestamp': heads.get('svix-timestamp')!,
      'svix-signature': heads.get('svix-signature')!,
    }) as any;
  } catch (err) {
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }

  if (evt.type === 'user.created') {
    const { id } = evt.data;
    // Insert new user in Supabase
    await supabase.from('users').insert({ clerk_id: id, tier: 'free', usage_count: 0 });
  }

  return NextResponse.json({ success: true });
}