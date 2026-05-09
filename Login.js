// script.js
let userEmail = "";

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("score", data.user.activity_data);

    window.location.href = "homepage.html"; // redirect here
}
}

async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    });

    if (res.ok) {
        alert("Registration Successful! Now click Login.");
    } else {
        alert("Registration Failed. User might already exist.");
    }
}

function updateActivity() {
    let score = parseInt(document.getElementById('score').innerText);
    score++;
    document.getElementById('score').innerText = score;

    saveToDatabase(score);
}

function saveToDatabase(newScore) {
    fetch('http://localhost:3000/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, score: newScore })
    });
}

function logout() {
    location.reload();
}
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // 1. Check if user already exists
    const checkUser = 'SELECT * FROM users WHERE email = ?';

    connection.query(checkUser, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }

        if (result.length > 0) {
            return res.status(400).send("User already exists");
        }

        // 2. Insert new user
        const insertUser = `
            INSERT INTO users (email, password, activity_data)
            VALUES (?, ?, ?)
        `;

        connection.query(insertUser, [email, password, 0], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Registration failed");
            }

            res.status(200).send("User registered successfully");
        });
    });
});
