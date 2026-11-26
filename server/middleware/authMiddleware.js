const { createRemoteJWKSet, jwtVerify } = require('jose');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL must be defined in server/.env');
}

// Supabase JWKS endpoint
const JWKS_URL = new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`);
const JWKS = createRemoteJWKSet(JWKS_URL);
const ISSUER = `${supabaseUrl}/auth/v1`;

const verifySupabaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or malformed Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token using modern remote JWKS
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
    });

    req.user = payload; // Contains sub (UUID), email, user_metadata, etc.
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired authentication token', details: error.message });
  }
};

module.exports = verifySupabaseToken;
