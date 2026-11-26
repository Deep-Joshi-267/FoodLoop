const db = require('../config/db');

const userModel = {
  // Find user by their Supabase UUID
  findById: async (id) => {
    const res = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  },

  // Find user by email
  findByEmail: async (email) => {
    const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  },

  // Upsert user on login/sync
  upsertUser: async ({ id, email, fullName, role, phone = null, address = null, businessName = null }) => {
    const existing = await db.query('SELECT * FROM users WHERE id = $1', [id]);

    if (existing.rows.length > 0) {
      // User already exists, update their record and return
      const updateQuery = `
        UPDATE users 
        SET full_name = COALESCE($2, full_name),
            updated_at = now()
        WHERE id = $1
        RETURNING *;
      `;
      const updateRes = await db.query(updateQuery, [id, fullName]);
      return updateRes.rows[0];
    } else {
      // New user, insert with initial role determined by entry button
      const insertQuery = `
        INSERT INTO users (id, email, full_name, role, phone, address, business_name, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now())
        RETURNING *;
      `;
      const insertRes = await db.query(insertQuery, [
        id,
        email,
        fullName,
        role,
        phone,
        address,
        businessName,
      ]);
      return insertRes.rows[0];
    }
  },
};

module.exports = userModel;
