import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Configuração da conexão PostgreSQL
const pool = new Pool({
  user: 'admin', // Substitua pelo seu usuário PostgreSQL
  host: 'localhost',
  database: 'securities_db', // Substitua pelo nome do banco de dados
  password: '1234', // Substitua pela sua senha
  port: 5432,
});

// Caminho do arquivo data.json
const dataFilePath = path.join(__dirname, 'data (2)[37].json');

// Função para inserir os dados no banco
const insertData = async () => {
  try {
    // Lê o conteúdo de data.json
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

    let count=1;

    // Itera sobre cada entrada (título) no arquivo JSON
    for (const entry of data) {
      // Insere o título na tabela securities
      const res = await pool.query(
        'INSERT INTO securities (ticker, security_name, sector, country, trend) VALUES ($1, $2, $3, $4, $5)',
        [entry.ticker, entry.securityName, entry.sector, entry.country, entry.trend]
      );

      // Pega o id da ação inserida
      const securityId = count;

      // Insere os preços e volumes diários na tabela prices
      for (const price of entry.prices) {
        await pool.query(
          'INSERT INTO prices (security_id, date, close, volume) VALUES ($1, $2, $3, $4)',
          [securityId, price.date, parseFloat(price.close), parseInt(price.volume, 10)]
        );
      }

      count++;
    }

    console.log('Dados inseridos com sucesso!');
  } catch (err) {
    console.error('Erro ao inserir dados:', err);
  } finally {
    await pool.end();
  }
};

// Executa a função de inserção
insertData();