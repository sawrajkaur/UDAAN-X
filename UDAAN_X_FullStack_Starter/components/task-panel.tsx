'use client';
import { FormEvent, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
type Task={id:string;title:string;is_done:boolean};
export default function TaskPanel(){
 const [tasks,setTasks]=useState<Task[]>([]);const [title,setTitle]=useState('');const [notice,setNotice]=useState('Loading tasks…');
 async function load(){try{const db=createClient();const {data,error}=await db.from('tasks').select('id,title,is_done').order('created_at',{ascending:false});if(error)throw error;setTasks(data||[]);setNotice('')}catch{setNotice('Connect Supabase and run the database schema to enable saved tasks.');}}
 useEffect(()=>{load()},[]);
 async function add(e:FormEvent){e.preventDefault();if(!title.trim())return;try{const db=createClient();const {data:{user},error:authError}=await db.auth.getUser();if(authError||!user)throw new Error('Please sign in again.');const {error}=await db.from('tasks').insert({title:title.trim(),user_id:user.id});if(error)throw error;setTitle('');load()}catch(err){setNotice(err instanceof Error?err.message:'Task could not be saved.')}}
 async function toggle(task:Task){const db=createClient();const {error}=await db.from('tasks').update({is_done:!task.is_done}).eq('id',task.id);if(error){setNotice(error.message);return}load()}
 return <><form className="task-add" onSubmit={add}><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Add a task…"/><button className="button small">Add</button></form>{notice&&<p className="muted">{notice}</p>}<div className="task-items">{tasks.map(t=><label key={t.id} className="task-item"><input type="checkbox" checked={t.is_done} onChange={()=>toggle(t)}/><span className={t.is_done?'completed':''}>{t.title}</span></label>)}</div></>;
}
