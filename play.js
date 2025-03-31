document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const backButton = document.getElementById('backButton');
    const startScreen = document.getElementById('startScreen');
    const canvas = document.getElementById('des');
    
    // Ao clicar em Jogar
    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        canvas.style.display = 'block';
        backButton.style.display = 'block';
    });
    
    // Ao clicar em Voltar
    backButton.addEventListener('click', function() {
        startScreen.style.display = 'flex';
        canvas.style.display = 'none';
        backButton.style.display = 'none';
    });
});