/// <reference path="character.ts" />

class Eel extends Character {

    constructor(g:Game) {
        super(g);

        this.divName = "eel"
        this.createDiv();
        
        this.hue = Math.random() * 100;
        this.changeColor();
    }

}