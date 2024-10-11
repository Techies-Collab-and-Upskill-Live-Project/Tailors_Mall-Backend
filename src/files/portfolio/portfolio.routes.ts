import { Router } from 'express';
import {
    createPortfolio,
    uploadPortfolioImages,
    getAllPortfolios,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
} from './portfolio.controller';
import { isAuthenticated } from '../../utils';

const portfolioRouter = Router();

// Use the authentication middleware for all routes
portfolioRouter.use(isAuthenticated);

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: Portfolio management
 */

/**
 * @swagger
 * /portfolio/upload:
 *   post:
 *     summary: Upload portfolio images and create a portfolio
 *     tags: [Portfolio]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               coverImage:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: string
 *               collaborators:
 *                 type: string
 *               designerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Portfolio created successfully
 *       400:
 *         description: Missing required fields or no images uploaded
 *       500:
 *         description: An unexpected error occurred
 */
portfolioRouter.post('/upload', uploadPortfolioImages, createPortfolio);

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: Get all portfolios
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: A list of portfolios
 *       500:
 *         description: An error occurred while fetching portfolios
 */
portfolioRouter.get('/', getAllPortfolios);

/**
 * @swagger
 * /portfolio/{id}:
 *   get:
 *     summary: Get a specific portfolio by ID
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the portfolio to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The portfolio with the specified ID
 *       404:
 *         description: Portfolio not found
 *       500:
 *         description: An error occurred while fetching the portfolio
 */
portfolioRouter.get('/:id', getPortfolioById);

/**
 * @swagger
 * /portfolio/{id}:
 *   put:
 *     summary: Update a portfolio
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the portfolio to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: string
 *               collaborators:
 *                 type: string
 *     responses:
 *       200:
 *         description: Portfolio updated successfully
 *       404:
 *         description: Portfolio not found
 *       500:
 *         description: An error occurred while updating the portfolio
 */
portfolioRouter.put('/:id', updatePortfolio);

/**
 * @swagger
 * /portfolio/{id}:
 *   delete:
 *     summary: Delete a portfolio
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the portfolio to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Portfolio deleted successfully
 *       404:
 *         description: Portfolio not found
 *       500:
 *         description: An error occurred while deleting the portfolio
 */
portfolioRouter.delete('/:id', deletePortfolio);

export default portfolioRouter;

