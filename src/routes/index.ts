import { Router } from 'express';
import { guiAgentController } from '../controllers/guiAgentController';

const router = Router();

// Health check route
router.get('/healthz', (_req, res) => {
  res.json({ status: 'ok', message: 'Service is healthy' });
});

// GUI Agent routes
router.post('/agent/run', guiAgentController.run.bind(guiAgentController));
router.get('/agent/config', guiAgentController.getConfig.bind(guiAgentController));

export default router;
