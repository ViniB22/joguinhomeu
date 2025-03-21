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

    draw_man_img(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x,this.y,this.w,this.h)
    }

    anim(nome){
        this.tempo += 1
        if(this.tempo > 12){
            this.tempo = 0 
            this.frame += 1
        }
        if(this.frame > 3){
            this.frame = 1
        }
        this.a = "img/"+nome+this.frame+".png"
    }
}