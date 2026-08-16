document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const cards = document.querySelectorAll(".card");
    const audioBtn = document.getElementById("toggle-audio-btn");

    // Instancia o áudio diretamente via JS
    const bgAudio = new Audio("audio/gregoriano.mp3");
    bgAudio.loop = true;

    function filtrarCards(event) {
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
    }

   function alternarAudio() {
    if (bgAudio.paused) {
        bgAudio.load(); // Força o recarregamento da fonte
        bgAudio.play()
            .then(() => {
                audioBtn.textContent = "🔇 Pausar Música";
            })
            .catch((error) => {
                console.error("Erro de reprodução:", error);
                alert("Erro ao tocar o áudio. Abra o Console (F12) para ver os detalhes.");
            });
    } else {
        bgAudio.pause();
        audioBtn.textContent = "🔊 Ouvir Música";
    }
}

    function inicializarAnimacoes() {
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
    }

    if (searchInput) {
        searchInput.addEventListener("input", filtrarCards);
    }

    if (audioBtn) {
        audioBtn.addEventListener("click", alternarAudio);
    }

    inicializarAnimacoes();
});