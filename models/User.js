const bcrypt = require('bcrypt');
const db = require('../config/db');

class User {
    constructor() {
        this.db = db;
    }

    async findByEmail(email) {
        try {
            const users = await this.db.query('SELECT * FROM Users WHERE Email = ?', [email]);
            if(!users) {
                return null 
            }

            return users[0] 
        } catch (error) {
            throw error;
        }
    }



    async createUser(email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await this.db.query('INSERT INTO Users (Email, Password) VALUES (?, ?)', [email, hashedPassword]);
            const userId = result.insertId;
            return userId;
        } catch (error) {
            throw error;
        }
    }

    async findById(userId){
        try {
            const users = await this.db.query('SELECT * FROM Users WHERE id = ?', [userId]);
            if(!users) {
                return null 
            }

            return users[0];
        } catch (error) {
            throw error;
        }
    }

    async updateRefreshToken(userId, refreshToken) {

        try {
            const result = await this.db.query('UPDATE Users SET refresh_token = ? WHERE id = ?', [refreshToken, userId])
            return result
        }catch(err ){
            throw err;
        }

    }

    async blockTokens(userId) {
        try {
            await db.query('UPDATE users SET access_token = NULL, refresh_token = NULL WHERE id = ?', [userId]);
        } catch (error) {
            throw new Error('Error blocking tokens');
        }
    }
}

module.exports = new User();