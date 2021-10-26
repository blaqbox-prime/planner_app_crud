import {v4} from "uuid";
import {damien, kevin} from './User';

class Task{
    id;
    title;
    author;
    date_created;
    category;
    status = 'new';

    constructor(id, author,date_created, title, category, status){
        this.id = id;
        this.author = author;
        this.date_created = date_created;
        this.title = title;
        this.category = category;
        this.status = status;
    }

    getFormattedDate(){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${this.date_created.getDate()} ${months[this.date_created.getMonth()]}, ${this.date_created.getFullYear()}`
    }

    create(){
        fetch('http://127.0.0.1:3002/task/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.id,
                author: this.author.id,
                title: this.title,
                category: this.category,
                status: this.status,
                date: this.date_created,
            })
        }).then((res) => console.log(res)).catch(err => console.error(err));
    }

    update(){
        fetch('http://127.0.0.1:3002/task/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.id,
                title: this.title,
                category: this.category,
                date: this.date_created,
            })
        }).then((data) => {console.log(data.message)}).catch(err => console.error(err));
    }

    updateStatus(status){
        fetch(`http://127.0.0.1:3002/task/update-status/${this.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                status: status
            })
        }).then((data) => {console.log(data.message)}).catch(err => console.error(err));
    }

    delete(){
        fetch(`http://127.0.0.1:3002/task/delete/${this.id}`, {
            method: 'DELETE',
        }).then((data) => {console.log(data)}).catch(err => console.error(err));
    }
}

export default Task;

// sample data

export const tasks = [
    new Task(
        v4(),
        kevin,
        new Date('8 Sep, 2021'),
        'Contact bank regarding suspicious activity on debit card',
        'personal',
        'completed'
    ),
    new Task(
        v4(),
        damien,
        new Date('23 Sep, 2021'),
        'Push new workflows to github branch',
        'functionality',
        'inProgress'
    ),
    new Task(
        v4(),
        kevin,
        new Date(),
        'Update user flows with uUX feedback from Session #245',
        'design',
        'incomplete'
    ),
    new Task(
        v4(),
        kevin,
        new Date(),
        'Wireframe splash page for new sales funnel', 
        null,
        'incomplete'
    ),
    new Task(
        v4(),
        damien,
        new Date('12 Dec, 2021'),
        'Contact bank regarding suspicious activity on credit card',
        null,
        'incomplete'
    )
    
]