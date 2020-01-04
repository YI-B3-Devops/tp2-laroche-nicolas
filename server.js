'use strict';

const express = require('express');
const { Client } = require('pg');

// Constants
const PORT = 8080;
const pg = new Client({
  user: "root",
  password: "qwertyuiop",
  host: "postgres",
  database: "DatabaseName",
  port: 5432,
});

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world Laroche\n');
});
app.get('/api', (req, res) => {
  res.send( { "message": "Hello World" });
});

app.get('/status', async (req, res) => {
  const postgresQuery = 'SELECT date_trunc(\'second\', current_timestamp - pg_postmaster_start_time()) as uptime;'
  const result = await pgClient.query(postgresQuery);
  const uptime = result.rows[0].uptime;
  const uptimeString = () => {
    let time = '';

    time += uptime.hours ? `${uptime.hours}h ` : '';
    time += uptime.minutes ? `${uptime.minutes}m ` : '';
    time += uptime.seconds ? `${uptime.seconds}s` : '';

    return time
  };

  res.json({
    status: 'ok',
    postgresUptime: uptimeString(),
    redisConnectedClients: Number(redisClient.server_info.connected_clients)
  })
});

app.listen(PORT);
console.log('le serveur est lancer au port'+ PORT);

