/* Funzione di chiamata per l'API di autentificazione al login */

document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(e.target));

  const res = await fetch("/api/auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    window.location.href = "/homepage/";
  } 
  else {
    const error = data.non_field_errors[0];
    const outputFiled = document.getElementById("output")

    outputFiled.style.display = "block";
    outputFiled.textContent = error;
  }
});
