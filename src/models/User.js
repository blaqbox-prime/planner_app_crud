import {v4 as guid} from 'uuid';

class User{
    id;
    firstName;
    lastName;
    accountType;

    constructor(id, firstName, lastName, accountType){
        this.id = id;
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
    'Kevin',
    'Smithson',
    'Standard Account'
)

export const damien = new User(
    guid(),
    'Damien',
    'Lewis',
    'Standard Account'
)

export default User;