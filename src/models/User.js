import {v4 as guid} from 'uuid';

class User{
    id;
    email;
    firstName;
    lastName;
    accountType;

    constructor(id, email, firstName, lastName, accountType){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountType = accountType;
    }
    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
}


// Sample Users
export const kevin = new User(
    guid(),
    'random@gmail.com',
    'Kevin',
    'Smithson',
    'Standard Account'
)

export const damien = new User(
    guid(),
    'random@gmail.com',
    'Damien',
    'Lewis',
    'Standard Account'
)
export const victor = new User(
    guid(),
    'random@gmail.com',
    'Victor',
    'Moses',
    'Standard Account'
)
export const richard = new User(
    guid(),
    'random@gmail.com',
    'Richard',
    'Grayson',
    'Standard Account'
)

export default User;