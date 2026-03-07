import http from 'http';
import fs from 'fs';

const boundary = '----WebKitFormBoundary7MA4YWxk';
const file = fs.readFileSync('images.jfif');
const nl = '\r\n';

let body = '';
body += '--' + boundary + nl;
body += 'Content-Disposition: form-data; name="name"' + nl + nl + 'TestFile' + nl;
body += '--' + boundary + nl;
body += 'Content-Disposition: form-data; name="email"' + nl + nl + 'testfile@test.com' + nl;
body += '--' + boundary + nl;
body += 'Content-Disposition: form-data; name="contactNumber"' + nl + nl + '123' + nl;
body += '--' + boundary + nl;
body += 'Content-Disposition: form-data; name="password"' + nl + nl + 'test123' + nl;
body += '--' + boundary + nl;
body += 'Content-Disposition: form-data; name="profilePicture"; filename="test.jfif"' + nl;
body += 'Content-Type: image/jfif' + nl + nl;

const bodyStart = Buffer.from(body);
const bodyEnd = Buffer.from(nl + '--' + boundary + '--' + nl);
const payload = Buffer.concat([bodyStart, file, bodyEnd]);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/users/',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': payload.length,
  },
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', data);
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(payload);
req.end();
