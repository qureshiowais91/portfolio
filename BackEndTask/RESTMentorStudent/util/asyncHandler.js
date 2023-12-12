export function asyncHandler(callback) {
    // return function defination with callback passed
    // making a dynamic function as per need
    return function (req, res, next) {
        callback(req, res, next).catch(next);
    }
}
