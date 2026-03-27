
(function () {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a, header nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === page) link.classList.add("active");
  });
})();
function searchPlaces() {
  const input = document.getElementById("searchBar");
  if (!input) return;
  const val = input.value.toLowerCase();
  document.querySelectorAll(".gallery .card").forEach(card => {
    const name = (card.getAttribute("data-name") || "").toLowerCase();
    card.style.display = name.includes(val) ? "block" : "none";
  });
}
(function () {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  const dateInput = document.getElementById("date");
  if (dateInput) dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);


  const prices = {
    "Diani Beach":           "Ksh 15,000",
    "Maasai Mara":           "Ksh 25,000",
    "Nairobi National Park": "Ksh 5,000"
  };
  const destSelect = document.getElementById("destination");
  const priceEl    = document.getElementById("priceEstimate");
  if (destSelect && priceEl) {
    destSelect.addEventListener("change", function () {
      priceEl.textContent = prices[this.value]
        ? "Estimated Cost: " + prices[this.value]
        : "";
    });
  }

  const msg = document.getElementById("bookingMsg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    if (msg) {
      msg.textContent = "Booking successful! Thank you, " + name + " 🎉";
      setTimeout(() => { msg.textContent = ""; }, 4000);
    }
    form.reset();
    if (priceEl) priceEl.textContent = "";
  });
})();

(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const msg = document.getElementById("successMsg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) { alert("Please fill in all fields."); return; }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) { alert("Please enter a valid email address."); return; }

    if (msg) {
      msg.textContent = "Message sent! Thank you, " + name + ".";
      setTimeout(() => { msg.textContent = ""; }, 4000);
    }
    form.reset();
  });
})();
(function () {
  const form = document.getElementById("reviewForm");
  if (!form) return;

  const list = document.getElementById("reviewsList");
  if (list) list.innerHTML = localStorage.getItem("reviews") || "";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const reviewer   = document.getElementById("reviewer").value.trim();
    const reviewText = document.getElementById("reviewText").value.trim();
    if (!reviewer || !reviewText) { alert("Please fill in your name and review."); return; }

    const date = new Date().toLocaleString();
    const div  = document.createElement("div");
    div.className = "review";
    div.innerHTML = `<strong>${reviewer}</strong> <small>(${date})</small><p>${reviewText}</p>`;
    list.prepend(div);
    localStorage.setItem("reviews", list.innerHTML);
    form.reset();
  });
})();
