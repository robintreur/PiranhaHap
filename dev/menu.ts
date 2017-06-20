/// <reference path="game.ts"/>

class Menu {
    private menu:HTMLElement;
    private normalMode:HTMLElement;
    private normalModeText:HTMLElement;
    private survivalMode:HTMLElement;
    private survivalModeText:HTMLElement;
    public mode:string;
    private game:Game;

    constructor(){
        this.createMenu();
    }
    private createMenu(){
        this.menu = document.createElement("menu");
        document.body.appendChild(this.menu);

        // Create normal mode button
        this.normalMode = document.createElement("mode");
        this.normalMode.classList.add("normal");
        this.normalModeText = document.createElement("text");
        this.normalModeText.innerHTML = "Normal Mode";
        this.normalMode.appendChild(this.normalModeText);
        this.menu.appendChild(this.normalMode);

        this.normalMode.addEventListener("click", () => this.startGame("normal"));

        // Create survival mode button
        this.survivalMode = document.createElement("mode");
        this.survivalMode.classList.add("survival");
        this.menu.appendChild(this.survivalMode);
        this.survivalModeText = document.createElement("text");
        this.survivalModeText.innerHTML = "Survival Mode";
        this.survivalMode.appendChild(this.survivalModeText);

        this.survivalMode.addEventListener("click", () => this.startGame("survival"));
    }
    private startGame(mode:string){
        this.menu.remove();
        this.menu = undefined;
        this.mode = mode;
        this.game = new Game(this);
    }
    
}
