export const api = (path: string, init?: RequestInit) => {
  return fetch(`http://localhost:3000${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...init,
  });
};
