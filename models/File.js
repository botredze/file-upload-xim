const db = require('../config/db')


class File {
    constructor(){
        this.db = db
    }

    async uploadFile (filename, extension, mimeType, size, uploadDate) {
        try {
            const query = 'INSERT INTO files (filename, extension, mime_type, size, upload_date) VALUES (?, ?, ?, ?, ?)';
            const result = await this.db.query(query, [filename, extension, mimeType, size, uploadDate]);
            return result.insertId;
        }catch(error) {
            throw new Error('Error uploading file');
        }
    }

    async getFileList(listSize, page) {
        try {
            const offset = `${page - 1}`;
            const limit = `${listSize}`;
            const query = 'SELECT * FROM files LIMIT ?, ?';
            const results = await this.db.query(query, [offset, limit ]);
            return results;
        } catch (error) {
            console.log(error);
            throw new Error('Error getting file list');
        }
    }
    

    async deleteFile(fileId) {
        try {
        const query = 'DELETE FROM files WHERE id = ?';
        await this.db.query(query, [fileId]);
        } catch (error) {
        throw new Error('Error deleting file');
        }
    }

    async getFileById(fileId) {
        try {
        const query = 'SELECT * FROM files WHERE id = ?';
        const results = await this.db.query(query, [fileId]);
        if (results.length === 0) {
            throw new Error('File not found');
        }
        return results[0];
        } catch (error) {
        throw new Error('Error getting file by id');
        }
    }

    async updateFile(filename, extension, mimeType, size, uploadDate, fileId) {
        try {
        const query = 'UPDATE files SET filename = ?, extension = ?, mime_type = ?, size = ?, upload_date = ? WHERE id = ?';
        await this.db.query(query, [filename, extension, mimeType, size, uploadDate, fileId]);
        } catch (error) {
            console.log(error);
        throw new Error('Error updating file');
        }
    }
}

module.exports = new File()