import bcrypt from 'bcryptjs';

// Initialize users from localStorage or an empty object
let users = JSON.parse(localStorage.getItem('users')) || {};

// Function to register a new user with hashed password
export const registerUser = (username, password) => {
    if (users[username]) {
        return false; // Username already exists
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10); // Using 10 salt rounds

    // Store username and hashedPassword
    users[username] = hashedPassword;

    // Update localStorage
    localStorage.setItem('users', JSON.stringify(users));

    return true; // Registration successful
};

// Function to authenticate a user
export const authenticateUser = (username, password) => {
    const hashedPassword = users[username];

    // Check if username exists and compare hashed password
    return hashedPassword && bcrypt.compareSync(password, hashedPassword);
};

// Function to log out a user
export const logoutUser = (setAuthenticated) => {
    // Clear all user data on logout
    users = {};
    localStorage.removeItem('users');
    setAuthenticated(false);
};

// Automatically log in user if credentials exist on hard refresh
export const autoLoginUser = (setAuthenticated) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    users = storedUsers;

    // Check if there's a user logged in
    const loggedInUser = Object.keys(users)[0]; // Assume only one user for simplicity

    if (loggedInUser) {
        setAuthenticated(true);
    }
};
