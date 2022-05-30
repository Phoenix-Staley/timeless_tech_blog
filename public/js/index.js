const email_el = document.getElementById("email_input");
const username_el = document.getElementById("username_input");
const password_el = document.getElementById("password_input");
const submit_btn_el = document.querySelector(".submit_btn");

async function sign_up(event) {
    event.preventDefault();
    const email = email_el.value;
    const username = username_el.value;
    const password = password_el.value;

    if (email && username && password) {
        const response = await fetch('/api/users/sign_up', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

async function login(event) {
    event.preventDefault();
    const email = email_el.value;
    const password = password_el.value;

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}