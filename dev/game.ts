/// <reference path="dashboard.ts"/>
/// <reference path="fishgroup.ts"/>
/// <reference path="piranha.ts"/>
/// <reference path="blowfish.ts"/>

class Game {
    
    private fishGroups:Array<FishGroup> = new Array<FishGroup>();
    private eels:Array<Eel> = new Array<Eel>();
    private blowfish:Array<Blowfish> = new Array<Blowfish>();
    private piranha:Piranha;
    private dashboard:Dashboard;
    private numCharacters:number = 1;
    private createCharacterInterval:number;
    private gameRequestAnimationFrame:number;

    private _divFinish:HTMLElement;
    private _divFinishText:HTMLElement;
    private _divFinishAgain:HTMLElement;
 
    constructor(m:Menu) {

        this.dashboard = new Dashboard(this, m);

        this.createPiranha();

        this.createCharacter();

        this.createCharacterInterval = setInterval(() => this.createCharacter(), 20000);

        this.gameRequestAnimationFrame = requestAnimationFrame(() => this.gameLoop(m));
    }

    private createPiranha(){
        this.piranha = new Piranha(this);
        this.piranha.upkey = 38;
        this.piranha.downkey = 40;
        this.piranha.leftkey = 37;
        this.piranha.rightkey = 39;
    }

    private createCharacter(){

        // create new Eels
        for(let i = 0; i < (this.numCharacters); i++){
            this.eels.push(new Eel(this));
        }

        // create new Blowfishes
        for(let i = 0; i < this.numCharacters; i++){
            this.blowfish.push(new Blowfish(this));
        }

        // Create new Fish Groups
        for(let i = 0; i < 3; i++){
            this.fishGroups.push(new FishGroup(this));
        }

        this.numCharacters++;
    }

    public resetGame(){
        this.dashboard.piranhaHealth = 100;

        for(let bf of this.blowfish){
            bf.delete();
        }

        for(let e of this.eels){
            e.delete();
        }

        // remove arrays
        this.eels = [];
        this.blowfish = [];

        this.piranha.dead();
        this.createPiranha();

        this.dashboard.removeLife();
        
        if(this.dashboard.piranhaLifes < 0){
            this.finish("game over");
        }

    }

    public finish(status:string){
        this.eels = [];
        this.blowfish = [];
        this.fishGroups = [];

        clearInterval(this.createCharacterInterval);
        clearInterval(this.dashboard.healthInterval);
        clearInterval(this.dashboard.updateTimeInterval);
        cancelAnimationFrame(this.gameRequestAnimationFrame);

        this.createCharacterInterval = undefined;
        this.dashboard.healthInterval = undefined;
        this.dashboard.updateTimeInterval = undefined;
        this.dead = undefined;
        this.gameLoop = undefined;
        this.piranha = undefined;

        this._divFinish = document.createElement("finish");
        document.body.appendChild(this._divFinish);

        this._divFinishText = document.createElement("text");
        if(status == "game over"){
            this._divFinishText.innerHTML = "Game over!";
        }else{
            this._divFinishText.innerHTML = "Je hebt gewonnen!";
        }
        
        this._divFinish.appendChild(this._divFinishText);

        this._divFinishAgain = document.createElement("again");
        this._divFinishAgain.innerHTML = "Speel overnieuw";
        this._divFinish.appendChild(this._divFinishAgain);

        this._divFinishAgain.addEventListener("click", () => {
            location.reload();
        });
    }

    private gameOver(){
        console.log("GAME OVER!!!!");
        this.piranha = undefined;
    }
    
    private gameLoop(m:Menu){
        this.piranha.move();

        for(let fg of this.fishGroups){
            fg.move();
        }

        for(let bf of this.blowfish){
            bf.move();
        }

        for(let e of this.eels){
            e.move();
        }
        if (this.piranha.y < 0) {
            this.piranha.y = 0;
        }
        if (this.piranha.y > window.innerHeight - 65) {
            this.piranha.y = window.innerHeight - 65;
        }
        if (this.piranha.x < 0) {
            this.piranha.x = 0;
        }
        if (this.piranha.x > window.innerWidth - 65) {
            this.piranha.x = window.innerWidth - 65;
        }
        
        this.eat(m);
        this.dead();

        this.gameRequestAnimationFrame = requestAnimationFrame(() => this.gameLoop(m));
    }

    private dead(){
        let piranhaPlace:ClientRect = this.piranha.div.getBoundingClientRect();

        for(let bf of this.blowfish){
            let blowfishPlace:ClientRect = bf.div.getBoundingClientRect();
            
            bf.blow("no");

            if (piranhaPlace.left < blowfishPlace.right+80 &&
                piranhaPlace.right > blowfishPlace.left-80 &&
                piranhaPlace.top < blowfishPlace.bottom+80 &&
                piranhaPlace.bottom > blowfishPlace.top-80) {
                bf.blow("yes");
            }

            if (piranhaPlace.left < blowfishPlace.right &&
                piranhaPlace.right > blowfishPlace.left &&
                piranhaPlace.top < blowfishPlace.bottom &&
                piranhaPlace.bottom > blowfishPlace.top) {
                this.resetGame();

            }
        }
        for(let e of this.eels){
            let eelPlace:ClientRect = e.div.getBoundingClientRect();

            if (piranhaPlace.left < eelPlace.right &&
                piranhaPlace.right > eelPlace.left &&
                piranhaPlace.top < eelPlace.bottom &&
                piranhaPlace.bottom > eelPlace.top) {
                this.resetGame();
            }
        }
    }

    private eat(m:Menu){
        let piranhaPlace:ClientRect = this.piranha.div.getBoundingClientRect();

        this.piranha.eating(this, "no");

        for(let fg of this.fishGroups){

            for(let f of fg.fishes){
                let fishPlace:ClientRect = f.div.getBoundingClientRect();

                if (piranhaPlace.left < fishPlace.right &&
                    piranhaPlace.right > fishPlace.left &&
                    piranhaPlace.top < fishPlace.bottom &&
                    piranhaPlace.bottom > fishPlace.top) {
                    this.piranha.eating(this, "yes");
                    if(this.dashboard.piranhaHealth < 100){
                        this.dashboard.piranhaHealth++;
                    }
                    if(m.mode == "normal"){
                        this.dashboard.changeScore(this);
                    }
                    f.delete();
                }
            }
        }
    }
} 

