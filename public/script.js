// const apiUrl = "/api/contacts";
//     const form = document.getElementById("contactForm");
//     const tableBody = document.querySelector("#contactTable tbody");
//     const searchInput = document.getElementById("search");
//     const sortAscBtn = document.getElementById("sortAsc");
//     const sortDescBtn = document.getElementById("sortDesc");
//     let contacts = [];

//     async function fetchContacts() {
//       const res = await fetch(apiUrl);
//       contacts = await res.json();
//       displayContacts(contacts);
//     }

// function displayContacts(data) {
//   tableBody.innerHTML = "";
//   data.forEach(c => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//       <td>${c.name}</td>
//       <td>${c.email || ""}</td>
//       <td>${c.phone || ""}</td>
//       <td>${c.messages || ""}</td>
//       <td>
//         <button onclick="deleteContact('${c._id}')">🗑️</button>
//         <button onclick="editContact('${c._id}')">✏️</button>
//       </td>
//     `;
//     tableBody.appendChild(row);
//   });
// }

//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const contact = {
//         name: document.getElementById("name").value,
//         email: document.getElementById("email").value,
//         phone: document.getElementById("phone").value,
//         messages: document.getElementById("address").value,
//       };
//       await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(contact)
//       });
//       form.reset();
//       fetchContacts();
//     });

//     async function deleteContact(id) {
//       // await fetch(`\${apiUrl}/\${id}`, { method: "DELETE" });
//       await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
//       fetchContacts();
//     }

//     async function editContact(id) {
//       const res = await fetch(`\${apiUrl}/\${id}`);
//       const contact = await res.json();
//       document.getElementById("name").value = contact.name;
//       document.getElementById("email").value = contact.email;
//       document.getElementById("phone").value = contact.phone;
//       document.getElementById("address").value = contact.messages;
//       await fetch(`${apiUrl}/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(contact)
//       });
//       fetchContacts();
//     }

//     // Search contacts (frontend filter)
//     searchInput.addEventListener("input", () => {
//       const query = searchInput.value.toLowerCase();
//       const filtered = contacts.filter(c =>
//         c.name.toLowerCase().includes(query) ||
//         (c.email && c.email.toLowerCase().includes(query)) ||
//         (c.phone && c.phone.toLowerCase().includes(query))
//       );
//       displayContacts(filtered);
//     });

//     // Sort A–Z
//     sortAscBtn.addEventListener("click", () => {
//       const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
//       displayContacts(sorted);
//     });

//     // Sort Z–A
//     sortDescBtn.addEventListener("click", () => {
//       const sorted = [...contacts].sort((a, b) => b.name.localeCompare(a.name));
//       displayContacts(sorted);
//     });

//     fetchContacts();

  const apiUrl = "/api/contacts";
  const form = document.getElementById("contactForm");
  const tableBody = document.querySelector("#contactTable tbody");
  const searchInput = document.getElementById("search");
  const sortAscBtn = document.getElementById("sortAsc");
  const sortDescBtn = document.getElementById("sortDesc");
  let contacts = [];

  // Fetch and display contacts on page load
  async function fetchContacts() {
    try {
      const res = await fetch(apiUrl);
      contacts = await res.json();
      displayContacts(contacts);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  }

  // Render contacts into the table
  function displayContacts(data) {
    tableBody.innerHTML = "";
    data.forEach(c => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${c.name}</td>
        <td>${c.email || ""}</td>
        <td>${c.phone || ""}</td>
        <td>${c.messages || ""}</td>
        <td>
          <button onclick="deleteContact('${c._id}')">🗑️</button>
          <button onclick="editContact('${c._id}')">✏️</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Submit new contact
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const contact = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      messages: document.getElementById("address").value,
    };
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
    form.reset();
    fetchContacts();
  });

  // Delete contact
  async function deleteContact(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchContacts();
  }

  // Edit contact
  async function editContact(id) {
    const res = await fetch(`${apiUrl}/${id}`);
    const contact = await res.json();
    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("address").value = contact.messages;

    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
    fetchContacts();
  }

  // Search contacts
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = contacts.filter(c =>
      c.name.toLowerCase().includes(query) ||
      (c.email && c.email.toLowerCase().includes(query)) ||
      (c.phone && c.phone.toLowerCase().includes(query))
    );
    displayContacts(filtered);
  });

  // Sort A–Z
  sortAscBtn.addEventListener("click", () => {
    const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    displayContacts(sorted);
  });

  // Sort Z–A
  sortDescBtn.addEventListener("click", () => {
    const sorted = [...contacts].sort((a, b) => b.name.localeCompare(a.name));
    displayContacts(sorted);
  });

  // Run on page load
  window.addEventListener("DOMContentLoaded", fetchContacts);

