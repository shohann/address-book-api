module.exports.pagination = async (req, res, next) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (page && page >= 1 && limit && limit >=1) {
        let skip = (page - 1) * limit;
        req.limit = limit.toString();
        req.skip = skip.toString();
        next();
    } else if (page < 1 || limit < 1) {
        return res.status(404).json({
            success: false,
            message: 'Invalid request'
        });
    } else {
        req.skip = 1;
        req.limit = 2;
    }
};


// localhost:3001/api/contacts?page=1&limit=2