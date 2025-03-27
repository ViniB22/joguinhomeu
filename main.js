let des = document.getElementById('des').getContext('2d')

let little_man_in = new Man(175,250,250,350,'./img/little_man_right_2.png')
let backGround1 = new Man(0,0,600,800, './img/mountain_background.png')
let backGround2 = new Man(0,0,600,800, './img/pixel_mountain.png')
let backGround3 = new Man(0,0,600,800, './img/game_over.png')
let lil_man_left = new Man(250,600,50,100,'./img/little_man_left_1.png')

let titulo = new Text()
let info1 = new Text()
let info2 = new Text()
let info3 = new Text()
let ident = new Text()

let jogar = true
let jogo = false 

document.addEventListener('keydown', (e)=>{
    if(e.key === 'a' || e.key === 'ArrowLeft'){
        lil_man_left.dir -= 10
        // console.log('valor = ', f1.dir)
        
    }else if(e.key === 'd' || e.key === 'ArrowRight'){
        lil_man_left.dir += 10
        // console.log('valor = ', f1.dir)
    }
    console.log(e.key)
})

document.addEventListener('keyup', (e)=>{
    if(e.key === 'a' || e.key === 'ArrowLeft'){
        lil_man_left.dir = 0
    }else if(e.key === 'd' || e.key === 'ArrowRight'){
        lil_man_left.dir = 0
    }
})

document.addEventListener('keypress', (e)=>{
    if(e.key === ' '){
        jogo = true
        // som1.play()
        // som2.pause()
    }else if(e.key === 'p'){
        jogo = false 
        // som1.pause()
        // som2.play()
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
    if(carro.point(c2)){
        carro.pts +=1
    }else if(carro.point(c3)){
        carro.pts += 1
    }
}

function desenhar(){
    // t1.des_text('Pontos: ',360,24,'yellow','26px Times')
    // t2.des_text(carro.pts,442,24,'yellow','26px Times')
    // t3.des_text('Vida: ',40,24,'yellow','26px Times')
    // t4.des_text(carro.vida,100,24,'yellow','26px Times')

    if(jogar){
        backGround2.draw_man_img()
    }else{
        // c1.des_carro()
        // t5.des_text(' Game Over',120,340,'yellow','46px Times')
    }  
}
function atualizar(){
    if(jogar){
        // motor.play()
        // carro.mov_carro()
        // carro.anim('carro_01_')
        // pontos()
        // colisao()
        // game_over()
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