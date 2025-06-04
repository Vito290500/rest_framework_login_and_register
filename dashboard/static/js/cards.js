/* FUNZIONE CHE GESTISCE LA SEZIONE CARDS */

document.addEventListener("DOMContentLoaded", () => {
  /* —————————— MODALE “Aggiungi Card” —————————— */
  const openModalBtn   = document.getElementById("openModal");
  const modal          = document.getElementById("cardModal");
  const closeModalBtn  = document.getElementById("closeModal");
  const cancelModalBtn = document.getElementById("cancelModal");
  const form           = document.getElementById("cardForm");

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
    form.reset();
  }

  openModalBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  cancelModalBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  /* —————————— MODALE “Dettaglio Card” —————————— */
  const detailModal       = document.getElementById("detailModal");
  const closeDetailBtn    = document.getElementById("closeDetailModal");
  const detailImg         = document.getElementById("detailImg");
  const detailTitle       = document.getElementById("detailTitle");
  const detailDescription = document.getElementById("detailDescription");
  const detailCategory    = document.getElementById("detailCategory");
  const detailDate        = document.getElementById("detailDate");
  const itemsList         = document.getElementById("itemsList");
  const newItemInput      = document.getElementById("newItemInput");
  const addItemBtn        = document.getElementById("addItemBtn");
  const saveItemsBtn      = document.getElementById("saveItemsBtn");

  let currentCardId = null;
  let currentItems  = [];

  function openDetailModal() {
    detailModal.style.display = "block";
  }

  function closeDetailModal() {
    detailModal.style.display = "none";
    currentCardId = null;
    currentItems = [];
    itemsList.innerHTML = "";
    newItemInput.value = "";
  }

  closeDetailBtn.addEventListener("click", closeDetailModal);
  window.addEventListener("click", (event) => {
    if (event.target === detailModal) {
      closeDetailModal();
    }
  });

  /* —————————— FUNZIONI ITEMS —————————— */
  function createItemElement(itemName, index) {
    const li = document.createElement("li");
    li.textContent = itemName;
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-item-btn");
    removeBtn.textContent = "×";
    removeBtn.style.background = "none";
    removeBtn.style.border = "none";
    removeBtn.style.color = "var(--accent-primary)";
    removeBtn.style.fontWeight = "bold";
    removeBtn.style.cursor = "pointer";
    removeBtn.style.padding = "0 6px";
    removeBtn.addEventListener("click", () => {
      currentItems.splice(index, 1);
      refreshItemsList();
    });

    li.appendChild(removeBtn);
    return li;
  }

  function refreshItemsList() {
    itemsList.innerHTML = "";
    currentItems.forEach((item, idx) => {
      const li = createItemElement(item, idx);
      itemsList.appendChild(li);
    });
  }

  /* —————————— APPEND CARD NELLA GRIGLIA —————————— */
  const cardsList = document.getElementById("cardsList");

  function appendCardToDOM(card) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("card_custom");

    const imgEl = document.createElement("img");
    imgEl.src = card.img || "/static/img/placeholder.png";
    imgEl.alt = card.title;
    wrapper.appendChild(imgEl);

    const details = document.createElement("div");
    details.classList.add("card_details");

    const titleEl = document.createElement("h3");
    titleEl.textContent = card.title;
    details.appendChild(titleEl);

    const tagContainer = document.createElement("div");
    tagContainer.classList.add("tag-container");

    const dateEl = document.createElement("p");
    const dateObj = new Date(card.created_at);
    dateEl.textContent = "Data: " + dateObj.toLocaleDateString();
    tagContainer.appendChild(dateEl);

    const catEl = document.createElement("p");
    catEl.classList.add("tag");
    catEl.textContent = card.category;
    tagContainer.appendChild(catEl);

    details.appendChild(tagContainer);

    if (card.description) {
      const descEl = document.createElement("p");
      descEl.textContent = card.description;
      details.appendChild(descEl);
    }

    wrapper.appendChild(details);
    cardsList.prepend(wrapper);

    wrapper.addEventListener("click", async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        alert("Sessione scaduta, effettua nuovamente il login.");
        window.location.href = "/";
        return;
      }

      try {
        const res = await fetch(`/api/cards/${card.id}/`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) {
          console.error("Impossibile recuperare dettagli card (status:", res.status, ")");
          return;
        }
        const freshCard = await res.json();

        currentCardId = freshCard.id;
        detailImg.src = freshCard.img || "/static/img/placeholder.png";
        detailTitle.textContent = freshCard.title;
        detailDescription.textContent = freshCard.description || "(nessuna descrizione)";
        detailCategory.textContent = freshCard.category;
        detailDate.textContent = new Date(freshCard.created_at).toLocaleDateString();

        currentItems = Array.isArray(freshCard.items) ? [...freshCard.items] : [];
        refreshItemsList();

        openDetailModal();
      } catch (err) {
        console.error("Errore di rete o di sistema:", err);
        alert("Si è verificato un errore. Riprova più tardi.");
      }
    });
  }

  /* —————————— CREAZIONE NUOVA CARD —————————— */
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const imgVal         = document.getElementById("cardImg").value.trim();
    const titleVal       = document.getElementById("cardTitle").value.trim();
    const descriptionVal = document.getElementById("cardDescription").value.trim();
    const categoryVal    = document.getElementById("cardCategory").value;

    const payload = { img: imgVal, title: titleVal, description: descriptionVal, category: categoryVal };
    const token = localStorage.getItem("access");
    if (!token) {
      alert("Sessione scaduta, effettua nuovamente il login.");
      window.location.href = "/";
      return;
    }

    try {
      const res = await fetch("/api/cards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.error("Status HTTP:", res.status);
        const errorData = await res.json();
        console.error("Errore durante la creazione (body):", errorData);
        alert("Errore: impossibile creare la card. Controlla la console per dettagli.");
        return;
      }

      const newCard = await res.json();
      appendCardToDOM(newCard);
      closeModal();
    } catch (err) {
      console.error("Errore di rete o di sistema:", err);
      alert("Si è verificato un errore. Riprova più tardi.");
    }
  });

  /* —————————— CARICAMENTO INIZIALE DELLE CARD —————————— */
  async function loadCards() {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const res = await fetch("/api/cards/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) return;

      const data = await res.json();
      data.forEach(card => appendCardToDOM(card));
    } catch (err) {
      console.error("Impossibile caricare le card:", err);
    }
  }
  loadCards();

  /* —————————— GESTIONE AGGIUNTA E RIMOZIONE ITEMS IN LOCALE —————————— */
  addItemBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newItem = newItemInput.value.trim();
    if (!newItem) return;
    currentItems.push(newItem);
    refreshItemsList();
    newItemInput.value = "";
  });

  /* —————————— SALVATAGGIO ITEMS SU SERVER (PATCH) —————————— */
  saveItemsBtn.addEventListener("click", async () => {
    if (!currentCardId) return;

    const token = localStorage.getItem("access");
    if (!token) {
      alert("Sessione scaduta, effettua nuovamente il login.");
      window.location.href = "/";
      return;
    }

    try {
      const res = await fetch(`/api/cards/${currentCardId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ items: currentItems })
      });

      if (!res.ok) {
        console.error("Errore durante il salvataggio items (status:", res.status, ")");
        alert("Errore: impossibile salvare gli elementi.");
        return;
      }

      alert("Lista elementi salvata con successo!");
      closeDetailModal();
    } catch (err) {
      console.error("Errore di rete o di sistema:", err);
      alert("Si è verificato un errore. Riprova più tardi.");
    }
  });
});
