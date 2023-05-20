function sum(a, b) {
  const len = Math.max(a.length, b.length);
  a = a.padStart(len, '0');
  b = b.padStart(len, '0');
  let carry = 0;
  let result = '';
  for (let i = len - 1; i > 0; i--) {
    const n = +a[i] + +b[i] + carry;
    carry = Math.floor(n / 10);
    result = (n % 10) + result;
  }
  if (carry) {
    result = '1' + result;
  }
  return result;
}

console.log(sum('223354549852737', '9238975932023530'));
