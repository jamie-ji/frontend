export const deBugMode = false;
export const baseUrl = deBugMode
  ? `https://similarity.epochs.io/api`
  : `${window.location.origin}/api`;
export const mediaUrl = `${window.location.origin}/api/documentchecker/file/`;
