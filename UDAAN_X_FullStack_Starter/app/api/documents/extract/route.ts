import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export const runtime = 'nodejs';
export const maxDuration = 30;
const MAX_BYTES = 12 * 1024 * 1024;
const MAX_CHARS = 40_000;

function cleanText(value: string) {
  return value.replace(/\u0000/g, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim().slice(0, MAX_CHARS);
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'ਦਸਤਾਵੇਜ਼ ਪੜ੍ਹਨ ਲਈ ਪਹਿਲਾਂ Login ਕਰੋ।' }, { status: 401 });

    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'ਕਿਰਪਾ ਕਰਕੇ PDF, DOCX ਜਾਂ TXT ਫਾਈਲ ਚੁਣੋ।' }, { status: 400 });
    if (file.size <= 0 || file.size > MAX_BYTES) return NextResponse.json({ error: 'ਫਾਈਲ ਖਾਲੀ ਹੈ ਜਾਂ 12 MB ਤੋਂ ਵੱਡੀ ਹੈ।' }, { status: 413 });

    const name = file.name.toLowerCase();
    const bytes = Buffer.from(await file.arrayBuffer());
    let extracted = '';
    let kind = '';
    let pages: number | undefined;

    if (name.endsWith('.pdf')) {
      if (bytes.subarray(0, 5).toString('ascii') !== '%PDF-') return NextResponse.json({ error: 'ਇਹ ਸਹੀ PDF ਫਾਈਲ ਨਹੀਂ ਲੱਗਦੀ।' }, { status: 400 });
      const parsed = await pdf(bytes, { max: 80 });
      extracted = parsed.text;
      pages = parsed.numpages;
      kind = 'PDF';
    } else if (name.endsWith('.docx')) {
      if (bytes.subarray(0, 2).toString('hex') !== '504b') return NextResponse.json({ error: 'ਇਹ ਸਹੀ DOCX ਫਾਈਲ ਨਹੀਂ ਲੱਗਦੀ।' }, { status: 400 });
      const result = await mammoth.extractRawText({ buffer: bytes });
      extracted = result.value;
      kind = 'Word DOCX';
    } else if (name.endsWith('.txt') || name.endsWith('.md') || name.endsWith('.csv')) {
      extracted = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      kind = name.endsWith('.csv') ? 'CSV' : name.endsWith('.md') ? 'Markdown' : 'Text';
    } else {
      return NextResponse.json({ error: 'ਇਸ ਵੇਲੇ PDF, Word (.docx), TXT, Markdown ਅਤੇ CSV ਫਾਈਲਾਂ ਹੀ ਸਹਾਇਕ ਹਨ। .doc ਫਾਈਲ ਨੂੰ ਪਹਿਲਾਂ .docx ਵਿੱਚ ਬਦਲੋ।' }, { status: 415 });
    }

    const text = cleanText(extracted);
    if (!text) return NextResponse.json({ error: 'ਇਸ ਫਾਈਲ ਵਿੱਚ ਪੜ੍ਹਨਯੋਗ ਟੈਕਸਟ ਨਹੀਂ ਮਿਲਿਆ। Scanned PDF ਲਈ OCR ਦੀ ਲੋੜ ਹੋ ਸਕਦੀ ਹੈ।' }, { status: 422 });
    return NextResponse.json({ name: file.name, kind, pages, text, truncated: extracted.length > MAX_CHARS, characters: text.length }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Document extraction error', error);
    return NextResponse.json({ error: 'ਫਾਈਲ ਪੜ੍ਹਨ ਵਿੱਚ ਸਮੱਸਿਆ ਆਈ। ਕਿਰਪਾ ਕਰਕੇ ਫਾਈਲ ਜਾਂਚ ਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।' }, { status: 500 });
  }
}
