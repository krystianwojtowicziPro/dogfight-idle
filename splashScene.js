class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "splashScene" });
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#808080");
  }

  preload() {
    this.load.image("mother", "./assets/Mother.png");
    this.load.image("missile", "./assets/missile.png");
  }

  create(data) {
    this.ship = this.physics.add.sprite(0, 0, "mother").setScale(0.5);
    const { width, height } = this.sys.game.canvas;
    this.ship.x = width / 2;
    this.ship.y = height / 2;
    // this.ship.setGravityY(100);

    this.missileGroup = this.physics.add.group();
  }

  update(time, delta) {
    // this.keys = this.input.keyboard.createCursorKeys();aw
    const keyW = this.input.keyboard.addKey("w");
    const keyA = this.input.keyboard.addKey("a");
    const keyD = this.input.keyboard.addKey("d");
    const keyL = this.input.keyboard.addKey("l");

    if (keyW.isDown) {
      const angleInRadians = Phaser.Math.DegToRad(this.ship.angle);

      // Obliczenie składników X i Y wektora prędkości
      const velocityX = 1 * Math.cos(angleInRadians);
      const velocityY = 1 * Math.sin(angleInRadians);

      // Zastosowanie wektora prędkości do obiektu ship
      this.ship.x += velocityX;
      this.ship.y += velocityY;
    } else {
      this.ship.y += 2;
    }

    if (keyA.isDown) this.ship.rotation += Phaser.Math.DegToRad(-2);
    if (keyD.isDown) this.ship.rotation += Phaser.Math.DegToRad(2);

    if (keyL.isDown && flagOfMissile) {
      flagOfMissile = false;
      missileInterval = setInterval(() => {
        const aNewmissile = this.physics.add.sprite(
          this.ship.x,
          this.ship.y,
          "missile"
        );
        this.missileGroup.add(aNewmissile);
      }, 200);
    }

    if (keyL.isUp) {
      flagOfMissile = true;
      clearInterval(missileInterval);
    }

    // if (this.ship.y > 720) alert("game over");
  }
}
let flagOfMissile = true;
let missileInterval;

export default SplashScene;
