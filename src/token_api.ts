export function get_token() {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token).token : null;
}

export function set_token(token: string | null) {
  localStorage.setItem('token', JSON.stringify({ token: token }));
}

export function remove_token() {
  localStorage.removeItem('token');
}
