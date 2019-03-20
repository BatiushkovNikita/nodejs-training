export default class AuthError {

    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}