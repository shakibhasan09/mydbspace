export const api = (path: string) => {
  return fetch(`http://localhost:3000${path}`, {
    headers: { Authorization: `Basic ${btoa("admin:123456")}` },
  });
};
