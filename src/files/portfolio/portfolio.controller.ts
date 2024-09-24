import { Request, Response, NextFunction } from "express";
import PortfolioService from "./portfolio.service";
import { CustomError } from "../../utils/error";
import { IPortfolioItem } from "./portfolio.interface";

// Portfolio Controller Class
class PortfolioController {
  // Create a new portfolio item
  async createPortfolio(req: Request, res: Response, next: NextFunction) {
    try {
      const portfolioData: IPortfolioItem = {
        designerId: req.body.designerId, // Assuming designerId is passed in the request body
        mediaType: req.body.mediaType,
        mediaURL: req.body.mediaURL,
        description: req.body.description,
        tags: req.body.tags,
        categories: req.body.categories,
        views: 0, // Initialize to 0
        likes: 0, // Initialize to 0
        comments: [],
        isFeatured: req.body.isFeatured || false,
        isPublic: req.body.isPublic || true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newPortfolioItem = await PortfolioService.createPortfolioItem(portfolioData);
      res.status(201).json({ data: newPortfolioItem });
    } catch (error) {
      next(error);
    }
  }

  // Get all portfolio items
  async getAllPortfolios(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query; // Get query parameters
      const pagination = {
        page: parseInt(req.query.page as string) || 1, // Default to page 1
        limit: parseInt(req.query.limit as string) || 10, // Default limit
      };

      const portfolioItems = await PortfolioService.getAllPortfolioItems(query, pagination);
      res.status(200).json(portfolioItems);
    } catch (error) {
      next(error);
    }
  }

  // Get a portfolio item by ID
  async getPortfolioById(req: Request, res: Response, next: NextFunction) {
    try {
      const portfolioItem = await PortfolioService.getPortfolioItemById(req.params.id);
      res.status(200).json({ data: portfolioItem });
    } catch (error) {
      next(error);
    }
  }

  // Update a portfolio item
  async updatePortfolio(req: Request, res: Response, next: NextFunction) {
    try {
      const updateData: Partial<IPortfolioItem> = req.body; // Get update data from request body
      const updatedPortfolioItem = await PortfolioService.updatePortfolioItem(req.params.id, updateData);
      res.status(200).json({ data: updatedPortfolioItem });
    } catch (error) {
      next(error);
    }
  }

  // Delete a portfolio item
  async deletePortfolio(req: Request, res: Response, next: NextFunction) {
    try {
      await PortfolioService.deletePortfolioItem(req.params.id);
      res.status(204).send(); // No content
    } catch (error) {
      next(error);
    }
  }
}

// Export an instance of the PortfolioController
export default new PortfolioController();

