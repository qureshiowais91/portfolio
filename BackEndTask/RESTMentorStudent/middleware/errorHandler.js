const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        succsess: false,
        statusCode: err.statusCode || 500,
        message: err.message || 'Undefined Error!',
    });
};

export { errorHandler }  