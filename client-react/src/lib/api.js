// src/lib/api.js
const ENV_API = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

function baseUrl() {
  const ls = (localStorage.getItem('api') || '').replace(/\/+$/, '');
  return ls || ENV_API; // localStorage tem prioridade para facilitar testes
}

export function setApi(url) {
  localStorage.setItem('api', (url || '').replace(/\/+$/, ''));
  window.location.reload();
}
export function clearApi() {
  localStorage.removeItem('api');
  window.location.reload();
}

export function setToken(t) { localStorage.setItem('token', t || ''); }
export function getToken() { return localStorage.getItem('token') || ''; }

function buildHeaders(extra = {}) {
  const h = { 'Content-Type': 'application/json', ...extra };
  const t = getToken();
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
}

async function request(method, path, body, opts = {}) {
  const base = baseUrl();
  const url = base + (path.startsWith('/') ? path : `/${path}`);
  const controller = new AbortController();
  const timeoutMs = opts.timeout ?? 15000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method,
      headers: buildHeaders(opts.headers),
      body: body != null ? JSON.stringify(body) : undefined,
      credentials: 'omit',
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      let err;
      try { err = JSON.parse(text); } catch { err = { message: text || res.statusText }; }
      err.status = res.status;
      throw err;
    }

    if (res.status === 204) return null;
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
  } catch (e) {
    if (e.name === 'AbortError') throw { message: 'Tempo esgotado (timeout)', status: 0 };
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  base: baseUrl,
  setBase: setApi,
  clearBase,
  setToken,
  getToken,
  get: (p, o) => request('GET', p, undefined, o),
  post: (p, b, o) => request('POST', p, b, o),
  put: (p, b, o) => request('PUT', p, b, o),
  patch: (p, b, o) => request('PATCH', p, b, o),
  del: (p, o) => request('DELETE', p, undefined, o),
  health: () => request('GET', '/healthz'),
};
