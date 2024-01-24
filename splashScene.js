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
    this.load.image("effect", "./assets/effect.png");
  }

  create(data) {
    this.ship = this.physics.add.sprite(0, 0, "mother").setScale(0.5);
    const { width, height } = this.sys.game.canvas;
    this.ship.x = width / 2;
    this.ship.y = height / 2;
    // this.ship.setGravityY(100);

    const x = -100;
    const y = Math.random() * 720;
    createMirrors.call(this, 50, y, "mother");

    this.missileGroup = this.physics.add.group();
  }

  update(time, delta) {
    const angle = Phaser.Math.Angle.Between(
      enemies[0].x,
      enemies[0].y,
      this.ship.x,
      this.ship.y
    );
    var velocityX1 = Math.cos(angle) * 50;
    var velocityY1 = Math.sin(angle) * 50;
    // enemies[0].setVelocity(velocityX1, velocityY1);

    // this.keys = this.input.keyboard.createCursorKeys();aw
    const keyW = this.input.keyboard.addKey("w");
    const keyA = this.input.keyboard.addKey("a");
    const keyD = this.input.keyboard.addKey("d");
    const keyL = this.input.keyboard.addKey("l");
    let angleInRadians = Phaser.Math.DegToRad(this.ship.angle);

    // Obliczenie składników X i Y wektora prędkości
    const velocityX = 1 * Math.cos(angleInRadians);
    const velocityY = 1 * Math.sin(angleInRadians);

    for (let i = 0; i < enemies.length; i++) {
      // enemies[i].x += 2;
      enemies[i].setVelocity(velocityX1, velocityY1);
      if (enemies[i].x > 0) enemiesSigns[i].setAlpha(0);
    }

    if (keyW.isDown) {
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

      const createMissile = () => {
        const aNewmissile = this.physics.add
          .sprite(this.ship.x, this.ship.y, "missile")
          .setRotation(angleInRadians + Phaser.Math.DegToRad(90));
        this.missileGroup.add(aNewmissile);
      };

      createMissile.call(this);

      missileInterval = setInterval(() => {
        createMissile.call(this);
      }, 200);
    }

    if (keyL.isUp) {
      flagOfMissile = true;
      clearInterval(missileInterval);
    }

    this.missileGroup.children.each(function (item) {
      // item.y = item.y - 15;
      item.x += velocityX;
      item.y += velocityY;
    });

    // if (this.ship.y > 720) alert("game over");
  }
}

function createMirrors(x, y, image) {
  // const ship = this.add.image(x, y, image).setScale(0.5);
  const ship = this.physics.add.sprite(x, y, image).setScale(0.5);
  enemies.push(ship);

  const effect = this.add.image(5, y, "effect").setScale(0.1);
  enemiesSigns.push(effect);
}

const enemies = [];
const enemiesSigns = [];
let flagOfMissile = true;
let missileInterval;

export default SplashScene;
