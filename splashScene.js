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
    this.missileGroup1 = this.physics.add.group();

    this.physics.add.collider(
      this.missileGroup,
      enemies,
      function (missleCollide, enemyCollide) {
        missleCollide.destroy();
        enemyCollide.destroy();
        enemies.length--;
      }.bind(this)
    );
  }

  update(time, delta) {
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
      const currentTime = this.time.now;
      // enemies[i].x += 2;
      const angle = Phaser.Math.Angle.Between(
        enemies[i].x,
        enemies[i].y,
        this.ship.x,
        this.ship.y
      );
      const velocityX = Math.cos(angle) * 50;
      const velocityY = Math.sin(angle) * 50;
      enemies[i].setVelocity(velocityX, velocityY);
      const angleToShip = Math.atan2(
        this.ship.y - enemies[i].y,
        this.ship.x - enemies[i].x
      );
      const angleInDegrees = Phaser.Math.RadToDeg(angleToShip);
      enemies[i].rotation = Phaser.Math.DegToRad(angleInDegrees);
      if (enemies[i].x > 0) {
        enemiesSigns[i].setAlpha(0);
        const createMissileEnemies = () => {
          const aNewMissile = this.physics.add
            .sprite(enemies[i].x, enemies[i].y, "missile")
            .setRotation(angleToShip + Phaser.Math.DegToRad(90));
          this.missileGroup1.add(aNewMissile);

          aNewMissile.startAngle = angleToShip;
        };
        if (currentTime - lastTime >= 5000) {
          createMissileEnemies.call(this);
          lastTime = currentTime;
        }
      }
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
        const aNewMissile = this.physics.add
          .sprite(this.ship.x, this.ship.y, "missile")
          .setRotation(angleInRadians + Phaser.Math.DegToRad(90));
        this.missileGroup.add(aNewMissile);

        aNewMissile.startAngle = angleInRadians;
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

    function updateShot(item) {
      const missileAngleInRadians = item.startAngle;
      const missileVelocityX = 2 * Math.cos(missileAngleInRadians);
      const missileVelocityY = 2 * Math.sin(missileAngleInRadians);

      item.x += missileVelocityX;
      item.y += missileVelocityY;
    }

    this.missileGroup.children.each(updateShot);

    this.missileGroup1.children.each(updateShot);

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
let lastTime = 0;

export default SplashScene;
