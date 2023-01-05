const deBugMode = true;
export const baseUrl = deBugMode
  ? `http://192.168.18.147:7000/api`
  : `${window.location.origin}/api`;
