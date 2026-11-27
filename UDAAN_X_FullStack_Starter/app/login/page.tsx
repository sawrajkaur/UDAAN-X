'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
export default function Login() {
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [message,setMessage]=useState(''); const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setMessage('');try{const db=createClient();const {error}=await db.auth.signInWithPassword({email,password});if(error)throw error;location.href='/dashboard';}catch(err){setMessage(err instanceof Error?err.message:'Login failed. Check Supabase setup.');}finally{setBusy(false)}}
 return <main className="auth-page"><Link href="/" className="brand dark-brand"><span className="brand-icon">✦</span><span>UDAAN <b>X</b><small>BY VYORA AI</small></span></Link><form className="auth-card" onSubmit={submit}><div className="eyebrow">WELCOME BACK</div><h1>Sign in</h1><p>Continue to your UDAAN X workspace.</p><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label><label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"/></label><button className="button full" disabled={busy}>{busy?'Signing in…':'Sign in'}</button>{message&&<div className="error">{message}</div>}<div className="auth-foot">New here? <Link href="/signup">Create an account</Link></div></form></main>
}
