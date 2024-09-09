let winnings = 0;
document.querySelector('.spin-btn').addEventListener('click', () => {
    winnings += Math.floor(Math.random() * 100); // Random winnings
    document.querySelector('.score').textContent = `Winnings: ${winnings}`;
});

document.querySelector('.max-bet-btn').addEventListener('click', () => {
    winnings += Math.floor(Math.random() * 500); // Max bet increases winnings
    document.querySelector('.score').textContent = `Winnings: ${winnings}`;
});
