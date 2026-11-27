'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { Brain, Plus, Trash2, LoaderCircle } from 'lucide-react';

type Memory = { id: string; label: string; content: string; created_at: string };
export default function MemoryManager() {
  const [items, setItems] = useState<Memory[]>([]);
  const [label, setLabel] = useState('');
  const [content, setContent] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  async function load() {
    setBusy(true); setError('');
    try { const response = await fetch('/api/memories', { cache: 'no-store' }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Could not load memories.'); setItems(data.memories || []); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not load memories.'); }
    finally { setBusy(false); }
  }
  useEffect(() => { void load(); }, []);
  async function add(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError(''); setNotice('');
    try { const response = await fetch('/api/memories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ label, content, consent }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Could not save memory.'); setItems((old) => [data.memory, ...old]); setLabel(''); setContent(''); setConsent(false); setNotice('ਤੁਹਾਡੀ ਯਾਦ ਸੰਭਾਲੀ ਗਈ ਹੈ।'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not save memory.'); }
    finally { setBusy(false); }
  }
  async function remove(id: string) {
    if (!window.confirm('ਕੀ ਤੁਸੀਂ ਇਹ ਯਾਦ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?')) return;
    setBusy(true); setError('');
    try { const response = await fetch('/api/memories', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Could not delete memory.'); setItems((old) => old.filter((item) => item.id !== id)); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not delete memory.'); }
    finally { setBusy(false); }
  }
  return <div className="memory-layout">
    <section className="panel"><div className="panel-title"><Brain size={18}/> ਨਵੀਂ ਯਾਦ ਜੋੜੋ</div><p className="muted">ਸਿਰਫ਼ ਉਹ ਜਾਣਕਾਰੀ ਜੋ ਤੁਸੀਂ ਖੁਦ ਸੰਭਾਲਣ ਲਈ ਚੁਣਦੇ ਹੋ। Password, API key ਜਾਂ ਬਹੁਤ ਸੰਵੇਦਨਸ਼ੀਲ ਜਾਣਕਾਰੀ ਨਾ ਜੋੜੋ।</p><form className="memory-form" onSubmit={add}><label>ਸਿਰਲੇਖ<input value={label} onChange={(e) => setLabel(e.target.value)} maxLength={80} required placeholder="ਉਦਾਹਰਨ: ਮੇਰੀ ਜਵਾਬ ਭਾਸ਼ਾ"/></label><label>ਜਾਣਕਾਰੀ<textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength={2000} required rows={4} placeholder="ਉਦਾਹਰਨ: ਮੈਨੂੰ ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਪਸੰਦ ਹਨ।"/></label><label className="consent-line"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required/> ਮੈਂ ਸਹਿਮਤ ਹਾਂ ਕਿ ਇਹ ਜਾਣਕਾਰੀ ਮੇਰੇ ਖਾਤੇ ਵਿੱਚ ਸੰਭਾਲੀ ਜਾਵੇ।</label><button className="send" type="submit" disabled={busy || !consent}><Plus size={16}/> ਯਾਦ ਸੰਭਾਲੋ</button></form></section>
    <section className="panel"><div className="panel-title">ਮੇਰੀਆਂ ਸੰਭਾਲੀਆਂ ਯਾਦਾਂ <span className="tag">{items.length}</span></div>{busy && <p className="muted"><LoaderCircle className="spin" size={15}/> ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…</p>}{items.length === 0 && !busy && <p className="muted">ਹਾਲੇ ਕੋਈ ਯਾਦ ਸੰਭਾਲੀ ਨਹੀਂ ਗਈ।</p>}{items.map((item) => <article className="memory-item" key={item.id}><div><b>{item.label}</b><p>{item.content}</p><small className="muted">{new Date(item.created_at).toLocaleDateString()}</small></div><button className="icon-link" type="button" onClick={() => void remove(item.id)} aria-label="ਯਾਦ ਮਿਟਾਓ"><Trash2 size={16}/></button></article>)}</section>
    {error && <p className="error">{error}</p>}{notice && <p className="success">{notice}</p>}
  </div>;
}
