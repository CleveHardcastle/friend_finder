const signupFormHandler = async function(event) {
    event.preventDefault();

    const emailEl = document.querySelector('#email-input-signup');
    const passwordEl = document.querySelector('#password-input-signup');
    const firstNameEl = document.querySelector('#firstName-input-signup');
    const lastNameEl = document.querySelector('#lastName-input-signup');

    const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({
            email: emailEl.value,
            password: passwordEl.value,
            first_name: firstNameEl.value,
            last_name: lastNameEl.value
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Sign up failed');
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);