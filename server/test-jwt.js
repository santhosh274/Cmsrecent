
import jwt from 'jsonwebtoken';
console.log('JWT module:', jwt);
console.log('JWT verify:', typeof jwt.verify);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJkOTZmOTIzLTc0MTAtNDQ4OC1hZDI5LTg4NmJlYTM4MjY0ZiIsIm5hbWUiOiJTYW50aG9zaCBLdW1hciIsImVtYWlsIjoic2FudGhvc2hrdW1hcnIuYTdAZ21haWwuY29tIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3Njk3Nzk2NTksImV4cCI6MTc2OTg2NjA1OX0.aBc9PHo2W2smkESZnhEvkUnrAsvyQ7hY_ICfqcw09Bk';
const secret = 'dev-secret-key';

try {
  console.log('Verification attempt...');
  const decoded = jwt.verify(token, secret);
  console.log('Verified successfully:', decoded);
} catch (err) {
  console.error('Verification error:', err);
  console.error('Error stack:', err.stack);
}
