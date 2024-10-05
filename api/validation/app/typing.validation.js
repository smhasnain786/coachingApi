const Joi = require('joi');
const  validate  = require('../../helper/ValidateHelper');

	async function typingData(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			email: Joi.string().email().required(),
			
            message: Joi.string().required(),
            name: Joi.string().required(),
            subject: Joi.string().required(),
			file: Joi.object().optional()
		});
		req.body.file = req.file
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

	
module.exports = {typingData}
