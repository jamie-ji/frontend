export const deBugMode = true;
export const baseUrl = deBugMode
  ? `http://192.168.18.7:8000/api`
  : `${window.location.origin}/api`;
export const mediaUrl = `${window.location.origin}/api/documentchecker/file/`;
