const { checkSchema,validationResult } = require('express-validator');

var password_regx=[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*+-_=])[a-zA-Z0-9!@#$%&*+-_=]{8,16}$/, 'g'];
var password_msg = "The password must contain 8 to 16 characters with atleast 1 uppercase, 1 lowercase, 1 number and 1 special character";
const validateSchema = async (req, res, next, schema) => {
	await checkSchema(schema).run(req);

	const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
		return `${msg}`;
	};
	
	const errors = await validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
    	next();
    }
    else
    {
    	var msg = errors.array({ onlyFirstError: true }).join(', ');
    	if(msg.includes('already register')){
			msg = "Oops! You are Already Registered!";
		}
		if(msg.includes('invalid password')){
			msg = password_msg;
		}
    	
		res.status(400).json({status:400,msg:msg,data:null});
	}
}

/**
* This Function that Verify the valid user register.
*/

const valUserRegister = (req, res, next) => {

	const schema = {
		first_name:{
			exists:{
				errorMessage: 'First_name must required'
			},
			trim:true,
			notEmpty:{
				errorMessage: 'First_name should not be empty',
			},
			isLength:{
				options: { min:3, max:12 },
				errorMessage: 'First_name must be contain 3 to 12 charecters',
			},

		},
		last_name:{
			exists:{
				errorMessage: 'Last_name must required'
			},
			trim:true,
			notEmpty:{
				errorMessage: 'Last_name should not be empty',
			},
			isLength:{
				options: { min:3, max:12 },
				errorMessage: 'Last_name must be contain 3 to 12 charecters',
			},

		},
		email:{
			exists:{
				errorMessage: 'email must required'
			},
			trim:true,
			notEmpty:{
				errorMessage: 'email should not be empty',
			},
			isEmail:{
				errorMessage: 'Please enter valid Email ID'
			},
			normalizeEmail:true
		},
		password:{
			exists:{
				errorMessage: 'password must required'
			},
			trim:true,
			notEmpty:{
				errorMessage: 'password should not be empty',
			},
			matches:{
				options: password_regx,
				errorMessage: 'invalid password'
			}
		}
	}

	validateSchema(req, res, next,schema);
};

/**
* This Function that Verify the valid user login.
*/

const valUserLogin = (req, res, next) => {

	const schema = {
		first_name:{
			exists:{
				errorMessage: 'First_name must required'
			},
			trim:true,
			notEmpty:{
				errorMessage: 'First_name should not be empty',
			},
			isLength:{
				options: { min:3, max:12 },
				errorMessage: 'First_name must be contain 3 to 12 charecters',
			},

		},
		last_name:{
			exists:{
				errorMessage: 'Last_name must required'
			},
			trim:true,
			notEmpty:{
				errorMessage: 'Last_name should not be empty',
			},
			isLength:{
				options: { min:3, max:12 },
				errorMessage: 'Last_name must be contain 3 to 12 charecters',
			},

		},
		email:{
			exists:{
				errorMessage: 'email must required'
			},
			trim:true,
			notEmpty:{
				errorMessage: 'email should not be empty',
			},
			isEmail:{
				errorMessage: 'Please enter valid Email ID'
			},
			normalizeEmail:true
		},
		password:{
			exists:{
				errorMessage: 'password must required'
			},
			trim:true,
			notEmpty:{
				errorMessage: 'password should not be empty',
			},
			matches:{
				options: password_regx,
				errorMessage: 'invalid password'
			}
		}
	}

	validateSchema(req, res, next,schema);
};

module.exports = {valUserRegister,valUserLogin};
