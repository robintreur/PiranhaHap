var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Character = (function () {
    function Character(g) {
        this.divName = "div";
        this.hue = Math.random() * 0;
        this.deleted = false;
        this.x = window.innerWidth + 200;
        this.y = Math.random() * window.innerHeight;
        this.speed = Math.random() * 2;
        this.delay = Math.random();
    }
    Object.defineProperty(Character.prototype, "div", {
        get: function () {
            return this._div;
        },
        enumerable: true,
        configurable: true
    });
    Character.prototype.createDiv = function () {
        this._div = document.createElement(this.divName);
        document.body.appendChild(this._div);
        this._div.style.animationDelay = this.delay + "s";
    };
    Character.prototype.changeColor = function () {
        this._div.style.webkitFilter = "hue-rotate(" + this.hue + "deg)";
        this._div.style.filter = "hue-rotate(" + this.hue + "deg)";
    };
    Character.prototype.delete = function () {
        this._div.remove();
    };
    Character.prototype.move = function () {
        this.x -= this.speed;
        if (this.x < -200) {
            this.delete();
        }
        this._div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Character;
}());
var Blowfish = (function (_super) {
    __extends(Blowfish, _super);
    function Blowfish(g) {
        var _this = _super.call(this, g) || this;
        _this.divName = "blowfish";
        _this.delay = Math.random() * 0;
        _this.createDiv();
        _this.hue = Math.random() * 400;
        _this.changeColor();
        return _this;
    }
    Blowfish.prototype.blow = function (isBlow) {
        if (isBlow == "yes") {
            this._div.style.backgroundPosition = "0 0";
            this.x -= this.speed * 2;
            this.rotate = Math.random() * 15;
            this._div.style.transform = "translate(" + this.x + "px," + this.y + "px) rotate(" + this.rotate + "deg)";
        }
        else {
            this._div.style.backgroundPosition = "0 -65px";
        }
    };
    return Blowfish;
}(Character));
var Dashboard = (function () {
    function Dashboard(g, m) {
        var _this = this;
        this.score = 0;
        this.time = 500;
        this.piranhaLifes = 3;
        this.piranhaHealth = 100;
        this.createDiv(m);
        this.healthInterval = setInterval(function () { return _this.health(g); }, 500);
        if (m.mode == "survival") {
            this.updateTimeInterval = setInterval(function () { return _this.updateTime(g); }, 1000);
        }
    }
    Object.defineProperty(Dashboard.prototype, "div", {
        get: function () {
            return this._div;
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.updateTime = function (g) {
        this.time--;
        this._divTime.innerHTML = this.time + " seconds";
        this._div.appendChild(this._divTime);
        if (this.time <= 0) {
            g.finish("won");
        }
    };
    Dashboard.prototype.createDiv = function (m) {
        this._div = document.createElement("dashboard");
        document.body.appendChild(this._div);
        this._divLifes = document.createElement("lifes");
        this._div.appendChild(this._divLifes);
        for (var i = 0; i < this.piranhaLifes; i++) {
            this._divLife = document.createElement("life");
            this._divLifes.appendChild(this._divLife);
        }
        if (m.mode == "normal") {
            this._divScore = document.createElement("score");
            this._divScore.innerHTML = "Score: " + this.score + "/500";
            this._div.appendChild(this._divScore);
        }
        else if (m.mode == "survival") {
            this._divTime = document.createElement("time");
            this._divTime.innerHTML = this.time + " seconds";
            this._div.appendChild(this._divTime);
        }
        this._divHealth = document.createElement("health");
        this._div.appendChild(this._divHealth);
        this._divHealthBar = document.createElement("bar");
        this._divHealthBar.style.height = this.piranhaHealth + "%";
        this._divHealth.appendChild(this._divHealthBar);
        this._divHealthHeart = document.createElement("heart");
        this._divHealthBar.appendChild(this._divHealthHeart);
    };
    Dashboard.prototype.health = function (g) {
        this.piranhaHealth--;
        if (this.piranhaHealth <= 0) {
            g.resetGame();
            this.piranhaHealth = 100;
        }
        this.changeHealth();
    };
    Dashboard.prototype.removeLife = function () {
        for (var i = 0; i < this.piranhaLifes; i++) {
            this._divLifes.remove();
        }
        this.piranhaLifes--;
        this._divLifes = document.createElement("lifes");
        this._div.appendChild(this._divLifes);
        for (var i = 0; i < this.piranhaLifes; i++) {
            this._divLife = document.createElement("life");
            this._divLifes.appendChild(this._divLife);
        }
    };
    Dashboard.prototype.changeHealth = function () {
        this._divHealthBar.style.height = this.piranhaHealth + "%";
        this._divHealth.appendChild(this._divHealthBar);
    };
    Dashboard.prototype.changeScore = function (g) {
        this.score++;
        this._divScore.innerHTML = "Score: " + this.score + "/500";
        this._div.appendChild(this._divScore);
        if (this.score >= 500) {
            g.finish("won");
        }
    };
    return Dashboard;
}());
var Eel = (function (_super) {
    __extends(Eel, _super);
    function Eel(g) {
        var _this = _super.call(this, g) || this;
        _this.divName = "eel";
        _this.createDiv();
        _this.hue = Math.random() * 100;
        _this.changeColor();
        return _this;
    }
    return Eel;
}(Character));
var Fish = (function () {
    function Fish(fg, sort) {
        this.createDiv(fg);
        this.x = Math.random() * fg.div.offsetWidth;
        this.y = Math.random() * fg.div.offsetHeight;
        this.delay = Math.random();
        var hue = Math.random() * 50;
        this._div.classList.add("fish-" + sort);
        this._div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this._div.style.animationDelay = this.delay + "s";
        this._div.style.webkitFilter = "hue-rotate(" + hue + "deg)";
        this._div.style.filter = "hue-rotate(" + hue + "deg)";
    }
    Object.defineProperty(Fish.prototype, "div", {
        get: function () {
            return this._div;
        },
        enumerable: true,
        configurable: true
    });
    Fish.prototype.createDiv = function (fg) {
        this._div = document.createElement("fish");
        fg.div.appendChild(this._div);
    };
    Fish.prototype.delete = function () {
        this._div.parentNode.removeChild(this._div);
    };
    return Fish;
}());
var FishGroup = (function (_super) {
    __extends(FishGroup, _super);
    function FishGroup(g) {
        var _this = _super.call(this, g) || this;
        _this.fishes = new Array();
        _this.width = Math.floor(Math.random() * 100 + 150);
        _this.height = Math.floor(Math.random() * 50 + 100);
        _this.divName = "fishgroup";
        _this.createDiv();
        _this._div.style.width = _this.width + "px";
        _this._div.style.height = _this.height + "px";
        _this.createFishes();
        return _this;
    }
    FishGroup.prototype.createFishes = function () {
        var numFishes = Math.floor(Math.random() * 20 + 10);
        var randomFish = Math.floor(Math.random() * 3 + 1);
        for (var i = 0; i < numFishes; i++) {
            var f = new Fish(this, randomFish);
            this.fishes.push(f);
        }
    };
    return FishGroup;
}(Character));
var Piranha = (function () {
    function Piranha(g) {
        var _this = this;
        this.upSpeed = 0;
        this.downSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.rotation = 180;
        this.x = 0;
        this.y = (window.innerHeight / 2) - 35;
        this.createDiv();
        this.move();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Object.defineProperty(Piranha.prototype, "div", {
        get: function () {
            return this._div;
        },
        enumerable: true,
        configurable: true
    });
    Piranha.prototype.createDiv = function () {
        this._div = document.createElement("piranha");
        document.body.appendChild(this._div);
    };
    Piranha.prototype.move = function () {
        this.x = this.x - this.leftSpeed + this.rightSpeed;
        this.y = this.y - this.upSpeed + this.downSpeed;
        this._div.style.transform = "translate(" + this.x + "px," + this.y + "px) rotateY(" + this.rotation + "deg)";
    };
    Piranha.prototype.eating = function (g, isEating) {
        if (isEating == "yes") {
            this._div.style.backgroundPosition = "0 -66px";
        }
        else {
            this._div.style.backgroundPosition = "0 0";
        }
    };
    Piranha.prototype.dead = function () {
        this._div.remove();
    };
    Piranha.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
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
    };
    Piranha.prototype.onKeyUp = function (e) {
        this.upSpeed = this.downSpeed = this.leftSpeed = this.rightSpeed = 0;
    };
    return Piranha;
}());
var Game = (function () {
    function Game(m) {
        var _this = this;
        this.fishGroups = new Array();
        this.eels = new Array();
        this.blowfish = new Array();
        this.numCharacters = 1;
        this.dashboard = new Dashboard(this, m);
        this.createPiranha();
        this.createCharacter();
        this.createCharacterInterval = setInterval(function () { return _this.createCharacter(); }, 20000);
        this.gameRequestAnimationFrame = requestAnimationFrame(function () { return _this.gameLoop(m); });
    }
    Game.prototype.createPiranha = function () {
        this.piranha = new Piranha(this);
        this.piranha.upkey = 38;
        this.piranha.downkey = 40;
        this.piranha.leftkey = 37;
        this.piranha.rightkey = 39;
    };
    Game.prototype.createCharacter = function () {
        for (var i = 0; i < (this.numCharacters); i++) {
            this.eels.push(new Eel(this));
        }
        for (var i = 0; i < this.numCharacters; i++) {
            this.blowfish.push(new Blowfish(this));
        }
        for (var i = 0; i < 3; i++) {
            this.fishGroups.push(new FishGroup(this));
        }
        this.numCharacters++;
    };
    Game.prototype.resetGame = function () {
        this.dashboard.piranhaHealth = 100;
        for (var _i = 0, _a = this.blowfish; _i < _a.length; _i++) {
            var bf = _a[_i];
            bf.delete();
        }
        for (var _b = 0, _c = this.eels; _b < _c.length; _b++) {
            var e = _c[_b];
            e.delete();
        }
        this.eels = [];
        this.blowfish = [];
        this.piranha.dead();
        this.createPiranha();
        this.dashboard.removeLife();
        if (this.dashboard.piranhaLifes < 0) {
            this.finish("game over");
        }
    };
    Game.prototype.finish = function (status) {
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
        if (status == "game over") {
            this._divFinishText.innerHTML = "Game over!";
        }
        else {
            this._divFinishText.innerHTML = "Je hebt gewonnen!";
            this._divFinishCode = document.createElement("code");
            this._divFinishCode.innerHTML = "Code: 938";
            this._divFinish.appendChild(this._divFinishCode);
        }
        this._divFinish.appendChild(this._divFinishText);
        this._divFinishAgain = document.createElement("again");
        this._divFinishAgain.innerHTML = "Speel opniew";
        this._divFinish.appendChild(this._divFinishAgain);
        this._divFinishAgain.addEventListener("click", function () {
            location.reload();
        });
    };
    Game.prototype.gameOver = function () {
        console.log("GAME OVER!!!!");
        this.piranha = undefined;
    };
    Game.prototype.gameLoop = function (m) {
        var _this = this;
        this.piranha.move();
        for (var _i = 0, _a = this.fishGroups; _i < _a.length; _i++) {
            var fg = _a[_i];
            fg.move();
        }
        for (var _b = 0, _c = this.blowfish; _b < _c.length; _b++) {
            var bf = _c[_b];
            bf.move();
        }
        for (var _d = 0, _e = this.eels; _d < _e.length; _d++) {
            var e = _e[_d];
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
        this.gameRequestAnimationFrame = requestAnimationFrame(function () { return _this.gameLoop(m); });
    };
    Game.prototype.dead = function () {
        var piranhaPlace = this.piranha.div.getBoundingClientRect();
        for (var _i = 0, _a = this.blowfish; _i < _a.length; _i++) {
            var bf = _a[_i];
            var blowfishPlace = bf.div.getBoundingClientRect();
            bf.blow("no");
            if (piranhaPlace.left < blowfishPlace.right + 80 &&
                piranhaPlace.right > blowfishPlace.left - 80 &&
                piranhaPlace.top < blowfishPlace.bottom + 80 &&
                piranhaPlace.bottom > blowfishPlace.top - 80) {
                bf.blow("yes");
            }
            if (piranhaPlace.left < blowfishPlace.right &&
                piranhaPlace.right > blowfishPlace.left &&
                piranhaPlace.top < blowfishPlace.bottom &&
                piranhaPlace.bottom > blowfishPlace.top) {
                this.resetGame();
            }
        }
        for (var _b = 0, _c = this.eels; _b < _c.length; _b++) {
            var e = _c[_b];
            var eelPlace = e.div.getBoundingClientRect();
            if (piranhaPlace.left < eelPlace.right &&
                piranhaPlace.right > eelPlace.left &&
                piranhaPlace.top < eelPlace.bottom &&
                piranhaPlace.bottom > eelPlace.top) {
                this.resetGame();
            }
        }
    };
    Game.prototype.eat = function (m) {
        var piranhaPlace = this.piranha.div.getBoundingClientRect();
        this.piranha.eating(this, "no");
        for (var _i = 0, _a = this.fishGroups; _i < _a.length; _i++) {
            var fg = _a[_i];
            for (var _b = 0, _c = fg.fishes; _b < _c.length; _b++) {
                var f = _c[_b];
                var fishPlace = f.div.getBoundingClientRect();
                if (piranhaPlace.left < fishPlace.right &&
                    piranhaPlace.right > fishPlace.left &&
                    piranhaPlace.top < fishPlace.bottom &&
                    piranhaPlace.bottom > fishPlace.top) {
                    this.piranha.eating(this, "yes");
                    if (this.dashboard.piranhaHealth < 100) {
                        this.dashboard.piranhaHealth++;
                    }
                    if (m.mode == "normal") {
                        this.dashboard.changeScore(this);
                    }
                    f.delete();
                }
            }
        }
    };
    return Game;
}());
var Menu = (function () {
    function Menu() {
        this.createMenu();
    }
    Menu.prototype.createMenu = function () {
        var _this = this;
        this.menu = document.createElement("menu");
        document.body.appendChild(this.menu);
        this.normalMode = document.createElement("mode");
        this.normalMode.classList.add("normal");
        this.normalModeText = document.createElement("text");
        this.normalModeText.innerHTML = "Normal Mode";
        this.normalMode.appendChild(this.normalModeText);
        this.menu.appendChild(this.normalMode);
        this.normalMode.addEventListener("click", function () { return _this.startGame("normal"); });
        this.survivalMode = document.createElement("mode");
        this.survivalMode.classList.add("survival");
        this.menu.appendChild(this.survivalMode);
        this.survivalModeText = document.createElement("text");
        this.survivalModeText.innerHTML = "Survival Mode";
        this.survivalMode.appendChild(this.survivalModeText);
        this.survivalMode.addEventListener("click", function () { return _this.startGame("survival"); });
    };
    Menu.prototype.startGame = function (mode) {
        this.menu.remove();
        this.menu = undefined;
        this.mode = mode;
        this.game = new Game(this);
    };
    return Menu;
}());
window.addEventListener("load", function () {
    new Menu();
});
//# sourceMappingURL=main.js.map