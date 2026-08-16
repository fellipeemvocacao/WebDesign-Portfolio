document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const cards = document.querySelectorAll(".card");

    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            const term = event.target.value.toLowerCase().trim();

            cards.forEach((card) => {
                const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
                const description = card.querySelector("p")?.textContent.toLowerCase() || "";

                if (title.includes(term) || description.includes(term)) {
                    card.style.display = "block";
                    card.style.opacity = "1";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    const bgAudio = document.getElementById("bg-audio");
    const audioBtn = document.getElementById("toggle-audio-btn");

    if (bgAudio && audioBtn) {
        audioBtn.addEventListener("click", () => {
            if (bgAudio.paused) {
                bgAudio.play();
                audioBtn.textContent = "🔇 Pausar Música";
            } else {
                bgAudio.pause();
                audioBtn.textContent = "🔊 Ouvir Música";
            }
        });
    }

    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("card-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach((card) => {
        card.classList.add("card-hidden");
        cardObserver.observe(card);
    });
});