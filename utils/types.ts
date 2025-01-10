import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

export interface AddTaskInfo {
    TaskTitle: string
    TaskDescription: string
    Notes: string
    Number: string
    Contact?: string // optional
}

export async function initAddTaskInfo(options?: Partial<AddTaskInfo>): Promise<AddTaskInfo> {
    const defaults = {
        TaskTitle: faker.lorem.sentence(10),
        TaskDescription: faker.lorem.paragraphs({min: 1, max: 5}),
        Notes: faker.person.jobDescriptor(),
        Number: uuidv4() // get the number from uuid lib
    }
    return {
        ...defaults,
        ...options
    }
}