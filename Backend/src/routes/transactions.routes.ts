import { Router } from 'express'
import { createTransactionHandler, getTransactionsHandler } from '../controllers/transactions.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Transacciones
 *   description: Operaciones de transacciones
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Registrar una nueva transacción
 *     tags: [Transacciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moneda
 *               - monto
 *               - descripcion
 *               - nombre
 *               - tipo_documento
 *               - numero_tarjeta
 *               - fecha_vencimiento
 *               - codigo_seguridad
 *             properties:
 *               moneda:
 *                 type: string
 *                 example: COP
 *               monto:
 *                 type: number
 *                 example: 250000
 *               descripcion:
 *                 type: string
 *                 example: Pago de servicios
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               tipo_documento:
 *                 type: string
 *                 example: Cédula
 *               numero_tarjeta:
 *                 type: string
 *                 example: 4111111111111111
 *               fecha_vencimiento:
 *                 type: string
 *                 example: 12/26
 *               codigo_seguridad:
 *                 type: string
 *                 example: 123
 *     responses:
 *       201:
 *         description: Transacción registrada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createTransactionHandler)

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Obtener todas las transacciones (requiere autenticación)
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   moneda:
 *                     type: string
 *                     example: USD
 *                   monto:
 *                     type: number
 *                     example: 100
 *                   descripcion:
 *                     type: string
 *                     example: Compra en línea
 *                   nombre:
 *                     type: string
 *                     example: Ana Gómez
 *                   tipo_documento:
 *                     type: string
 *                     example: Pasaporte
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-09-29T14:10:12Z"
 *       401:
 *         description: Token inválido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', authenticateToken, getTransactionsHandler)

export default router
