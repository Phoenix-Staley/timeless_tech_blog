const email_el = document.getElementById("email_input");
const username_el = document.getElementById("username_input");
const password_el = document.getElementById("password_input");
const post = document.getElementById("post");
let post_id;
if (post) {
    post_id = post.getAttribute("data-id");
}

const get_post_values = () => {
    const title_el = document.getElementById("title");
    const body_el = document.getElementById("body");
    const title = title_el.value;
    const post_body = body_el.value;
    const date_posted = new Date();
    return { title, post_body, date_posted };
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
    const date_posted = new Date();

    if (comment) {
        const response = await fetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify({ comment, date_posted, post_id }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            location.reload();
        } else {
            const response_body = await response.json();
            response_body.message ? alert(response_body.message) : alert(response.statusText);
        }
    }
}

async function add_post(event) {
    event.preventDefault();
    const new_post = get_post_values();

    if (new_post.title && new_post.post_body) {
        const response = await fetch("/api/posts/new_post", {
            method: "POST",
            body: JSON.stringify({
                title: new_post.title,
                post_body: new_post.post_body,
                date_posted: new_post.date_posted
            }),
            headers: { "Content-Type": "application/json" }
        });

        const response_body = await response.json();
        if (response.ok) {
            location.replace("/dashboard");
        } else {
            response_body.message ? alert(response_body.message) : alert(response.statusText);
        }
    }
}

async function update_post(event) {
    event.preventDefault();
    const new_post = get_post_values();

    if (new_post.title && new_post.post_body) {
        const fetch_route = "/api/posts/update/" + document.getElementById("post_editor").getAttribute("data-post-id");
        const response = await fetch(fetch_route, {
            method: "POST",
            body: JSON.stringify({
                title: new_post.title,
                post_body: new_post.post_body,
                date_posted: new_post.date_posted
            }),
            headers: { "Content-Type": "application/json" }
        });

        const response_body = await response.json();
        console.log(response_body);
        if (response.ok) {
            location.replace("/dashboard");
        } else {
            response_body.message ? alert(response_body.message) : alert(response.statusText);
        }
    }
}