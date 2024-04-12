const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
require('dotenv').config();


const jwtKey = process.env.JWT_SECRET

class UserService  {
     generateAccessToken(userId) {
        return jwt.sign({ userId }, jwtKey, { expiresIn: '10m' });
    } 

     generateRefreshToken() {
        return jwt.sign({}, jwtKey, { expiresIn: '7d' });
    }

     verifyRefreshToken(token) {
        try {
            return jwt.verify(token, jwtKey);
          } catch (error) {
            return null;
          }
    }

    async login(email, password) {
        try{
        const user = await User.findByEmail(email)

        if (!user) {
         return { success: false, message: 'Invalid email or password' };
        }

        const isValidPassword =  bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return { success: false, message: 'Invalid email or password' };
        }

        const accessToken = this.generateAccessToken(user.id);
        const refreshToken = this.generateRefreshToken();
        await User.updateRefreshToken(user.id, refreshToken);
        return { success: true, accessToken, refreshToken };
    }catch(err) {
        return { success: false, message: 'Internal server error' };
    } 
    }


    async register(email, password) {
        try {
            const candidate = await User.findByEmail(email);
    
            if (candidate) {
                return { success: false, message: 'User already exists' };
            }
    
            const hashedPassword = bcrypt.hashSync(password, 10);
            const userId = await User.createUser(email, hashedPassword);
            
            const accessToken = this.generateAccessToken(userId);
            const refreshToken = this.generateRefreshToken();
    
            await User.updateRefreshToken(userId, refreshToken);
    
            return { success: true, message: 'Success', userId, accessToken, refreshToken };
        } catch (error) {
            return { success: false, message: 'Internal server error' };
        }
    }
    


    async refreshToken(userId, refreshToken){
        try {
            const user = await User.findById(userId);
            if (!user || user.refresh_token !== refreshToken) {
              return null;
            }
            const accessToken = this.generateAccessToken(user.id);
            return accessToken;
          } catch (error) {
            return null;
          }
    }


    async blockTokens(userId) {
        try {
            await User.blockTokens(userId);
        } catch (error) {
            throw new Error('Error blocking tokens');
        }
    }
}



module.exports = new UserService();