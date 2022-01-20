import { StringifyOptions } from "query-string";

export class Users {
    constructor(
        public password: string,
        public login: string,
        public prenom: string,
        public nom: string,
    ) {}
}
