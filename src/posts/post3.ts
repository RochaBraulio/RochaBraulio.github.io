
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "3",
  title: "Building a RESTful API with Node.js and Express",
  date: "2024-06-10",
  excerpt: "A comprehensive guide to creating a RESTful API using Node.js and Express.",
  content: `
# Building a RESTful API with Node.js and Express

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Setting Up Your Project

First, initialize your project:

\`\`\`javascript
mkdir my-api
cd my-api
npm init -y
npm install express mongoose dotenv
\`\`\`

## Creating the Server

Create an \`index.js\` file:

\`\`\`javascript
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
\`\`\`

## Creating Models

Create a User model in \`models/User.js\`:

\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
\`\`\`

## Creating Routes

Create routes in \`routes/users.js\`:

\`\`\`javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Create a user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id).select('-password');
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
\`\`\`

Now you have a basic RESTful API with CRUD operations!
`,
  coverImage: "https://images.unsplash.com/photo-1561736778-92e52a7769ef",
  tags: ["Node.js", "Express", "API"]
};

export default post;
