export const api = (path: string, init?: RequestInit) => {
  return fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...init,
  });
};
