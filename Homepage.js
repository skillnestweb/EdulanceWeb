window.onload = function () {
    const email = localStorage.getItem("userEmail");

    if (email) {
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("profile").classList.remove("hidden");
        document.getElementById("logoutBtn").classList.remove("hidden");
    }
};
