/* Function to fetch all user data for homepage */

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("access");
  if (!token) {
    window.location.href = "/login/";
    return;
  }

  try {
    const res = await fetch("/api/auth/me/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });

    if (!res.ok) {
      window.location.href = "/login/";
      return;
    }

    const userData = await res.json();
    const welcomeEl = document.getElementById("welcomeMessage");
    const detailsEl = document.getElementById("userDetails");

    welcomeEl.textContent = `Benvenuto, ${userData.username}!`;
    detailsEl.textContent = `Email: ${userData.email}`;
  }
  catch (err) {
    console.error("Errore nel fetch:", err);
    window.location.href = "/login/";
  }
});
