/* Function to fetch all user data for homepage */

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("access");
  if (!token) {
    window.location.href = "/";
    return;
  }

  try {
    const res = await fetch("/api/auth/me/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.error("Token non valido o scaduto (status:", res.status, ")");
      return;
    }

    const userData = await res.json();
    const detailsEl = document.getElementById("userDetails");
    detailsEl.textContent = userData.username;
    
  }
  catch (err) {
    console.error("Errore nel fetch:", err);
  }
});
