const FileService = require('../service/fileService');
const fs = require('fs');
const path = require('path');


class FileController {
    async upload(req, res) {
        const { originalname, mimetype, size } = req.file;
        const extension = path.extname(originalname).toLowerCase();
        const uploadDate = new Date();
    
        try {
          const fileId = await FileService.uploadFile(originalname, extension, mimetype, size, uploadDate, req.file.path);
          res.status(201).json({ fileId });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    }

  async getList(req, res) {
    const { listSize, page } = req.query;
    try {
      const fileList = await FileService.getFileList(listSize, page);
      res.status(200).json(fileList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    const fileId = req.params.id;
    try {
      await FileService.deleteFile(fileId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    const fileId = req.params.id;
    try {
      const file = await FileService.getFileById(fileId);
      res.status(200).json(file);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    const fileId = req.params.id;
    const newFile = req.file;
    try {
        const oldFile = await FileService.getFileById(fileId);
        const filePath = path.join('uploads', `${oldFile.id}${oldFile.extension}`);
        //await FileService.deleteFile(fileId);
        fs.unlinkSync(filePath);
        
        const { originalname, mimetype, size } = newFile;
        const extension = path.extname(originalname).toLowerCase();
        const uploadDate = new Date();
        const newFileId = await FileService.updateFile(fileId, originalname, extension, mimetype, size, uploadDate, newFile.path);
        
        res.status(200).json({ fileId: newFileId });
    } catch (error) {
      console.log(error);
        res.status(500).json({ message: error.message });
    }
}
}

module.exports = new FileController();
