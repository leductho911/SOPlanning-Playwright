import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import ENV from './env'
import { DateHelpers } from './helpers'

export interface AddTaskInfo {
    TaskTitle: string
    TaskDescription: string
    Notes: string
    Number: string
    UserID: string
    ProjectID: string
    StartDate: string
    EndDate: string
    StatusID: string
    Duration: string
    Contact?: string
    LinkID?: string
    UserName: string
    TaskID: string
}

export async function initAddTaskInfo(options?: Partial<AddTaskInfo>): Promise<AddTaskInfo> {
    const dateHelpers = new DateHelpers()

    const defaults = {
        TaskTitle: faker.lorem.sentence(3),
        TaskID: "",
        UserID: `${ENV.DEFAULT_USER_ID}`,
        UserName: `${ENV.DEFAULT_USER_NAME}`,
        ProjectID: `${ENV.DEFAULT_PROJECT_ID}`,
        StartDate: await dateHelpers.getCurrentDate(),
        EndDate: await dateHelpers.getCurrentDate("YYYY-MM-DD", 1),
        StatusID: "todo",
        Duration: "08:00",
        TaskDescription: faker.lorem.paragraphs({min: 1, max: 5}),
        Notes: faker.person.jobDescriptor(),
        Number: uuidv4() // get the number from uuid lib
    }
    return {
        ...defaults,
        ...options
    }
}