// Load environment variables first, before any other imports
import dotenv from 'dotenv';
dotenv.config();

// Now import other modules
import app from './server';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
