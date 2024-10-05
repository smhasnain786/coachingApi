
const Joi = require('joi');
const  validate  = require('../../helper/ValidateHelper');

	async function changeStatusValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			emailId: Joi.string().email().required(),
			password: Joi.string().required(),
		});
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

    exports.module = {changeStatusValidation}