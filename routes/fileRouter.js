const express = require('express');
const router = express.Router();
const FileController = require('../controllers/fileController');
const { authenticateToken } = require('../middleware/authMiddleware');

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Загрузка файла
 *     description: Загружает файл на сервер.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Файл успешно загружен
 *       '500':
 *         description: Ошибка сервера при загрузке файла
 */

router.post('/upload', authenticateToken, upload.single('file'), FileController.upload);

/**
 * @swagger
 * /file/list:
 *   get:
 *     summary: Получение списка файлов
 *     description: Возвращает список загруженных файлов.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Список файлов успешно получен
 *       '500':
 *         description: Ошибка сервера при получении списка файлов
 */

router.get('/list', authenticateToken, FileController.getList);

/**
 * @swagger
 * /file/delete/{id}:
 *   delete:
 *     summary: Удаление файла
 *     description: Удаляет файл по указанному ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID файла для удаления
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Файл успешно удален
 *       '500':
 *         description: Ошибка сервера при удалении файла
 */

router.delete('/delete/:id', authenticateToken, FileController.delete);

/**
 * @swagger
 * /file/{id}:
 *   get:
 *     summary: Получение файла по ID
 *     description: Возвращает информацию о файле по указанному ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID файла
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Информация о файле успешно получена
 *       '500':
 *         description: Ошибка сервера при получении информации о файле
 */

router.get('/:id', authenticateToken, FileController.getById);

/**
 * @swagger
 * /file/update/{id}:
 *   put:
 *     summary: Обновление файла
 *     description: Обновляет информацию о файле по указанному ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID файла для обновления
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Файл успешно обновлен
 *       '500':
 *         description: Ошибка сервера при обновлении файла
 */

router.put('/update/:id', authenticateToken, upload.single('file'), FileController.update);

module.exports = router;