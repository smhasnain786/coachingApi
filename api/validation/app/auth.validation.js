const Joi = require('joi');
const  validate  = require('../../helper/ValidateHelper');

	async function loginValidation(
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

	async function forgotPasswordValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			emailId: Joi.string().email().required()
		});
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

	async function signUpValidation(
		req,
		res,
		next
	) {
		const schema = Joi.object().keys({
			emailId: Joi.string().email().required(),
			name: Joi.string().required(),
			// lastName: Joi.string().required(),
			state: Joi.string().required(),
			mobileNumber: Joi.string()
				.pattern(new RegExp('^[0-9]{10}$'))
				.required()
				.messages({
				'string.pattern.base': 'Mobile number must be a 10-digit',
				'any.required': 'Mobile number is required'
				}),
			// type: Joi.string().required(),
			password: Joi.string()
						.min(8)
						.required()
						.pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
						.message({
						'string.pattern.base': 'Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number',
						'string.min': 'Password must be at least 8 characters long',
						'any.required': 'Password is required'
						}),
			Cpassword: Joi.string()
			.valid(Joi.ref('password'))
			.required()
			.messages({
				'any.only': 'Password and confirm password do not match',
				'any.required': 'Confirm password is required'
			})
			// referral_from_id: Joi.string().allow('').optional(),
		});
		const isValid = await validate(req.body, res, schema);
		if (isValid) {
			next();
		}
	}

module.exports = { loginValidation, signUpValidation, forgotPasswordValidation }
