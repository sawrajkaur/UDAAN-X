'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
export default function Signup() {
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [message,setMessage]=useState(''); const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setMessage('');try{const db=createClient();const {error}=await db.auth.signUp({email,password,options:{emailRedirectTo:location.origin+'/dashboard'}});if(error)throw error;setMessage('Account request submitted. Check your email if email confirmation is enabled.');}catch(err){setMessage(err instanceof Error?err.message:'Signup failed. Check Supabase setup.');}finally{setBusy(false)}}
 return <main className="auth-page"><Link href="/" className="brand dark-brand"><span className="brand-icon">✦</span><span>UDAAN <b>X</b><small>BY VYORA AI</small></span></Link><form className="auth-card" onSubmit={submit}><div className="eyebrow">START YOUR WORKSPACE</div><h1>Create account</h1><p>Use an email address you can access.</p><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label><label>Password<input type="password" required minLength={8} value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password"/><small>At least 8 characters.</small></label><button className="button full" disabled={busy}>{busy?'Creating…':'Create account'}</button>{message&&<div className="notice">{message}</div>}<div className="auth-foot">Already registered? <Link href="/login">Sign in</Link></div></form></main>
}
