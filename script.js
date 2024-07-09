// JavaScript to handle animations and interactivity

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });


    // Signup form handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const user = {
                username,
                email,
                password
            };

            localStorage.setItem('user', JSON.stringify(user));
            alert('Signup successful!');
            window.location.href = 'login.html';
        });
    }

    // Login form handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const user = JSON.parse(localStorage.getItem('user'));

            if (user && user.username === username && user.password === password) {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'profile.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Profile page handler
    const profileInfo = document.getElementById('profile-info');
    if (profileInfo) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (localStorage.getItem('loggedIn') === 'true') {
            profileInfo.innerHTML = `
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
            `;
        } else {
            window.location.href = 'login.html';
        }

        document.getElementById('logout-button').addEventListener('click', () => {
            localStorage.setItem('loggedIn', 'false');
            window.location.href = 'login.html';
        });
    }
});
