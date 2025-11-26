import { GUIAgent } from "@gui-agent/agent-sdk";
import { AdbOperator } from "@gui-agent/operator-adb";

import { logger } from "../utils/logger";
import { serviceUnavailableError } from "../utils/errors";
// import { SYSTEM_PROMPT } from "./prompt";

// Define types for GUI Agent service
export interface AgentConfig {
  modelId: string;
  modelProvider: string;
  modelBaseURL: string;
  modelApiKey: string;
}

export interface AgentRunInput {
  type: "text";
  text: string;
}

export interface AgentRunOutput {
  content: string;
}

export class GUIAgentService {
  private config: AgentConfig;
  private agent: GUIAgent<any>;

  constructor(config: AgentConfig) {
    this.config = config;
    this.agent = new GUIAgent({
      operator: new AdbOperator(),
      model: {
        id: config.modelId,
        provider: config.modelProvider as any,
        baseURL: config.modelBaseURL,
        apiKey: config.modelApiKey,
      },
    });
    logger.info("GUI Agent Service initialized", {
      config: { ...config, modelApiKey: "***" },
    });
  }

  /**
   * Run the GUI Agent with the given input
   */
  async run(input: AgentRunInput[]): Promise<AgentRunOutput> {
    try {
      logger.info("Running GUI Agent", { input });

      // Run the agent with the provided input
      const response = await this.agent.run({
        input: input,
      });

      logger.info("GUI Agent run completed", { response });
      return { content: response.content };
    } catch (error) {
      logger.error("Error running GUI Agent", { error });
      if (error instanceof Error) {
        throw serviceUnavailableError(
          `Failed to run GUI Agent: ${error.message}`,
        );
      }
      throw serviceUnavailableError("Failed to run GUI Agent");
    }
  }

  /**
   * Get agent configuration
   */
  async getConfig(): Promise<AgentConfig> {
    return { ...this.config, modelApiKey: "***" };
  }
}

// Create a singleton instance of the GUIAgentService
const createGUIAgentService = () => {
  const config: AgentConfig = {
    modelId: process.env.MODEL_ID || process.env.DOUBAO_SEED_1_6 || "",
    modelProvider: process.env.MODEL_PROVIDER || "volcengine",
    modelBaseURL: process.env.MODEL_BASE_URL || process.env.ARK_BASE_URL || "",
    modelApiKey: process.env.MODEL_API_KEY || process.env.ARK_API_KEY || "",
  };

  return new GUIAgentService(config);
};

export const guiAgentService = createGUIAgentService();
