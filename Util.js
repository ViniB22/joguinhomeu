class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

    draw(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x,this.y,this.w,this.h)
    }
}

class Man extends Obj{
    dir = 0
    pts = 0
    vida = 5
    frame = 1
    tempo = 0
    faze = 1  
    velocidadeObstaculos = 2  
    pontuacaoMaxima = 100

    verificarFaze() {
        if (this.pts >= this.pontuacaoMaxima) {
            this.pts = this.pontuacaoMaxima;
            vitoria = true;
            jogar = false;
            return;
        }
    
        // A cada 20 pontos, avança de fase
        const novaFaze = Math.floor(this.pts / 20) + 1;
        
        if (novaFaze > this.faze) {
            this.faze = novaFaze;
            this.velocidadeObstaculos += 1.5;
            console.log(`Fase ${this.faze}! Velocidade: ${this.velocidadeObstaculos}`);
        }
    }

    animacaoEsquerda = ['little_man_left_1', 'little_man_left_2'];
    animacaoDireita = ['little_man_right_1', 'little_man_right_2'];
    direcaoAtual = 'left'; 
    frameAnimacao = 0;
    tempoAnimacao = 0;
    velocidadeAnimacao = 10;

    atualizarAnimacao() {
        this.tempoAnimacao++;
        if (this.tempoAnimacao >= this.velocidadeAnimacao) {
            this.tempoAnimacao = 0;
            this.frameAnimacao = (this.frameAnimacao + 1) % 2; // Alterna entre 0 e 1
            
            // Atualiza o sprite baseado na direção
            if (this.direcaoAtual === 'left') {
                this.a = `./img/${this.animacaoEsquerda[this.frameAnimacao]}.png`;
            } else if (this.direcaoAtual === 'right') {
                this.a = `./img/${this.animacaoDireita[this.frameAnimacao]}.png`;
            }
        }
    }

    mov_man_img(){
        this.x += this.dir;
            
        // Atualizar animação apenas se estiver se movendo
        if (this.dir !== 0) {
            this.atualizarAnimacao();
        }
            
        // Limites da tela
        if(this.x <= 0) {
            this.x = 0;
        } else if(this.x + this.w >= 600) {
            this.x = 600 - this.w;
        }
    }

    draw_man_img(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x,this.y,this.w,this.h)
    }

    point(objeto){
        if((objeto.y>=680)&&(objeto.y <= 684)){
            return true
        }else{
            false
        }
    }
    
    colid(objeto) {
        if ((this.x < objeto.x + objeto.w) &&
            (this.x + this.w > objeto.x) &&
            (this.y < objeto.y + objeto.h) &&
            (this.y + this.h > objeto.y)) {
            return true;
        } else {
            return false; // Adicionando o return faltante
        }
    }
}
class Obstaculos extends Man {
    mov_obs(velocidade) {  // Agora recebe a velocidade como parâmetro
        this.y += velocidade
        if(this.y >= 780){
            this.recomeca()
        }
    }
    
    recomeca(){
        this.y = -100
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2))
    }
}

class Text {
    des_text(text, x, y, cor, font, bold = false) {
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = bold ? `bold ${font}` : font
        des.fillText(text, x, y)
    }
}
