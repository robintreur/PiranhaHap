class Dashboard {
    
    private _div: HTMLElement;
    
    private _divHealth: HTMLElement;
    private _divHealthHeart: HTMLElement;
    private _divHealthBar: HTMLElement;
    public healthInterval:number;

    private _divScore: HTMLElement;
    public score:number = 0;

    public time:number = 300;
    private _divTime: HTMLElement;
    public updateTimeInterval:number;

    private _divLifes: HTMLElement;
    private _divLife: HTMLElement;

    public piranhaLifes:number = 3;
    public piranhaHealth:number = 100;

    private mode:string;

    public get div(): HTMLElement {
		return this._div;
	}

    constructor(g:Game, m:Menu) {
        this.createDiv(m);

        this.healthInterval = setInterval(() => this.health(g), 500);

        if(m.mode == "survival"){
            this.updateTimeInterval = setInterval(() => this.updateTime(g), 1000);
        }

    }
    
    private updateTime(g:Game){
        this.time--;
        this._divTime.innerHTML = this.time+" seconds";
        this._div.appendChild(this._divTime);

        if(this.time <= 0){
            g.finish("won");
        }
    }

    private createDiv(m:Menu){
        this._div = document.createElement("dashboard");
        document.body.appendChild(this._div);

        this._divLifes = document.createElement("lifes");
        this._div.appendChild(this._divLifes);

        for(let i=0; i < this.piranhaLifes; i++){
            this._divLife = document.createElement("life");
            this._divLifes.appendChild(this._divLife);
        }
        if(m.mode == "normal"){
            this._divScore = document.createElement("score");
            this._divScore.innerHTML = "Score: "+this.score+"/400";
            this._div.appendChild(this._divScore);
        }else if(m.mode == "survival"){
            this._divTime = document.createElement("time");
            this._divTime.innerHTML = this.time+" seconds";
            this._div.appendChild(this._divTime);
        }

        this._divHealth = document.createElement("health");
        this._div.appendChild(this._divHealth);

        this._divHealthBar = document.createElement("bar");
        this._divHealthBar.style.height = this.piranhaHealth+"%";
        this._divHealth.appendChild(this._divHealthBar);

        this._divHealthHeart = document.createElement("heart");
        this._divHealthBar.appendChild(this._divHealthHeart);
    }

    public health(g:Game){
        this.piranhaHealth--;
        
        if(this.piranhaHealth <= 0){
            g.resetGame();
            this.piranhaHealth = 100;
        }
        
        this.changeHealth();
    }

    public removeLife(){
        for(let i=0; i < this.piranhaLifes; i++){
            this._divLifes.remove();
        }
        this.piranhaLifes--;

        this._divLifes = document.createElement("lifes");
        this._div.appendChild(this._divLifes);
        
        for(let i=0; i < this.piranhaLifes; i++){
            this._divLife = document.createElement("life");
            this._divLifes.appendChild(this._divLife);
        }
    }

    public changeHealth(){
        this._divHealthBar.style.height = this.piranhaHealth+"%";
        this._divHealth.appendChild(this._divHealthBar);
    }
    public changeScore(g:Game){
        this.score++;
        this._divScore.innerHTML = "Score: "+this.score+"/400";
        this._div.appendChild(this._divScore);

        if(this.score >= 400){
            g.finish("won");
        }
    }

}