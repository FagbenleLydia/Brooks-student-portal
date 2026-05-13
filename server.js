require('dotenv').config();
const dns = require('dns');
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
]);

const { app, connectDB } = require('./src/app');

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` API Docs available at http://localhost:${PORT}/api-docs`);
  });
};

start();
