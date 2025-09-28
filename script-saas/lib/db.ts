// src/lib/db.ts
import { supabase } from './supabase';

export async function getUserTier(clerkId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('tier')
    .eq('clerk_id', clerkId)
    .single();

  if (error) throw error;
  return data?.tier || 'free';
}

export async function incrementUsage(clerkId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('usage_count')
    .eq('clerk_id', clerkId)
    .single();

  await supabase
    .from('users')
    .update({ usage_count: (user?.usage_count || 0) + 1 })
    .eq('clerk_id', clerkId);
}

export async function saveScript(clerkId: string, topic: string, platform: string, style: string, scriptText: string, audioUrl?: string) {
  const { data: user } = await supabase.from('users').select('id').eq('clerk_id', clerkId).single();

  await supabase.from('scripts').insert({
    user_id: user?.id,
    topic,
    platform,
    style,
    script_text: scriptText,
    audio_url: audioUrl,
  });
}