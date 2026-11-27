import { NextResponse } from 'next/server';
import { aiReadiness } from '@/lib/ai/router';

// Readiness flags only; never return secret values or test private credentials here.
export async function GET() {
  const supabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const ai = aiReadiness();
  const researchConfigured = Boolean(process.env.TAVILY_API_KEY);
  return NextResponse.json({
    name: 'UDAAN X', version: '1.0.0', status: supabaseConfigured && ai.configured ? 'configured' : 'setup_required',
    services: { supabase: supabaseConfigured, ai: ai.configured, aiProviderSlots: ai.count, webResearch: researchConfigured, payments: false, nativeMobileApp: false },
    note: 'Readiness only. External provider connectivity, billing, security and production deployment have not been verified.'
  }, { headers: { 'Cache-Control': 'no-store' } });
}
