export function getToken() {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token).token : null;
}

export function setToken(token: string | null) {
  localStorage.setItem('token', JSON.stringify({ token: token }));
}

export function removeToken() {
  localStorage.removeItem('token');
}
