const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Регистрация пользователя
 *     description: Создает нового пользователя в системе.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Успешно зарегистрирован
 *       '400':
 *         description: Ошибка при регистрации
 */

router.post('/signup', UserController.register);

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Авторизация пользователя
 *     description: Авторизует пользователя и выдает токены доступа и обновления.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Успешная авторизация
 *       '401':
 *         description: Неверные учетные данные
 */

router.post('/signin', UserController.login);


/**
 * @swagger
 * /signin/new_token:
 *   post:
 *     summary: Обновление токена
 *     description: Обновляет токен по истичению 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               refreshToken:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Успешная авторизация
 *       '401':
 *         description: Не авторизован
 */
router.post('/signin/new_token', authenticateToken, UserController.refreshAccessToken);

/**
 * @swagger
 * /info:
 *   get:
 *     summary: возвращает id пользователя
 *     description: При удачной регистрации вернуть пару bearer токен и refresh токен;
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Успешная авторизация
 *       '401':
 *         description: Неверные учетные данные
 */
router.get('/info', authenticateToken, UserController.getUserInfo);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: выйти из системы;
 *     description: Диактивация токена.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                userId:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Успешная авторизация
 *       '401':
 *         description: Неверные учетные данные
 */
router.get('/logout',  authenticateToken, UserController.logout);

module.exports = router;

