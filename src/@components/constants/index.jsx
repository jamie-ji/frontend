export const deBugMode = false;
export const baseUrl = deBugMode
  ? `http://192.168.18.137:7000/api`
  : `${window.location.origin}/api`;
export const mediaUrl = `${window.location.origin}/api/documentchecker/file/`;
