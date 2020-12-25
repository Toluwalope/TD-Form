let errorHandler = function(res, error) {
	return res.status(400).json({
		message: error.message
	});
};

export default errorHandler;
