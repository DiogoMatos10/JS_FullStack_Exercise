import { DataSource } from 'typeorm';
import { Security } from './graphql/models/Security'; 
import { Price } from './graphql/models/Price'; 

export const AppDataSource = new DataSource({
    type: 'postgres', 
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: '1234',
    database: 'securities_db',
    entities: [Security, Price], 
    synchronize: false,
    logging: ['query', 'error'],
});

// Conectando ao banco de dados
AppDataSource.initialize()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida!');
    })
    .catch((error) => console.error('Error connecting to the database', error));
