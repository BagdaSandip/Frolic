const http = require('http');

const data = JSON.stringify({
  EmailAddress: 'john@example.com',
  UserPassword: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  const cookies = res.headers['set-cookie'];
  console.log(`COOKIES: ${cookies}`);

  let cookieHeader = '';
  if (cookies) {
      cookieHeader = cookies[0].split(';')[0];
  }

  // Next request
  const req2 = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/events',
      method: 'GET',
      headers: {
          'Cookie': cookieHeader
      }
  }, res2 => {
      let body = '';
      res2.on('data', chunk => body += chunk);
      res2.on('end', () => console.log('Events Response: ', res2.statusCode, body));
  });
  req2.end();
  
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
