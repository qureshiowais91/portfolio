const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode||500).json({
        success: false,
        eventType:err.eventType,
        msg: err.message ||'Undefine Error'
    });
};


module.exports = errorHandler;