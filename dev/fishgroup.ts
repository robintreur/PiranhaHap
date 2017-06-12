/// <reference path="character.ts" />
/// <reference path="fish.ts"/>

class FishGroup extends Character {

    public fishes : Array<Fish> = new Array<Fish>();

    private width:number;
    private height:number;

    constructor(g:Game) {
        super(g);

        this.width = Math.floor(Math.random() * 100 + 150);
        this.height = Math.floor(Math.random() * 50 + 100);
        
        this.divName = "fishgroup"
        this.createDiv();

        this._div.style.width = this.width+"px";
        this._div.style.height = this.height+"px";

        this.createFishes();
    }

    private createFishes(){
        let numFishes = Math.floor(Math.random() * 20 + 10);
        let randomFish = Math.floor(Math.random() * 3 + 1);
        
        for(let i = 0; i < numFishes; i++){
            let f:Fish = new Fish(this, randomFish);
            this.fishes.push(f);
        }
    }

    // public move():void {
    //     this.x -= this.speed;
    //     if(this.x < -200) this.x = window.innerWidth;
    //     this._div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
    // }

}