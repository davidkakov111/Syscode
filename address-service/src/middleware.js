const basicAuth = require('basic-auth');
require('dotenv').config();

// Of course, in a real-world scenario, we would check the user's credentials against a user table. 
// This would involve verifying that the provided email matches an existing email and that the 
// stored hashed password matches the hashed version of the provided password. As authentication, 
// we would then generate a JWT (JSON Web Token) using these credentials and our JWT secret, 
// which would be returned to the client for subsequent authentication. 
// However, since basic authentication was requested, just keep it simple.

// Basic Authentication middleware
const authenticate = (req, res, next) => {
  // Check if authentication is disabled via environment variable (for tests)
  if (process.env.DISABLE_AUTH === 'true') {
    console.log('Authentication is skipped.');
    return next();
  }

  const credentials = basicAuth(req);

  if (!credentials || credentials.name !== process.env.AUTH_NAME || credentials.pass !== process.env.AUTH_PASSWORD) {
    res.setHeader('WWW-Authenticate', 'Basic realm=Address Service');
    return res.status(401).send('Authentication required');
  }

  next();
};

module.exports = authenticate;