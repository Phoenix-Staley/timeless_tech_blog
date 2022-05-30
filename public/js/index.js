const email_el = document.getElementById("email_input");
const username_el = document.getElementById("username_input");
const password_el = document.getElementById("password_input");
const post = document.getElementById("post");
if (post) {
    const post_id = post.getAttribute("data-id");
}

async function sign_up(event) {
    event.preventDefault();
    const email = email_el.value;
    const username = username_el.value;
    const password = password_el.value;

    if (email && username && password) {
        const response = await fetch("/api/users/sign_up", {
            method: "POST",
            body: JSON.stringify({ email, username, password }),
            headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
            document.location.replace("/");
        } else {
            const response_body = await response.json();
            response_body.message ? alert(response_body.message) : alert(response.statusText);
        }
    }
}

async function login(event) {
    event.preventDefault();
    const email = email_el.value;
    const password = password_el.value;

    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
            document.location.replace("/");
        } else {
            const response_body = await response.json();
            response_body.message ? alert(response_body.message) : alert(response.statusText);
        }
    }
}

async function logout(event) {
    event.preventDefault();
    try {
        await fetch("/api/users/logout", {
            method: "POST"
        });

        location.replace("/");
    } catch {
        location.replace("/");
    }
}

async function comment(event) {
    event.preventDefault();
    const comment_input_el = document.getElementById("comment");
    const comment = comment_input_el.value;

    if (comment) {
        const response = await fetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify({ comment, post_id }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            const response_body = await response.json();
            response_body.message ? alert(response_body.message) : alert(response.statusText);
        }
    }
}