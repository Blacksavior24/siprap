const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJ2ZW5kZWRvciIsImlhdCI6MTY0MzM1MDYwMX0.WH9jV4YXSrvxFsxJIH9rdGz4d5-N3X-bAfM6tiApuPk';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
