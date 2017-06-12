class Fish {
    
    private _div: HTMLElement;
    private x:number;
    private y:number;
    private delay:number;

    public get div(): HTMLElement {
		return this._div;
	}

    constructor(fg:FishGroup, sort:number) {
        this.createDiv(fg);
        
        this.x = Math.random() * fg.div.offsetWidth;
        this.y = Math.random() * fg.div.offsetHeight;
        this.delay = Math.random();
        let hue:number = Math.random() * 50;

        this._div.classList.add("fish-"+sort);
        this._div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
        this._div.style.animationDelay = this.delay+"s";
        this._div.style.webkitFilter = "hue-rotate("+hue+"deg)";
        this._div.style.filter = "hue-rotate("+hue+"deg)";
    }

    public createDiv(fg:FishGroup){
        this._div = document.createElement("fish");
        fg.div.appendChild(this._div);
    }

    public delete(){
        this._div.parentNode.removeChild(this._div);
    }

}