function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.getElementById('registerForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const csrfToken = getCookie('XSRF-TOKEN');

    const headers = {
        'Content-Type': 'application/json'
    };

    if (csrfToken) {
        headers['X-XSRF-TOKEN'] = csrfToken;
    }

    try {
        const response = await fetch('/user/register', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Account created successfully!');
            window.location.href = '/login';
        } else {
            const errorText = await response.text();
            alert('Error: ' + errorText);
        }
    } catch (error) {
        console.error('Error during requisition:', error);
        alert('Failed to connect to the server.');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('form[action="/login"]');
    if (loginForm) {
        const csrfToken = getCookie('XSRF-TOKEN');
        if (csrfToken) {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = '_csrf';
            hiddenInput.value = csrfToken;
            loginForm.appendChild(hiddenInput);
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
        const errorDiv = document.getElementById('error-message');
        if (errorDiv) {
            errorDiv.innerText = "Incorrect email or password.";
            errorDiv.style.color = "red";
        }
    }
});