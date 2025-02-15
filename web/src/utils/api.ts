export const api = (path: string, init?: RequestInit) => {
  return fetch(`http://localhost:3000${path}`, {
    headers: {
      Authorization: `Basic ${btoa("admin:123456")}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...init,
  });
};
