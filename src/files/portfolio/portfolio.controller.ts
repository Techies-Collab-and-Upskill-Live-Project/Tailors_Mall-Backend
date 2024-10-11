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

// Create a new portfolio
export const createPortfolio = async (req: Request, res: Response) => {
    try {
        const { name, category, description, tags, collaborators, designerId } = req.body;

        if (!name || !category || !description || !designerId) {
            return res.status(400).json({ message: 'Missing required fields: name, category, description, and designerId are required.' });
        }

        const images = req.files && 'files' in req.files ? (req.files['files'] as Express.Multer.File[]).map(file => file.path) : [];

        if (images.length === 0) {
            return res.status(400).json({ message: 'At least one image must be uploaded.' });
        }

        const coverImage = req.files && 'coverImage' in req.files && req.files['coverImage'].length > 0
            ? (req.files['coverImage'] as Express.Multer.File[])[0].path
            : images[0];

        const portfolio: IPortfolio = new Portfolio({
            name,
            category,
            description,
            tags: tags ? tags.split(',') : [],
            collaborators: collaborators ? collaborators.split(',') : [],
            images,
            coverImage,
            designerId,
        });

        await portfolio.save();
        res.status(201).json({ message: 'Portfolio created successfully', portfolio });
    } catch (error) {
        console.error('Error creating portfolio:', error);
        res.status(500).json({ message: 'An unexpected error occurred while creating the portfolio.', error: (error as Error).message });
    }
};

// Get all portfolios
export const getAllPortfolios = async (req: Request, res: Response) => {
    try {
        const portfolios = await Portfolio.find();
        res.status(200).json({ portfolios });
    } catch (error) {
        console.error('Error fetching portfolios:', error);
        res.status(500).json({ message: 'An error occurred while fetching the portfolios.', error: (error as Error).message });
    }
};

// Get a portfolio by ID
export const getPortfolioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found.' });
        }

        res.status(200).json({ portfolio });
    } catch (error) {
        console.error('Error fetching portfolio by ID:', error);
        res.status(500).json({ message: 'An error occurred while fetching the portfolio.', error: (error as Error).message });
    }
};

// Update a portfolio
export const updatePortfolio = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedPortfolio) {
            return res.status(404).json({ message: 'Portfolio not found.' });
        }

        res.status(200).json({ message: 'Portfolio updated successfully', portfolio: updatedPortfolio });
    } catch (error) {
        console.error('Error updating portfolio:', error);
        res.status(500).json({ message: 'An error occurred while updating the portfolio.', error: (error as Error).message });
    }
};

// Delete a portfolio
export const deletePortfolio = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedPortfolio = await Portfolio.findByIdAndDelete(id);

        if (!deletedPortfolio) {
            return res.status(404).json({ message: 'Portfolio not found.' });
        }

        res.status(200).json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        res.status(500).json({ message: 'An error occurred while deleting the portfolio.', error: (error as Error).message });
    }
};

