fetch("data/cards.json")
    .then(response => response.json())
    .then(cards => {
        const list = document.getElementById('card-list');
        cards.forEach(card => {
            const li = document.createElement('li');
            li.textContent = `${card.set} -> ${card.card1}`;
            list.appendChild(li);
        });
    })
    .catch(error =>
    {
        console.error("Error:", error)
    });