import { test } from "@playwright/test"
import { printLog } from "../../utils/logger"
import { APIs } from "../../utils/apis"
import { AddTaskInfo, initAddTaskInfo } from "../../utils/types"

let api: APIs
let addTaskInfo: AddTaskInfo
let taskID: string


test.beforeAll(async () => {
    addTaskInfo = await initAddTaskInfo()
    api = new APIs()
})

test.describe("API Test @api_critical", () => {
    test("API_01: Add task via API", async ({request}) => {
        printLog("Add task via API")
        const response = await api.addUpdateTaskAPI(request, addTaskInfo)
        taskID = await api.verifyAddTask(response, addTaskInfo)
    })
    
    test("API_02: Get task via API", async ({request}) => {    
        const response = await api.getTaskAPI(request, taskID)
        await api.verifyTaskInfo(response, addTaskInfo)

    })

    test("API_03: Update task via API", async ({request}) => {    
        const newTaskInfo = await initAddTaskInfo({
            TaskID: taskID,
            TaskTitle : "Updated task title"
        })
        await api.addUpdateTaskAPI(request, newTaskInfo)
        const updatedTaskInfo = await api.getTaskAPI(request, taskID)

        await api.verifyTaskInfo(updatedTaskInfo, newTaskInfo)
        
    })

    test("API_04: Delete task via API", async ({request}) => {    
        const response = await api.deleteTaskAPI(request, taskID)
        await api.verifyDeleteTask(response, taskID)
    })
})






