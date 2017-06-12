class Character {
    protected _div: HTMLElement;
    
    protected x:number;
    protected y:number;
    protected speed:number;
    protected delay:number;
    protected divName:string = "div";
    protected hue:number = Math.random() * 0;

    private deleted = false;

    public get div(): HTMLElement {
		return this._div;
	}

    constructor(g:Game){
        this.x = window.innerWidth + 200;
        this.y = Math.random() * window.innerHeight;
        this.speed = Math.random() * 2;
        this.delay = Math.random();
    }

    protected createDiv(){
        this._div = document.createElement(this.divName);
        document.body.appendChild(this._div);

        this._div.style.animationDelay = this.delay+"s";
    }

    protected changeColor(){
        this._div.style.webkitFilter = "hue-rotate("+this.hue+"deg)";
        this._div.style.filter = "hue-rotate("+this.hue+"deg)";
    }

    public delete(){
        this._div.remove();
    }

    public move(){
        this.x -= this.speed;
        
        if(this.x < -200) {
            this.delete();
        }
        this._div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }
}