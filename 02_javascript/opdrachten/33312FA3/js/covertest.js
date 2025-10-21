const cards = document.querySelectorAll(".board6");

let flippedCards = [];

cards.forEach(card => {
    const cover = card.querySelector("img:last-child");

    cover.addEventListener("click", () => {
        // Als kaart al uncovered is, doe niets
        if (cover.classList.contains("uncovered")) return;

        // Draai kaart open
        cover.classList.remove("covered");
        cover.classList.add("uncovered");

        flippedCards.push(card);

        // Zodra 2 kaarten open zijn:
        if (flippedCards.length === 2) {
            const [first, second] = flippedCards;
            const firstName = first.querySelector("img:first-child").getAttribute("name");
            const secondName = second.querySelector("img:first-child").getAttribute("name");

            if (firstName === secondName) {
                // Match: laat ze open
                flippedCards = [];
            } else {
                // Geen match: draai terug na korte delay
                setTimeout(() => {
                    flippedCards.forEach(card => {
                        const c = card.querySelector("img:last-child");
                        c.classList.remove("uncovered");
                        c.classList.add("covered");
                    });
                    flippedCards = [];
                }, 1000);
            }
        }
    });
});


