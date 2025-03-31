let des = document.getElementById('des').getContext('2d')

let little_man_in = new Man(175,250,250,350,'./img/little_man_right_2.png')
let backGround1 = new Man(0,0,600,800, './img/mountain_background.png')
let backGround2 = new Man(0,0,600,800, './img/pixel_mountain.png')
let backGround3 = new Man(0,0,600,800, './img/game_over.png')
let backGround4 = new Man(0,0,600,800, './img/victory.png')
let lil_man_left = new Man(225,600,65,100,'./img/little_man_left_1.png')

let obstaculo1 = new Obstaculos(50, -25, 75, 75, './img/rock_tipe1.png')
let obstaculo2 = new Obstaculos(200, -350, 75, 75, './img/rock_tipe2.png')
let obstaculo3 = new Obstaculos(350, -675, 100, 100, './img/snow_ball.png')

let musica = new Audio('./img/music.mp3');
let lose = new Audio('./img/dark_song.mp3');
let hit = new Audio('./img/hit.wav');
let win = new Audio('./img/win_song.wav');
let sound_track = new Audio('./img/sound_track.wav');

musica.volume = 1.0
musica.loop = true
lose.volume = 1.0
lose.loop = true
hit.volume = 1.0
hit.loop = false
win.volume = 1.0
win.loop = true
sound_track.volume = 1.0
sound_track.loop = true

let titulo = new Text()
let info1 = new Text()
let info2 = new Text()
let info3 = new Text()
let ident = new Text()

let point = new Text()
let caunt_point = new Text()
let faze = new Text()
let caunt_faze = new Text()
let life = new Text()
let caunt_life = new Text()
let gameOver = new Text()
let infostart = new Text()

let vitoria = false
let jogar = true
let jogo = false 

document.addEventListener('keydown', (e)=>{
    if(e.key === 'a' || e.key === 'ArrowLeft'){
        lil_man_left.dir = -5; // Movimento mais suave
        lil_man_left.direcaoAtual = 'left';
    }else if(e.key === 'd' || e.key === 'ArrowRight'){
        lil_man_left.dir = 5; // Movimento mais suave
        lil_man_left.direcaoAtual = 'right';
    }
    console.log(e.key)
})

document.addEventListener('keyup', (e)=>{
    if(e.key === 'a' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'ArrowRight'){
        lil_man_left.dir = 0;
    }
})

document.addEventListener('keypress', (e)=>{
    if(e.key === ' '){
        if (vitoria || !jogar) {
            // Reinicia o jogo
            lil_man_left.pts = 0;
            lil_man_left.vida = 5;
            lil_man_left.faze = 1;
            lil_man_left.velocidadeObstaculos = 2;
            vitoria = false;
            jogar = true;

            obstaculo1.recomeca();
            obstaculo2.recomeca();
            obstaculo3.recomeca();
        }
        jogo = true
        musica.pause()
        sound_track.play()
    }else if(e.key === 'p'){
        jogo = false 
        musica.play()
        sound_track.pause()
    }
    
})

function desenhaInicio() {
    backGround1.draw()
    little_man_in.draw()
    titulo.des_text('AVALANCHE', 75,100,'yellow','75px Times')
    info1.des_text('Aperte espaço para começar e P para pasar', 75-10, 675-125, 'snow','25px Times', true)
    info2.des_text('Fuja dos obstáculos', 200-10, 700-125, 'snow','25px Times', true)
    info3.des_text('Use as setinhas e o A e D para se mover', 100-10, 725-125, 'snow','25px bold Times', true)
    ident.des_text('Realizado Por Vinícius de Bona Ruas', 115-10, 775, 'snow','25px bold Times', true)
}

function pontos(){
    if(lil_man_left.point(obstaculo1)){
        lil_man_left.pts += 1
    }else if(lil_man_left.point(obstaculo2)){ 
        lil_man_left.pts += 1
    }else if(lil_man_left.point(obstaculo3)){
        lil_man_left.pts += 1
    }
}
function colisao() {
    if (lil_man_left.colid(obstaculo1)) {
        lil_man_left.vida -= 1;
        obstaculo1.recomeca();
        hit.play()
    } 
    if (lil_man_left.colid(obstaculo2)) {
        lil_man_left.vida -= 1;
        obstaculo2.recomeca();
        hit.play()
    } 
    if (lil_man_left.colid(obstaculo3)) {
        lil_man_left.vida -= 1;
        obstaculo3.recomeca();
        hit.play()
    }
    
    // Verifica se o jogador perdeu todas as vidas
    if (lil_man_left.vida <= 0) {
        lil_man_left.vida = 0;
        jogar = false; // Game Over
    }
}

function atualizar(){
    if(jogar){
        lil_man_left.verificarFaze();
        
        obstaculo1.mov_obs(lil_man_left.velocidadeObstaculos);
        obstaculo2.mov_obs(lil_man_left.velocidadeObstaculos);
        obstaculo3.mov_obs(lil_man_left.velocidadeObstaculos);
        
        colisao(); // Chamada adicionada para verificar colisões a cada frame
        pontos();
    }
}


// Modifique a função desenhar() para incluir os obstáculos
function desenhar(){
    if (vitoria) {
        // Tela de vitória
        backGround4.draw();
        titulo.des_text('VITÓRIA!', 100, 300, 'gold', '80px Times');
        info1.des_text(`Pontuação máxima alcançada: ${lil_man_left.pts}`, 65, 400, 'darkyellow', '32px Times',true);
        info2.des_text('Pressione ESPAÇO para jogar novamente', 50, 500, 'darkyellow', '28px Times',true);
    }
    else if(jogar){
        backGround2.draw_man_img();
        lil_man_left.mov_man_img();  
        lil_man_left.draw_man_img();
        
        obstaculo1.draw();
        obstaculo2.draw();
        obstaculo3.draw();
        
        point.des_text('Pontos: ',360 + 50,24,'yellow','26px Times')
        caunt_point.des_text(lil_man_left.pts,442 + 50,24,'yellow','26px Times')
        faze.des_text('Fase: ',220 + 50,24,'yellow','26px Times')
        caunt_faze.des_text(lil_man_left.faze,280 + 50,24,'yellow','26px Times')  
        life.des_text('Vida: ',40 + 50,24,'yellow','26px Times')
        caunt_life.des_text(lil_man_left.vida,100 + 50,24,'yellow','26px Times')
    } 
    else{
        backGround3.draw()
        gameOver.des_text('Game Over',160,400,'purple','58px Times')
        infostart.des_text('Aperte ESPAÇO para tentar de novo',85,585,'purple','32px Times')
        musica.pause()
        sound_track.pause()
        lose.play()
    }  
}

function main() {
    if (jogo == false){
        des.clearRect(0,0,600,800)
        desenhaInicio()
        requestAnimationFrame(main)
    }else if (jogo == true) {
        des.clearRect(0,0,600,800)
        atualizar()
        desenhar()
        requestAnimationFrame(main)
    }
}

main()