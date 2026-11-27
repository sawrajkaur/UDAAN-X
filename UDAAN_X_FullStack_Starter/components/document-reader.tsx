'use client';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { ArrowLeft, FileText, FileUp, LoaderCircle, Send, Trash2 } from 'lucide-react';
import Link from 'next/link';

type Extracted = { name: string; kind: string; pages?: number; text: string; truncated: boolean; characters: number };
export default function DocumentReader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [document, setDocument] = useState<Extracted | null>(null);
  const [question, setQuestion] = useState('ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਸਾਰ ਦੱਸੋ।');
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<'pa'|'hi'|'en'>('pa');

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; e.target.value = '';
    if (!file) return;
    setBusy(true); setError(''); setAnswer(''); setDocument(null);
    try {
      const form = new FormData(); form.append('file', file);
      const response = await fetch('/api/documents/extract', { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'ਫਾਈਲ ਪੜ੍ਹੀ ਨਹੀਂ ਜਾ ਸਕੀ।');
      setDocument(data);
    } catch (err) { setError(err instanceof Error ? err.message : 'Upload ਅਸਫਲ।'); }
    finally { setBusy(false); }
  }
  async function ask(e: FormEvent) {
    e.preventDefault(); if (!document || !question.trim() || busy) return;
    setBusy(true); setError(''); setAnswer('');
    try {
      const response = await fetch('/api/documents/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ language, question, documentText: document.text, fileName: document.name }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'AI ਜਵਾਬ ਨਹੀਂ ਮਿਲਿਆ।');
      setAnswer(data.answer);
    } catch (err) { setError(err instanceof Error ? err.message : 'AI request ਅਸਫਲ।'); }
    finally { setBusy(false); }
  }
  return <main className="document-page">
    <header className="document-nav"><Link href="/dashboard" className="doc-back"><ArrowLeft size={17}/> Dashboard</Link><div className="brand"><span className="brand-icon">✦</span><span>UDAAN <b>X</b><small>BY VYORA AI</small></span></div></header>
    <section className="document-wrap">
      <div className="eyebrow"><span className="dot"/> DOCUMENT INTELLIGENCE</div>
      <h1>PDF ਅਤੇ Document Reader</h1>
      <p className="doc-intro">ਆਪਣੀ PDF, Word ਜਾਂ Text ਫਾਈਲ ਅੱਪਲੋਡ ਕਰੋ ਅਤੇ ਉਸ ਬਾਰੇ ਸਵਾਲ ਪੁੱਛੋ।</p>
      {!document ? <button className="upload-zone" type="button" onClick={() => inputRef.current?.click()} disabled={busy}>
        {busy ? <LoaderCircle className="spin" size={30}/> : <FileUp size={30}/>}<b>{busy ? 'ਦਸਤਾਵੇਜ਼ ਪੜ੍ਹਿਆ ਜਾ ਰਿਹਾ ਹੈ…' : 'ਫਾਈਲ ਚੁਣੋ ਜਾਂ ਇੱਥੇ ਅੱਪਲੋਡ ਕਰੋ'}</b><span>PDF · DOCX · TXT · MD · CSV · ਵੱਧ ਤੋਂ ਵੱਧ 12 MB</span>
      </button> : <div className="document-card">
        <div className="document-file"><FileText size={25}/><div><b>{document.name}</b><small>{document.kind}{document.pages ? ` · ${document.pages} pages` : ''} · {document.characters.toLocaleString()} characters</small></div><button className="doc-icon-btn" onClick={() => {setDocument(null);setAnswer('');setError('');}} aria-label="Remove document"><Trash2 size={17}/></button></div>
        {document.truncated && <div className="doc-warning">ਵੱਡੇ ਦਸਤਾਵੇਜ਼ ਦਾ ਪਹਿਲਾ ਹਿੱਸਾ ਹੀ ਪੜ੍ਹਿਆ ਗਿਆ ਹੈ।</div>}
        <label className="doc-label">ਜਵਾਬ ਦੀ ਭਾਸ਼ਾ</label><select className="doc-select" value={language} onChange={e=>setLanguage(e.target.value as 'pa'|'hi'|'en')}><option value="pa">ਪੰਜਾਬੀ</option><option value="hi">हिन्दी</option><option value="en">English</option></select>
        <form className="doc-question" onSubmit={ask}><label className="doc-label" htmlFor="doc-question">ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਕੀ ਜਾਣਨਾ ਹੈ?</label><textarea id="doc-question" value={question} onChange={e=>setQuestion(e.target.value)} maxLength={2000} rows={3}/><button className="button" disabled={busy || !question.trim()}>{busy ? <LoaderCircle className="spin" size={16}/> : <Send size={16}/>} AI ਨੂੰ ਪੁੱਛੋ</button></form>
        {answer && <article className="doc-answer"><h2>UDAAN X ਦਾ ਜਵਾਬ</h2><p>{answer}</p><button className="text-action" onClick={()=>navigator.clipboard?.writeText(answer)}>ਜਵਾਬ Copy ਕਰੋ</button></article>}
        <details className="doc-preview"><summary>ਪੜ੍ਹਿਆ ਗਿਆ ਟੈਕਸਟ ਵੇਖੋ</summary><pre>{document.text}</pre></details>
      </div>}
      <input ref={inputRef} type="file" hidden accept=".pdf,.docx,.txt,.md,.csv,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,text/csv" onChange={upload}/>
      {error && <div className="error">{error}</div>}
      <p className="doc-privacy">ਗੋਪਨੀਯਤਾ: ਫਾਈਲ ਇਸ ਵੇਲੇ ਸਿਰਫ਼ ਪੜ੍ਹਨ ਲਈ ਸਰਵਰ ਉੱਤੇ process ਹੁੰਦੀ ਹੈ; ਅਸੀਂ ਇਸ ਨੂੰ Supabase Storage ਵਿੱਚ ਸੰਭਾਲਦੇ ਨਹੀਂ। AI ਨੂੰ ਸਵਾਲ ਪੁੱਛਣ ਸਮੇਂ ਕੱਢਿਆ ਟੈਕਸਟ ਤੁਹਾਡੇ configure ਕੀਤੇ AI Provider ਨੂੰ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ। ਸੰਵੇਦਨਸ਼ੀਲ ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੀ ਸੰਸਥਾ ਦੀ ਨੀਤੀ ਅਤੇ Provider ਦੀ privacy policy ਜਾਂਚੋ।</p>
      <p className="doc-privacy">Scanned PDF ਜਾਂ ਤਸਵੀਰਾਂ ਵਾਲੇ PDF ਲਈ OCR ਹਾਲੇ ਸ਼ਾਮਲ ਨਹੀਂ। .DOC ਫਾਰਮੈਟ ਸਿੱਧਾ ਸਹਾਇਕ ਨਹੀਂ; ਇਸ ਨੂੰ .DOCX ਵਿੱਚ ਬਦਲੋ।</p>
    </section>
  </main>;
}
