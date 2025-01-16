import { FullConfig } from "@playwright/test";

import dotenv from "dotenv"
import { printLog } from "./logger";


async function globalSetup(config: FullConfig) {

    try {
        if (process.env.test_env) {
            dotenv.config({
                path: `.env.${process.env.test_env}`,
                override: true
            })
            printLog(`[globalSetup] Loaded environment variables from .env.${process.env.test_env}`)
        } else {
            dotenv.config({
                path: `.env.development`,
                override: true
            })
            printLog(`[globalSetup] Loaded environment variables from .env.development`)
        }
    } catch (error) {
        printLog(`[globalSetup] Error loading environment variables: ${error}`, 'error')
    }
}
export default globalSetup;