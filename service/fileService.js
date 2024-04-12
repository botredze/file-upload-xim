const File = require('../models/File');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '..', 'uploads');

class FileService {

    async uploadFile(filename, extension, mimeType, size, uploadDate, filePath) {
        try {
          const fileId = await File.uploadFile(filename, extension, mimeType, size, uploadDate);
          const newFilePath = path.join(uploadDir, fileId + extension);
          fs.renameSync(filePath, newFilePath);
          return fileId;
        } catch (error) {
          throw new Error('Error uploading file');
        }
    }
    
    async getFileList(listSize, page) {
      try {
        const fileList = await File.getFileList(listSize, page);
        return fileList;
      } catch (error) {
        console.log(error);
        throw new Error('Error getting file list');
      }
    }
  
    async deleteFile(fileId) {
      try {
        const file = await File.getFileById(fileId);
        const filePath = path.join('uploads', `${file.id}${file.extension}`);
        fs.unlinkSync(filePath);
        await File.deleteFile(fileId);
      } catch (error) {
        throw new Error('Error deleting file');
      }
    }
  
    async getFileById(fileId) {
      try {
        const file = await File.getFileById(fileId);
        return file;
      } catch (error) {
        throw new Error('Error getting file by id');
      }
    }
  
    async updateFile(fileId, filename, extension, mimeType, size, uploadDate, filePath) {
      try {
        await File.updateFile(fileId, filename, extension, mimeType, size, uploadDate);
        const newFilePath = path.join(uploadDir, fileId + extension);
        fs.renameSync(filePath, newFilePath);

        return fileId
      } catch (error) {
        console.log(error);
        throw new Error('Error updating file');
      }
    }
  }
  
  module.exports = new FileService();