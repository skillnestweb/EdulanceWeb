window.onload = function () {
    const email = localStorage.getItem("userEmail");
    const score = localStorage.getItem("score");

    if (!email) {
        // if not logged in → go back
        window.location.href = "homepage.html";
    }

    document.getElementById("email").innerText = email;
    document.getElementById("score").innerText = score;
};

function logout() {
    localStorage.clear();
    window.location.href = "homepage.html";
}
function deleteAccount() {
    const choice = confirm("⚠️ Are you sure you want to delete your account?\nThis action cannot be undone.");

    if (choice) {
        // User clicked YES
        const email = localStorage.getItem("userEmail");

        fetch('http://localhost:3000/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Account deleted successfully");
                localStorage.clear();
                window.location.href = "index.html";
            } else {
                alert("Error deleting account");
            }
        })
        .catch(err => {
            console.log(err);
            alert("Server error");
        });

    } else {
        // User clicked NO
        return; // do nothing
    }
}
