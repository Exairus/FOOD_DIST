"use strict";

class User {
    constructor(name, age) {
        this.name = name;
        this._age = age;
    }

    #surname = 'Petrychenko';

    say = () => {
        console.log(`Имя пользователя ${this.name}${this.#surname}, возраст ${this._age}`);
    }

    get userSurname() {
        return this.#surname;
    }

    set userSurname(surname) {
        this.#surname = surname;
    }
}

const ivan = new User("Ivan", 27);
console.log(ivan.userSurname);
console.log(ivan.userSurname = 'Zibrov');
console.log(ivan.say());