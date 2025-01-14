import { test } from '../../fixtures/fixtures';
import { printLog } from '../../utils/logger';
import { AddTaskInfo, initAddTaskInfo } from '../../utils/types';

let addTaskInfo: AddTaskInfo

test('Add_task', async ({ pm }) => {
    addTaskInfo = await initAddTaskInfo()
    printLog("Add task")
    await pm.onPlanningPage.clickAddTaskButton()
    await pm.onPlanningPage.enterTitle(addTaskInfo.TaskTitle)
    await pm.onPlanningPage.selectProject(addTaskInfo.ProjectID)
    await pm.onPlanningPage.selectUser([`${addTaskInfo.UserName} - ${addTaskInfo.UserID}`])

    printLog("VP: Verify modal title")
    await pm.onPlanningPage.verifyModalTitle("New task")
})