const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export function token(){return localStorage.getItem('vsbs_token')}
export function saveSession(data){localStorage.setItem('vsbs_token',data.token);localStorage.setItem('vsbs_user',JSON.stringify(data.user))}
export function clearSession(){localStorage.removeItem('vsbs_token');localStorage.removeItem('vsbs_user')}
export function user(){try{return JSON.parse(localStorage.getItem('vsbs_user'))}catch{return null}}
export async function api(path,{method='GET',body,auth=true}={}){const headers={'Content-Type':'application/json'};if(auth&&token())headers.Authorization=`Bearer ${token()}`;let response;try{response=await fetch(`${BASE}${path}`,{method,headers,body:body?JSON.stringify(body):undefined})}catch{throw new Error('Cannot reach the service. Check that the backend is running.')};if(response.status===204)return null;const data=await response.json().catch(()=>({error:'Unexpected server response'}));if(!response.ok)throw new Error(data.error||data.message||'Request failed');return data}
