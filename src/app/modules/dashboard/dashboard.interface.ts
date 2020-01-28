export interface AssignedTask {
    my_task: number;
    our_task: number;
    their_task: number;
}

export interface IUpcomingWeek {
    upcoming_project: Array<data>;
    upcoming_workflow: Array<data>;
    upcoming_task: Array<data>;
}

interface data {
    date: string;
    count: number;
}