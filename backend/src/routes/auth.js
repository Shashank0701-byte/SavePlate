import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { issueToken, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!password || (!email && !phone)) return res.status(400).json({ error: 'Missing credentials' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, passwordHash, role: role || 'customer' });
    const token = issueToken(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, phone, password } = req.body;
  const user = await User.findOne(email ? { email } : { phone });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = issueToken(user);
  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json({ user });
});

export default router;


