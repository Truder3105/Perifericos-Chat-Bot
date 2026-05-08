export async function httpJson(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  const data = text ? safeJsonParse(text) : null;

  if (!res.ok) {
    const msg =
      (data && (data.error?.message || data.message)) ||
      `HTTP ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return data;
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}
