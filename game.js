import SplashScene from "./splashScene.js";

const splashScene = new SplashScene();

const config = {
  type: Phaser.AUTO,
  // width: "100%",
  // height: "100%",
  width: 1280,
  height: 720,
  backgroundColor: 0x5f6e7a,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

game.scene.add("splashScene", splashScene);

game.scene.start("splashScene");
