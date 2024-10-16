import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'admin', 
  host: 'localhost',
  database: 'securities_db', 
  password: '1234', 
  port: 5432,
});

// Path to the data.json file
const dataFilePath = path.join(__dirname, 'data (2)[37].json');

// Function to insert data into the database
const insertData = async () => {
  try {
    // Read the content of data.json
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    let count=1;

    // Iterate over each entry (security) in the JSON file
    for (const entry of data) {
      // Insert the security into the securities table
      const res = await pool.query(
        'INSERT INTO securities (ticker, security_name, sector, country, trend) VALUES ($1, $2, $3, $4, $5)',
        [entry.ticker, entry.securityName, entry.sector, entry.country, entry.trend]
      );

      // Get the id of the inserted security
      const securityId = count;

      // Insert daily prices and volumes into the prices table
      for (const price of entry.prices) {
        await pool.query(
          'INSERT INTO prices (security_id, date, close, volume) VALUES ($1, $2, $3, $4)',
          [securityId, price.date, parseFloat(price.close), parseInt(price.volume, 10)]
        );
      }

      count++;
    }

    console.log('Data successfully inserted');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await pool.end();
  }
};

// Execute the data insertion function
insertData();