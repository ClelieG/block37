const pg = require('pg');
const Client = new pg.Client(process.env.DATABASE_URL || 'postgres://postgres:molly@localhost:5432/prisma1_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || "shhh";

const authenticate = async ({ username, password }) => {
    const SQL =`
        SELECT id, password
        FROM users
        WHERE username = $1
        `;
    const response = await client.query( SQL, [username]);
    if( !response.rows.length || (await bcrypt.compare(password, response.rows[0].password))=== false){
        const error = Error('not authorized');
        error.status = 401;
        throw error;
    }
    const token = await jwt.sign({ id: response.rows[0].id}, JWT);
    console.log(token);
    return { token: response.rows[0].id };
}