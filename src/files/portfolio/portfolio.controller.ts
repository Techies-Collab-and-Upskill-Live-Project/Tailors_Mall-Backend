import { Request, Response } from 'express';
import Portfolio from './portfolio.model';
import uploadManager from '../../utils/multer';
import { IPortfolio } from './portfolio.interface';

// Initialize the multer upload manager for portfolios
const upload = uploadManager('portfolios');

// Upload portfolio images middleware
export const uploadPortfolioImages = upload.fields([
    { name: 'files', maxCount: 10 }, // For multiple image uploads
    { name: 'coverImage', maxCount: 1 } // For single cover image
]);

// Create a portfolio
export const createPortfolio = async (req: Request, res: Response) => {
    try {
        // Destructure the required fields from the request body
        const { name, category, description, tags, collaborators, designerId } = req.body;

        // Validate required fields
        if (!name || !category || !description || !designerId) {
            return res.status(400).json({ message: 'Missing required fields: name, category, description, and designerId are required.' });
        }

        // Collect the image URLs from the uploaded files
        const images = req.files['files'] ? req.files['files'].map((file: any) => file.path) : [];
        
        // Check if images were uploaded
        if (images.length === 0) {
            return res.status(400).json({ message: 'At least one image must be uploaded.' });
        }

        // Set the cover image (this should be uploaded separately or the first image can be the cover)
        const coverImage = req.files['coverImage'] && req.files['coverImage'].length > 0 ? req.files['coverImage'][0].path : images[0];

        // Create a new portfolio instance
        const portfolio: IPortfolio = new Portfolio({
            name,
            category,
            description,
            tags: tags ? tags.split(',') : [], // Convert tags from string to array
            collaborators: collaborators ? collaborators.split(',') : [], // Convert collaborators from string to array
            images,
            coverImage,
            designerId,
        });

        await portfolio.save();

        res.status(201).json({ message: 'Portfolio created successfully', portfolio });
    } catch (error) {
        console.error('Error creating portfolio:', error);
        res.status(500).json({ message: 'An unexpected error occurred while creating the portfolio.', error: error.message });
    }
};

// Get all portfolios
export const getAllPortfolios = async (req: Request, res: Response) => {
    try {
        const portfolios = await Portfolio.find().populate('designerId', 'name email'); // Populate designer details
        res.status(200).json(portfolios);
    } catch (error) {
        console.error('Error fetching portfolios:', error);
        res.status(500).json({ message: 'An unexpected error occurred while fetching portfolios.', error: error.message });
    }
};

// Get a specific portfolio by ID
export const getPortfolioById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const portfolio = await Portfolio.findById(id).populate('designerId', 'name email');
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found.' });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ message: 'An unexpected error occurred while fetching the portfolio.', error: error.message });
    }
};

// Update a portfolio
export const updatePortfolio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, description, tags, collaborators } = req.body;

    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, {
            name,
            category,
            description,
            tags: tags ? tags.split(',') : [], // Convert tags from string to array
            collaborators: collaborators ? collaborators.split(',') : [],
        }, { new: true });

        if (!updatedPortfolio) {
            return res.status(404).json({ message: 'Portfolio not found.' });
        }
        
        res.status(200).json({ message: 'Portfolio updated successfully', portfolio: updatedPortfolio });
    } catch (error) {
        console.error('Error updating portfolio:', error);
        res.status(500).json({ message: 'An unexpected error occurred while updating the portfolio.', error: error.message });
    }
};

// Delete a portfolio
export const deletePortfolio = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
        if (!deletedPortfolio) {
            return res.status(404).json({ message: 'Portfolio not found.' });
        }
        
        res.status(200).json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        res.status(500).json({ message: 'An unexpected error occurred while deleting the portfolio.', error: error.message });
    }
};

// Export the controller methods
export {
    createPortfolio,
    uploadPortfolioImages,
    getAllPortfolios,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio,
};

