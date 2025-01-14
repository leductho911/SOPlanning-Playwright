import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import ENV from "./env";
import { printLog } from "./logger";
import { AddTaskInfo } from "./types";


export class APIs {

    private apiURL: string

    constructor() {
        this.apiURL = `${ENV.BASE_URL}/api/endpoint`
    }

    /**
     * Retrieves information about a task identified by `taskID` via the API.
     * @param request - The Playwright APIRequestContext.
     * @param {string} taskID - The unique identifier for the task whose information is to be retrieved.
     * @returns {Promise<APIResponse>} - A promise that resolves with the response from the API if successful, or a rejected promise if not.
     */
    public async getTaskAPI(request: APIRequestContext, taskID: string): Promise<APIResponse> {
        try {
            printLog("  [API] Send request : Get task info")
            return await request.get(`${this.apiURL}/tasks/${taskID}`)
        } catch (error) {
            printLog(`  [API] Error getting task ID ${taskID}: ${error}`, 'error')
            throw error
        }
    }

    /**
     * Adds a new task via API.
     * Update a task via API: provide `taskID`
     * @param request - The Playwright APIRequestContext.
     * @param {AddTaskInfo} taskInfo - The information about the task to add or update.
     * @returns {Promise<APIResponse>} - The response from the API if successful, or a rejected promise if not.
     */
    public async addUpdateTaskAPI(request: APIRequestContext, taskInfo: AddTaskInfo): Promise<APIResponse> {
        try {
            printLog("  [API] Send request : Add/Update task")
            return await request.post(`${this.apiURL}/tasks`, {
                form: {
                    task_id: taskInfo.TaskID,
                    link_id: "",
                    user_id: taskInfo.UserID,
                    project_id: taskInfo.ProjectID,
                    start_date: taskInfo.StartDate,
                    end_date: taskInfo.EndDate,
                    title: taskInfo.TaskTitle,
                    status_id: taskInfo.StatusID,
                    duration: taskInfo.Duration
                }
            })
        } catch (error) {
            printLog(`  [API] Error add/update task: ${error}`, 'error')
            throw error
        }
    }

    
    /**
     * Deletes a task via the API.
     * @param request - The Playwright APIRequestContext.
     * @param {string} taskID - The unique identifier for the task to be deleted.
     * @returns {Promise<APIResponse>} - The response from the API if successful, or a rejected promise if not.
     */
    public async deleteTaskAPI(request: APIRequestContext, taskID: string): Promise<APIResponse> {
        try {
            printLog("  [API] Send request : Delete task")
            return await request.delete(`${this.apiURL}/tasks/${taskID}`)
        } catch (error) {
            printLog(`  [API] Error deleting task: ${error}`, 'error')
            throw error
        }
    }

    /**
     * Validate response code is equal to expected
     * @param response - APIResponse
     * @param expected - expected response code
     */
    private validateResponseCode(response: APIResponse, expected: number){
        try {
            expect(response.status()).toBe(expected)
        } catch (error) {
            printLog(`  [API] Response validation failed: Expected status ${expected} but got ${response.status()}`, 'error')
        }
    }


    async verifyAddTask(response: APIResponse, addTaskInfo: AddTaskInfo): Promise<string> {
        this.validateResponseCode(response, 200)
        const responseData = await response.json() // Get the JSON data from the response. 
        // Since response.json() returns a Promise, you need to await it 
        const taskID = responseData.data.task_id
        expect(responseData.data.title).toBe(addTaskInfo.TaskTitle)
        expect(responseData.data.project_id).toBe(addTaskInfo.ProjectID)
        expect(responseData.data.user_id).toBe(addTaskInfo.UserID)
        printLog(`  [API] Add task successfully. Task ID: ${taskID}`)
        return taskID
    }

    async verifyTaskInfo(response: APIResponse, addTaskInfo: AddTaskInfo) {
        this.validateResponseCode(response, 200)
        const responseData = await response.json()
        expect(responseData.data.title).toBe(addTaskInfo.TaskTitle)
        expect(responseData.data.project_id).toBe(addTaskInfo.ProjectID)
        expect(responseData.data.user_id).toBe(addTaskInfo.UserID)
    }

    async verifyDeleteTask(response: APIResponse, taskID: string) {
        this.validateResponseCode(response, 200)
        const responseData = await response.json()
        expect(responseData.data.task_id).toBe(taskID)
        printLog(`  [API] Delete task successfully. Task ID: ${taskID}`)
    }

}