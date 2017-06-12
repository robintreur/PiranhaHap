/// <reference path="character.ts" />

class Blowfish extends Character {
    private rotate:number;

    constructor(g:Game) {
        super(g);
        this.divName = "blowfish";
        this.delay = Math.random() * 0;
        this.createDiv();
        
        this.hue = Math.random() * 400;
        this.changeColor();
    }

    public blow(isBlow:string){
        if (isBlow == "yes"){
            this._div.style.backgroundPosition = "0 0";
            this.x -= this.speed*2;
            this.rotate = Math.random() * 15;
            this._div.style.transform ="translate("+this.x+"px,"+this.y+"px) rotate("+this.rotate+"deg)";
        }else{
            this._div.style.backgroundPosition = "0 -65px";
        }
    }

}