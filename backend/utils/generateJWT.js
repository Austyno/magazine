const jwt = require('jsonwebtoken');

//method to generate jwt login token
const generateJwtToken = id => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: parseInt(process.env.JWT_EXPIRE),
	});
	return token;
};
module.exports = generateJwtToken;
