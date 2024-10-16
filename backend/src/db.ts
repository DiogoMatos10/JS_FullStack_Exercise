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

// Initializing the database connection
AppDataSource.initialize()
    .then(() => {
        console.log('Successful database connection!');
    })
    .catch((error) => console.error('Error connecting to the database', error));
