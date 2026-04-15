let _apiKey: string | undefined;

export function setTypelessApiKey(key: string | undefined) { _apiKey = key; }

export function apiFetch(url: string, init: RequestInit = {}): Promise<Response> {
  if (_apiKey) {
    const headers = new Headers(init.headers);
    if (!headers.has('X-API-Key')) {
      headers.set('X-API-Key', _apiKey);
    }
    init = { ...init, headers };
  }
  return fetch(url, init);
}
