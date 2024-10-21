const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const FileStore = require('session-file-store')(session); // Add session-file-store
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');  // To handle cookies
const { protect } = require('./middleware/auth');  // JWT middleware
require('dotenv').config();  // Load environment variables

const app = express();
const registerRoute = require('./routes/regst');
const loginRoute = require('./routes/login');
const subscribeRoute = require('./routes/subscribe');
const usersubscribeRoute = require('./routes/usersubscriber');
const donationRoute = require('./routes/donationr');
const userdonationRoute = require('./routes/userdonationRoute');

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);  // Exit process if connection fails
  }
};
connectDB();

// Express Session configuration with FileStore
app.use(session({
    store: new FileStore({ path: './sessions', logFn: function() {} }),  // Store session data in files
    secret: process.env.JWT_SECRET || 'fallback-secret-key',              // Session secret key
    resave: false,                                                        // Prevent resaving if not modified
    saveUninitialized: false,                                             // Save uninitialized sessions
    cookie: { maxAge: 60 * 60 * 1000 }                                    // Session expires after 1 hour
}));

// Middleware to parse cookies
app.use(cookieParser());

// Set view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/s', subscribeRoute);
app.use('/user', usersubscribeRoute);
app.use('/d', donationRoute);
app.use('/duser', userdonationRoute);

// Index route with session validation
app.get('/', (req, res) => {
    if (req.session.Name) {
        res.redirect('/userindex');
    } else {
        res.redirect('/index');
    }
});

// Subscribe route with session validation
app.get('/s', (req, res) => {
    if (req.session.Name) {
        res.redirect('/usersubscriber');
    } else {
        res.redirect('/subscribe');
    }
});

// Login route logic
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = loadUsers();
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        req.session.Name = user.name;
        console.log('Session created: ', req.session); // Debugging line
        res.redirect('/'); // Redirect to the home page after logging in
    } else {
        res.status(401).send('Invalid email or password');
    }
});

// Function to load users from JSON file
const loadUsers = () => {
    const dataPath = path.join(__dirname, 'data', 'users.json');
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
};

// Other route handlers for various views
app.get('/index', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/visit', (req, res) => res.render('visit'));
app.get('/job', (req, res) => res.render('job'));
app.get('/contact', (req, res) => res.render('cont'));
app.get('/login', (req, res) => res.render('login'));
app.get('/reg', (req, res) => res.render('reg'));
app.get('/donation', (req, res) => res.render('donation'));
app.get('/userindex', (req, res) => {
    if (!req.session.Name) return res.redirect('/login');
    const name = req.session.Name;
    res.render('user/userindex', { name });
});
app.get('/usersubscriber', (req, res) => {
    if (!req.session.Name) return res.redirect('/login');
    const name = req.session?.Name || 'Guest';
    res.render('user/usersubscriber', { name });
});
app.get('/usercontact', (req, res) => {
    if (!req.session.Name) return res.redirect('/login');
    const name = req.session.Name;
    res.render('user/usercont', { name });
});
app.get('/userjob', (req, res) => {
    if (!req.session.Name) return res.redirect('/login');
    const name = req.session.Name;
    res.render('user/userjob', { name });
});
app.get('/userdonation', (req, res) => {
    if (!req.session.Name) return res.redirect('/login');
    const name = req.session.Name;
    res.render('user/userdonation', { name });
});
app.get('/userabout', (req, res) => {
    if (!req.session.Name) return res.redirect('/login');
    const name = req.session.Name;
    res.render('user/userabout', { name });
});

// Protect the dashboard route with JWT authentication
app.get('/dashboard', protect, (req, res) => {
    const user = req.user;  // This will be set by the protect middleware
    res.render('user/dashboard', { user });
});

app.get('/uservisit', (req, res) => {
    if (!req.session.Name) return res.redirect('/login');
    const name = req.session.Name;
    res.render('user/uservisit', { name });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect('/userindex');
        res.redirect('/index');
    });
});

// Start the server
const PORT = process.env.PORT || 4747;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} link: http://localhost:${PORT}`);
});
