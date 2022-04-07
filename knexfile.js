// const types = require('mysql').types;
// const TIMESTAMPTZ_OID = 1184;
// const TIMESTAMP_OID = 1114;
// types.setTypeParser(TIMESTAMPTZ_OID, val => val);
// types.setTypeParser(TIMESTAMP_OID, val => val);

const dontenv = require('dotenv');
dontenv.config();

module.exports = {
	client: 'mysql',
	connection: {
		host: process.env.CONNECTION_HOST,
		port: process.env.CONNECTION_PORT,
		database: process.env.CONNECTION_DATABASE,
		user: process.env.CONNECTION_USER,
		password: process.env.CONNECTION_PASSWORD,
		timezone: "utc"
		//connectionString: process.env.DATABASE_URL,
      	//ssl: { rejectUnauthorized: false },
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
};