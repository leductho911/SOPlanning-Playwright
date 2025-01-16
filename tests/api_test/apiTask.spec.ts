import { test } from "../../fixtures/fixtures"
import { printLog } from "../../utils/logger"
import { AddTaskInfo, initAddTaskInfo } from "../../utils/types"

let addTaskInfo: AddTaskInfo
let taskID: string

test.beforeAll(async () => {
    addTaskInfo = await initAddTaskInfo()
})

test.describe("API Test @api_critical", () => {
    test("API_01: Add task via API", async ({api}) => {
        printLog("Add task via API")
        const response = await api.addUpdateTaskAPI(addTaskInfo)
        taskID = await api.verifyAddTask(response, addTaskInfo)
    })
    
    test("API_02: Get task via API", async ({api}) => {    
        const response = await api.getTaskAPI(taskID)
        await api.verifyTaskInfo(response, addTaskInfo)
    })

    test("API_03: Update task via API", async ({api}) => {    
        const newTaskInfo = await initAddTaskInfo({
            TaskID: taskID,
            TaskTitle : "Updated task title"
        })
        await api.addUpdateTaskAPI(newTaskInfo)
        const updatedTaskInfo = await api.getTaskAPI(taskID)

        await api.verifyTaskInfo(updatedTaskInfo, newTaskInfo)
        
    })

    test("API_04: Delete task via API", async ({api}) => {    
        const response = await api.deleteTaskAPI(taskID)
        await api.verifyDeleteTask(response, taskID)
    })
})






