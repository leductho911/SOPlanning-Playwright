import { test } from '../../fixtures/fixtures';
import { printLog } from '../../utils/logger';
import { AddTaskInfo, initAddTaskInfo } from '../../utils/types';

let addTaskInfo: AddTaskInfo

test('Add task', async ({ pm }) => {
    addTaskInfo = await initAddTaskInfo()
    printLog("Add task")
    await pm.onPlanningPage.clickAddTaskButton()
    await pm.onPlanningPage.enterTitle(addTaskInfo.TaskTitle)
    await pm.onPlanningPage.selectProject("Call of duty (COD) ") //TODO: hard data, improve later
    await pm.onPlanningPage.selectUser(["John Wick - user1", "Mary Adams - user2"]) //TODO: hard data, improve later

    printLog("VP: Verify modal title")
    await pm.onPlanningPage.verifyModalTitle("New task")
})