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

const portfolioRouter = Router(); // Renamed to portfolioRouter

// Use the authentication middleware for all routes
portfolioRouter.use(isAuthenticated);

// Define your routes
portfolioRouter.post('/upload', uploadPortfolioImages, createPortfolio); // Endpoint for uploading images and creating a portfolio
portfolioRouter.get('/', getAllPortfolios); // Get all portfolios
portfolioRouter.get('/:id', getPortfolioById); // Get a specific portfolio by ID
portfolioRouter.put('/:id', updatePortfolio); // Update a portfolio
portfolioRouter.delete('/:id', deletePortfolio); // Delete a portfolio

export default portfolioRouter; 

