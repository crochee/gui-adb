import { Request, Response, NextFunction } from "express";
import { guiAgentService } from "../services/guiAgentService";

/**
 * GUI Agent Controller
 */
export class GUIAgentController {
  /**
   * Run the GUI Agent with the given input
   */
  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { input } = req.body;

      const result = await guiAgentService.run(input);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getConfig(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await guiAgentService.getConfig();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

// Create a singleton instance of the controller
export const guiAgentController = new GUIAgentController();
