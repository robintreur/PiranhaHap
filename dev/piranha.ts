class Piranha {
    
    private _div: HTMLElement;
    public upkey : number;
    public downkey : number;
    public leftkey : number;
    public rightkey : number;

    private upSpeed : number = 0;
    private downSpeed : number = 0;
    private leftSpeed : number = 0;
    private rightSpeed : number = 0;

    private rotation : number = 180;
    public x:number = 0;
    public y:number = (window.innerHeight / 2) - 35;


    public get div(): HTMLElement {
		return this._div;
	}

    constructor(g:Game) {
        this.createDiv();
        this.move();

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
    }
    
    private createDiv(){
        this._div = document.createElement("piranha");
        document.body.appendChild(this._div);
    }

    public move(){
        this.x = this.x - this.leftSpeed + this.rightSpeed;
        this.y = this.y - this.upSpeed + this.downSpeed;

        this._div.style.transform ="translate("+this.x+"px,"+this.y+"px) rotateY("+this.rotation+"deg)";
    }

    public eating(g:Game, isEating:string){
        if (isEating == "yes"){
            this._div.style.backgroundPosition = "0 -66px";
        }else{
            this._div.style.backgroundPosition = "0 0";
        }
    }

    public dead(){
        this._div.remove();
    }

    private onKeyDown(e : KeyboardEvent) : void {
        switch(e.keyCode){
        case this.upkey:
            this.upSpeed = 10;
            break;
        case this.downkey:
            this.downSpeed = 10;
            break; 
        case this.leftkey:
            this.leftSpeed = 10;
            this.rotation = 0;
            break;
        case this.rightkey:
            this.rightSpeed = 10;
            this.rotation = 180;
            break;
        } 
    }
    private onKeyUp(e : KeyboardEvent) : void {
        this.upSpeed = this.downSpeed = this.leftSpeed = this.rightSpeed = 0;
    }

}