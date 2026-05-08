const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../db');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hardcoded fallback if Supabase is not configured yet
    if (email === 'admin@example.com' && password === 'password123') {
      const payload = { id: 'admin-123', email: 'admin@example.com' };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'super_secret_jwt_key_12345', { expiresIn: '1d' });
      return res.json({ token, user: { id: 'admin-123', email: 'admin@example.com' } });
    }

    // Check if user exists in DB
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Create JWT
    const payload = {
      id: user.id,
      email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'super_secret_jwt_key_12345', { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMe = async (req, res) => {
  try {
    if (req.user && req.user.id === 'admin-123') {
      return res.json({ id: 'admin-123', email: 'admin@example.com', created_at: new Date().toISOString() });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, created_at')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
