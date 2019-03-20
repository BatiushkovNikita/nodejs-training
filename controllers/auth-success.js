export default class AuthSuccess {

    constructor(code, message, data, token) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.token = token;
    }
}