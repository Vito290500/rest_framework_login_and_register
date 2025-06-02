/* Funzione di chiamata all'API per la registrazione */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const output = document.getElementById("registerOutput");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const payload = {
      username: formData.get("username"),
      email:    formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response = await fetch("/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        output.textContent = "Utente creato ✅";
        form.reset();
      } else {
        const errorData = await response.json();
        output.textContent = JSON.stringify(errorData, null, 2);
      }
    } catch (err) {
      output.textContent = `Errore di rete: ${err}`;
    }
  });
});