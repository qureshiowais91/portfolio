class ErrorResolver extends Error {
    constructor(statusCode, errorMessage) {
        // Call the parent class constructor (Error) with the provided message
        super(errorMessage);

        this.statusCode = statusCode;
        // The error message is set by calling super() with the errorMessage parameter
        // this.message will now hold the error message as well
        this.errorMessage = errorMessage;
    }
}



export { ErrorResolver };