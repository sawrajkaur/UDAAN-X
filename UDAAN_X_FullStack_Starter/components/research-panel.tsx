'use client';
import { FormEvent, useState } from 'react';
import { Search, ExternalLink, Copy, LoaderCircle, BookOpenCheck } from 'lucide-react';

type Source = { id: number; title: string; url: string; publishedDate: string | null };
type ResearchResult = { query: string; report: string; sources: Source[]; researchedAt: string };

export default function ResearchPanel() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('pa');
  const [depth, setDepth] = useState<'basic' | 'advanced'>('basic');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ResearchResult | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy || query.trim().length < 3) return;
    setBusy(true); setError(''); setResult(null);
    try {
      const response = await fetch('/api/research', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: query.trim(), language, depth }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Research request failed.');
      setResult(data as ResearchResult);
    } catch (err) { setError(err instanceof Error ? err.message : 'Research request failed.'); }
    finally { setBusy(false); }
  }

  function exportReport() {
    if (!result) return;
    const text = `${result.query}\n\n${result.report}\n\nSources:\n${result.sources.map(s => `[${s.id}] ${s.title}\n${s.url}${s.publishedDate ? `\nPublished: ${s.publishedDate}` : ''}`).join('\n\n')}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'udaan-x-research.txt'; anchor.click(); URL.revokeObjectURL(url);
  }

  return <div className="research-card">
    <form onSubmit={submit} className="research-form">
      <label className="doc-label" htmlFor="research-query">ਤੁਸੀਂ ਕੀ ਖੋਜਣਾ ਚਾਹੁੰਦੇ ਹੋ?</label>
      <textarea id="research-query" value={query} onChange={e => setQuery(e.target.value)} placeholder="ਉਦਾਹਰਨ: ਭਾਰਤ ਵਿੱਚ AI ਦੇ ਨਵੇਂ ਕਾਨੂੰਨ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਰੋਤ ਲੱਭੋ…" maxLength={500} rows={4}/>
      <div className="research-options">
        <label>ਜਵਾਬ ਦੀ ਭਾਸ਼ਾ <select value={language} onChange={e => setLanguage(e.target.value)}><option value="pa">ਪੰਜਾਬੀ</option><option value="hi">हिन्दी</option><option value="en">English</option></select></label>
        <label>ਖੋਜ ਦੀ ਡੂੰਘਾਈ <select value={depth} onChange={e => setDepth(e.target.value as 'basic'|'advanced')}><option value="basic">ਆਮ</option><option value="advanced">ਵਿਸਤ੍ਰਿਤ</option></select></label>
      </div>
      <button className="button research-submit" type="submit" disabled={busy || query.trim().length < 3}>{busy ? <><LoaderCircle size={16} className="spin"/> ਵੈੱਬ 'ਤੇ ਖੋਜ ਜਾਰੀ ਹੈ…</> : <><Search size={16}/> ਖੋਜ ਸ਼ੁਰੂ ਕਰੋ</>}</button>
    </form>
    {error && <div className="error" role="alert">{error}</div>}
    {result && <section className="research-result" aria-live="polite">
      <div className="research-result-head"><h2><BookOpenCheck size={17}/> ਖੋਜ ਰਿਪੋਰਟ</h2><button type="button" className="text-action" onClick={exportReport}>ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ</button><button type="button" className="text-action" onClick={() => navigator.clipboard?.writeText(result.report)}><Copy size={13}/> Copy</button></div>
      <p className="research-query">{result.query}</p>
      <div className="research-report">{result.report}</div>
      <h3>ਵਰਤੇ ਗਏ ਸਰੋਤ ({result.sources.length})</h3>
      <ol className="research-sources">{result.sources.map(source => <li key={source.id}><span>[{source.id}]</span> <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <ExternalLink size={12}/></a>{source.publishedDate && <small>{source.publishedDate}</small>}</li>)}</ol>
      <small className="muted">ਖੋਜ ਸਮਾਂ: {new Date(result.researchedAt).toLocaleString()} · ਸਰੋਤਾਂ ਦੀ ਜਾਂਚ ਖੁਦ ਵੀ ਕਰੋ।</small>
    </section>}
    <p className="doc-privacy">UDAAN X ਵੈੱਬ ਖੋਜ ਲਈ ਤੁਹਾਡਾ ਸਵਾਲ Search Provider ਨੂੰ ਭੇਜਦਾ ਹੈ। AI ਰਿਪੋਰਟ ਵਾਪਸ ਕੀਤੇ ਸਰੋਤਾਂ 'ਤੇ ਆਧਾਰਿਤ ਹੁੰਦੀ ਹੈ; ਇਹ ਪੂਰੀ ਜਾਂਚ ਜਾਂ ਪੇਸ਼ੇਵਰ ਸਲਾਹ ਦਾ ਬਦਲ ਨਹੀਂ।</p>
  </div>;
}
