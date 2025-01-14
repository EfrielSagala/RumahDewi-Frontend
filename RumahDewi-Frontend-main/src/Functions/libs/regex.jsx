export function checkPassword(str) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(str);
}
export function checkPhone(str) {
  const regex = /^62\d{8,11}$/;
  return regex.test(str);
}
