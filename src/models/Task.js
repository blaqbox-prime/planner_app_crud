import {v4} from "uuid";
import {damien, kevin} from './User';

class Task{
    id;
    title;
    author;
    date_created;
    category;
    status;

    constructor(id,author,date_created, title, category, status){
        this.id = id;
        this.author = author;
        this.date_created = date_created;
        this.title = title;
        this.category = category;
        this.status = status;
    }

    save(){}

    delete(){}
}

export default Task;

// sample data

export const task_1 = new Task(
    v4(),
    damien,
    Date(),
    'Contact bank regarding suspicious activity on credit card',
    null,
    'incomplete'
)
export const task_2 = new Task(
    v4(),
    kevin,
    Date(),
    'Wireframe splash page for new sales funnel', 
    null,
    'incomplete'
)
export const task_3 = new Task(
    v4(),
    kevin,
    new Date('8 Sep, 2021'),
    'Update user flows with uUX feedback from Session #245',
    'design',
    'incomplete'
)
export const task_4 = new Task(
    v4(),
    damien,
    new Date('8 Sep, 2021'),
    'Push new workflows to github branch',
    null,
    'incomplete'
)
export const task_5 = new Task(
    v4(),
    kevin,
    new Date('8 Sep, 2021'),
    'Contact bank regarding suspicious activity on debit card',
    null,
    'incomplete'
)

export const tasks = [
    task_1,
    task_2,
    task_3,
    task_4,
    task_5,
]