import bcrypt from 'bcryptjs';

const password = 'password123';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Hash for "password123":', hash);
console.log('Verify:', bcrypt.compareSync(password, hash));
