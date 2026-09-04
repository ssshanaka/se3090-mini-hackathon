const USERS_KEY = 'suwamaga_users'; const SESSION_KEY = 'suwamaga_session';
const demoUsers = { resident: { fullName: 'Nimal Perera', email: 'resident@demo.lk', phone: '0771234567', role: 'resident', mohDivision: 'Kaduwela', password: 'Demo123' }, phi: { fullName: 'Kamal Silva', email: 'phi@demo.lk', phone: '0712345678', role: 'phi', mohDivision: 'Kaduwela', password: 'Demo123' } };
const makeId = () => globalThis.crypto?.randomUUID?.() ?? `user-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const safelyParse = (value, fallback) => { try { return JSON.parse(value) ?? fallback; } catch { return fallback; } };
export const getUsers = () => { const users = safelyParse(localStorage.getItem(USERS_KEY), []); return Array.isArray(users) ? users : []; };
export const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
export const withoutPassword = ({ password, ...user }) => user;
export const getSession = () => { const session = safelyParse(localStorage.getItem(SESSION_KEY), null); return session && typeof session === 'object' && !Array.isArray(session) ? withoutPassword(session) : null; };
export const saveSession = (user) => localStorage.setItem(SESSION_KEY, JSON.stringify(withoutPassword(user)));
export const clearSession = () => localStorage.removeItem(SESSION_KEY);
export function createUser(values) { // Demo-only: production apps must never save plain-text passwords in browser storage.
  return { id: makeId(), fullName: values.fullName.trim(), email: values.email.trim().toLowerCase(), phone: values.phone.trim(), role: values.role, mohDivision: values.mohDivision, password: values.password, createdAt: new Date().toISOString() }; }
export function getOrCreateDemoUser(role) { const demo = demoUsers[role]; if (!demo) return null; const users = getUsers(); let user = users.find((item) => item.email?.toLowerCase() === demo.email); if (!user) { user = { ...demo, id: makeId(), createdAt: new Date().toISOString() }; saveUsers([...users, user]); } return user; }
