// generate-hash.js
import bcrypt from 'bcryptjs';

const hash = await bcrypt.hash('12345', 10);
console.log(hash);
