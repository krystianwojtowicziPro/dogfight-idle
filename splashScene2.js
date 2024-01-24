class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "splashScene" });
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#0fffff");
  }

  preload() {
    this.load.image("background", "./assets/background.png");
    this.load.image("spacecraft", "./assets/Mother.png");
    this.load.image("wrapperMother", "./assets/wrapper.png");
    this.load.image("hoverButton", "./assets/button.png");
    this.load.image("hoverButton1", "./assets/button1.png");
    this.load.image("laser", "./assets/missile1.png");
    this.load.image("laser2", "./assets/missile2.png");
    this.load.image("start", "./assets/start.png");
    this.load.image("ship", "./assets/ship.png");
    this.load.image("strzal", "./assets/button_s.png");
    this.load.image("strzal_h", "./assets/button_s1.png");
    this.load.image("underShip", "./assets/underShip.png");
    this.load.image("comet", "./assets/comet.png");
    this.load.image("comet2", "./assets/comet2.png");
    this.load.image("effect", "./assets/effect.png");
    this.load.image("intro", "./assets/intro.png");
    this.load.image("intro2", "./assets/intro2.png");
    this.load.image("okButton", "./assets/okButton.png");
    this.load.image("okButtonHover", "./assets/okButtonHover.png");
    this.load.image("marsjanin", "./assets/marsjanin.png");
    this.load.image("shipInfo", "./assets/hoverShip.png");
    this.load.image("rightUpCorner", "./assets/rightUpCorner.png");
    this.load.image("skull", "./assets/skull.png");
    this.load.image("settings", "./assets/settings.png");
    this.load.image("xIcon", "./assets/x.png");
    this.load.image("shipIcon", "./assets/shipIcon.png");
    this.load.image("rightBottomCorner", "./assets/rightBottomCorner.png");
    this.load.image("energy", "./assets/energy.png");
    this.load.image("energy7", "./assets/energy7.png");
    this.load.image("energy6", "./assets/energy6.png");
    this.load.image("energy5", "./assets/energy5.png");
    this.load.image("energy4", "./assets/energy4.png");
    this.load.image("energy3", "./assets/energy3.png");
    this.load.image("energy2", "./assets/energy2.png");
    this.load.image("energy1", "./assets/energy1.png");
    this.load.image("data", "./assets/data.png");
    this.load.image("instruction", "./assets/instruction.png");
    this.load.image("chineseText", "./assets/chineseText.png");
    this.load.image("chineseText2", "./assets/chineseText2.png");
    this.load.image("chineseTextWrapper", "./assets/chineseTextWrapper.png");
    this.load.image("shipAnimation", "./assets/shipAnimation.png");
    this.load.image("shipAnimation2", "./assets/shipAnimation2.png");
    this.load.image("starr2_00", "./assets/starr2_00.png");
    this.load.image("starr2_01", "./assets/starr2_01.png");
    this.load.image("starr2_02", "./assets/starr2_02.png");
  }

  create(data) {
    const disableImagesWithDelay2 = (images, delay) => {
      return new Promise((resolve) => {
        let completed = 0;

        for (let index = images.length - 1; index >= 0; index--) {
          setTimeout(() => {
            images[index].setAlpha(1);
            completed++;

            if (completed === images.length) {
              resolve(); // Rozwiąż obietnicę po zakończeniu wszystkich operacji
            }
          }, delay * (images.length - index - 1));
        }
      });
    };

    const disableImagesWithDelay = (images, delay) => {
      isHoverOverShips = false;
      return new Promise((resolve) => {
        let completed = 0;

        images.forEach((image, index) => {
          setTimeout(() => {
            image.setAlpha(0);
            completed++;

            if (completed === images.length) {
              resolve(); // Rozwiąż obietnicę po zakończeniu wszystkich operacji
            }
          }, delay * index);
        });
      });
    };

    this.background = this.add.sprite(0, 0, "background");
    let { width, height } = this.sys.game.canvas;
    this.background.x = width / 2;
    this.background.y = height / 2;
    const scaleX = width / this.background.width;
    const scaleY = height / this.background.height;
    this.background.setScale(scaleX, scaleY);
    const background = this.background;
    background.setInteractive();

    background.on("pointerover", function (pointer) {
      // Tutaj dodaj logikę lub funkcję, która zostanie wykonana po kliknięciu
      hide_buttons_glob();
    });

    const texts = [
      "To teraz. Misja Ocalenie. Nasza szansa na uratowanie \nZiemii przed ostateczną zagładą. Macie do dyspozycji trzy \nstrzały. Potem będzie za późno. Wszystko w waszych \nrękach drużyno TSS. ćwiczyliście to już wstępnie 4 razy, \nstrzał powienien być czysty. Do dzieła. Zniszczcie kometę \ni ocalcie Ziemię. A potem będziemy świętować. DO \nDZIEŁA!!!",
      "Ustaw główną stację tak, aby przyrząd nawigacyjny \nwskazywał na kolejną, najbliższą stację.",
    ];
    let isOkButtonPressed = false;
    let chineseTextFlag = true;
    let load = 79;

    let strzal_bnt;

    const generateEnergyImage = (textureKey, offsetX, offsetY) => {
      const energyImage = this.add.image(
        this.rightBottomCorner.x + offsetX,
        this.rightBottomCorner.y + offsetY,
        textureKey
      );
      energyImages.push(energyImage);
    };

    const generateElements = () => {
      this.energy = this.add.image(
        this.rightBottomCorner.x,
        this.rightBottomCorner.y - 20,
        "energy"
      );

      generateEnergyImage("energy7", -50, -20);
      generateEnergyImage("energy6", -50, -20);
      generateEnergyImage("energy5", -50, -20);
      generateEnergyImage("energy4", -50, -20);
      generateEnergyImage("energy3", -50, -20);
      generateEnergyImage("energy2", -50, -20);
      generateEnergyImage("energy1", -50, -20);

      this.data = this.add
        .image(
          this.rightBottomCorner.x - 120,
          this.rightBottomCorner.y + 40,
          "data"
        )
        .setScale(0.8, 0.9);

      this.instruction = this.add
        .image(
          this.rightBottomCorner.x + 120,
          this.rightBottomCorner.y + 40,
          "instruction"
        )
        .setScale(0.8, 0.9);

      this.chineseTextWrapper = this.add.image(
        this.rightBottomCorner.x,
        this.rightBottomCorner.y - 150,
        "chineseTextWrapper"
      );

      this.chineseText = this.add.image(
        this.chineseTextWrapper.x + 20,
        this.chineseTextWrapper.y - 20,
        "chineseText"
      );

      this.chineseText2 = this.add
        .image(
          this.chineseTextWrapper.x + 20,
          this.chineseTextWrapper.y - 20,
          "chineseText2"
        )
        .setAlpha(0);

      this.textLoad = this.add.text(
        this.chineseTextWrapper.x + 160,
        this.chineseTextWrapper.y + 20,
        load,
        {
          font: "14px Arial",
          fill: "#ffffff",
        }
      );

      setInterval(() => {
        if (chineseTextFlag) {
          this.chineseText.setAlpha(0);
          this.chineseText2.setAlpha(1);
        } else {
          this.chineseText2.setAlpha(0);
          this.chineseText.setAlpha(1);
        }
        this.textLoad.setText(load++);
        chineseTextFlag = !chineseTextFlag;
      }, 200);

      strzal_bnt = this.add.image(
        this.rightBottomCorner.x,
        this.rightBottomCorner.y + 40,
        "strzal"
      );

      strzal_bnt.setInteractive();

      strzal_bnt.on("pointerdown", function (pointer) {
        // Tutaj dodaj logikę lub funkcję, która zostanie wykonana po kliknięciu
        if (isHoverOverShips) {
          var kat_w_rad = kat_strzalu * (Math.PI / 180);
          var xComponent = Math.cos(kat_w_rad); // Składowa X wektora
          var yComponent = Math.sin(kat_w_rad);
          strzel_wkierunku.call(this, xComponent, yComponent);
        }
      });

      strzal_bnt.on(
        "pointerover",
        function (pointer) {
          // Tutaj możesz dodać logikę lub zmianę obrazka podczas najechania myszką
          if (isHoverOverShips) this.setTexture("strzal_h");
          // 'this' wskazuje na bieżący przycisk obsługujący zdarzenie 'pointerover'
        },
        strzal_bnt
      ); // Ustawienie kontekstu na obiekt 'buttons[i]'

      strzal_bnt.on(
        "pointerout",
        function (pointer) {
          // Tutaj możesz dodać logikę lub zmianę obrazka podczas najechania myszką
          this.setTexture("strzal"); // 'this' wskazuje na bieżący przycisk obsługujący zdarzenie 'pointerover'
        },
        strzal_bnt
      ); // Ustawienie kontekstu na obiekt 'buttons[i]'
    };

    this.rightBottomCorner = this.add.image(1280, 720, "rightBottomCorner");
    this.rightBottomCorner.x += this.rightBottomCorner.width / 2;
    this.rightBottomCorner.y -= this.rightBottomCorner.height / 2;

    const rightBottomCornerGlide = this.tweens.add({
      targets: this.rightBottomCorner,
      x: 720 + this.rightBottomCorner.width - 100,
      duration: 200, // Czas trwania animacji w milisekundach
      onComplete: () => {
        generateElements();
      },
    });
    rightBottomCornerGlide.play();

    this.rightUpCorner = this.add.sprite(1280, 0, "rightUpCorner").setDepth(1);
    this.rightUpCorner.x -= this.rightUpCorner.width / 2;
    this.rightUpCorner.y += this.rightUpCorner.height / 2;

    this.skull = this.add
      .sprite(this.rightUpCorner.x - 70, this.rightUpCorner.y - 20, "skull")
      .setDepth(1)
      .setScale(0.4);
    this.shipIcon = this.add
      .sprite(this.rightUpCorner.x - 10, this.rightUpCorner.y - 20, "shipIcon")
      .setDepth(1)
      .setScale(0.4);
    this.settings = this.add
      .sprite(this.rightUpCorner.x + 50, this.rightUpCorner.y - 20, "settings")
      .setDepth(1)
      .setScale(0.4);
    this.xIcon = this.add
      .sprite(this.rightUpCorner.x + 100, this.rightUpCorner.y - 20, "xIcon")
      .setDepth(1)
      .setScale(0.4);

    const scaleOfIntro = 0.5;
    this.intro = this.add.sprite(0, 0, "intro").setScale(scaleOfIntro);
    this.intro.x = (this.intro.width / 2) * scaleOfIntro;
    this.intro.y = (this.intro.height / 2) * scaleOfIntro;

    this.intro2 = this.add
      .sprite(0, 0, "intro2")
      .setScale(scaleOfIntro)
      .setAlpha(0);
    this.intro2.x = (this.intro2.width / 2) * scaleOfIntro;
    this.intro2.y = (this.intro2.height / 2) * scaleOfIntro + 10;

    this.ufo = this.add.sprite(85, 85, "marsjanin").setScale(scaleOfIntro);

    this.textSalvation = this.add.text(170, 40, texts[0], {
      font: "14px Arial",
      fill: "#ffffff",
    });

    this.okButton = this.add.sprite(0, 0, "okButton").setRotation(Math.PI);
    this.okButton.x = this.intro.x + 215;
    this.okButton.y = this.intro.y + 85;
    this.okButton.setInteractive({ useHandCursor: true });
    this.okButton.on("pointerdown", () => {
      this.okButtonHover.setAlpha(0);
      this.okButton.setAlpha(0);
      this.textOkButton.setAlpha(0);
      this.textSalvation.setAlpha(0);
      this.ufo.setAlpha(0);
      if (!isOkButtonPressed) {
        isOkButtonPressed = true;
        this.intro.setAlpha(0);
        setTimeout(() => {
          this.intro2.setAlpha(1);
          this.ufo.setAlpha(1);
          this.textSalvation.setText(texts[1]);
          this.textSalvation.y += 20;
          this.textSalvation.setAlpha(1);
          this.okButton.setAlpha(1);
          this.textOkButton.setAlpha(1);
        }, 2000);
      } else {
        this.intro2.setAlpha(0);
      }
    });
    this.okButton.on("pointerover", () => {
      this.okButton.setTexture("okButtonHover");
    });
    this.okButton.on("pointerout", () => {
      this.okButton.setTexture("okButton");
    });

    this.okButtonHover = this.add
      .sprite(0, 0, "okButtonHover")
      .setRotation(Math.PI)
      .setAlpha(0);
    this.okButtonHover.x = this.okButton.x;
    this.okButtonHover.y = this.okButton.y;

    this.textOkButton = this.add.text(
      this.okButton.x - 20,
      this.okButton.y - 12,
      "OK",
      {
        font: "24px Arial",
        fill: "#ffffff",
      }
    );

    createEffect.call(this, 0, 0, "effect");
    createComet.call(this, 1100, 250, "comet", "comet2", 0.5);
    createMirrors.call(
      this,
      250,
      300,
      "spacecraft",
      0.8,
      0.6,
      "statek Promień"
    );
    show_komet.call(this, 1200, 65);
    // createMirrors.call(this, 250, 650, 'ship', 1.3, 0.6, 'underShip');
    //createMirrors.call(this, 250, 100, "ship", 1.3, 0.6);
    //createMirrors.call(this, 50, 300, "ship", 1.3, 0.6);
    // createMirrors.call(this, 50, 100, 'ship', 1.3, 0.6, 'underShip');
    //createMirrors.call(this, 450, 100, "ship", 1.3, 0.6);
    // createMirrors.call(this, 450, 650, 'ship', 1.3, 0.6, 'underShip');

    createMirrors.call(
      this,
      590,
      650,
      "ship",
      1.3,
      0.6,
      "Stacja Lustro RX-01",
      "underShip"
    );
    createMirrors.call(
      this,
      780,
      420,
      "ship",
      1,
      0.6,
      "Stacja Lustro RX-02",
      "underShip"
    );
    createMirrors.call(
      this,
      550,
      270,
      "ship",
      0.9,
      0.6,
      "Stacja Lustro RX-03",
      "underShip"
    );
    createMirrors.call(
      this,
      1100,
      250,
      "ship",
      0.6,
      0.6,
      "Stacja Lustro RX-04",
      "underShip"
    );
    var graphics = this.add.graphics();
    //show_komet.call(this, 300, 100);

    function arePointsClose(point1, point2, threshold) {
      const distance = Math.sqrt(
        (point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2
      );
      return distance <= threshold;
    }

    const arrayOfShipsAnimations = [];

    const strzel_wkierunku = (x_poz, y_poz) => {
      (() => {
        disableImagesWithDelay(energyImages, 1700).then(() => {
          graphics.clear();
          effect.setAlpha(0);
          arrayOfShipsAnimations.forEach((item) => clearInterval(item));
          objects_mirrors_animations.forEach((item) => item.setAlpha(0));
          objects_mirrors_animations2.forEach((item) => item.setAlpha(0));
          Points_colision = [];
          clearInterval(myInterval);
          //console.log(kat_strzalu);
          disableImagesWithDelay2(energyImages, 1700).then(() => {
            isHoverOverShips = true;
          });
        });
      })();

      var collidedRectangles = []; // Popraw nazwę zmiennej
      var collisionDetected = false;

      var maxDistance = 2000;
      let startOfShootX = 250;
      let startOfShootY = 300;

      let backup_strzal_wczesniejszy_X = startOfShootX;
      var currentX = startOfShootX;
      var currentY = startOfShootY;
      var kat_lini = 360 - Math.abs(kat_strzalu);
      // console.log(normalizeAngle(kat_lini));

      let angleInRadians = kat_lini * (Math.PI / 180);

      // Obliczenie współrzędnych wektora
      let x = Math.cos(angleInRadians);
      let y = Math.sin(angleInRadians);

      show_starr.call(this, startOfShootX + 60 * x, startOfShootY + 60 * y);
      Points_colision.push(startOfShootX + 60 * x);
      Points_colision.push(startOfShootY + 60 * y);

      //show_starr.call(this, startOfShootX + 1000 * x, startOfShootY + 1000 * y);

      graphics.lineStyle(4, 0xffd900, 1);

      graphics.beginPath();
      graphics.moveTo(startOfShootX, startOfShootY);

      let arrayOfCollisions = [[startOfShootX, startOfShootY]];

      const interval = () => {
        const place = Math.floor(Math.random() * 10) / 10;
        const verticalPlace = Math.floor(Math.random() * 10);
        if (arrayOfCollisions.length > 1) {
          const mirror = Math.floor(
            Math.random() * (arrayOfCollisions.length - 1)
          );
          const x =
            arrayOfCollisions[mirror][0] +
            place *
              (arrayOfCollisions[mirror + 1][0] -
                arrayOfCollisions[mirror][0]) +
            verticalPlace;
          const y =
            arrayOfCollisions[mirror][1] +
            place *
              (arrayOfCollisions[mirror + 1][1] -
                arrayOfCollisions[mirror][1]) +
            verticalPlace;
          if (Math.random() < 1) {
            // Ustaw prawdopodobieństwo według potrzeb
            effect.setAlpha(1).setScale(0.1);
            effect.x = x;
            effect.y = y;
          }
        }
      };

      let startInterval = true;
      while (maxDistance > 0) {
        if (startInterval) {
          myInterval = setInterval(interval, 500);
          effect.setAlpha(1);
        }
        startInterval = false;

        let arrayOfAnimations = [];
        let arrayOfAnimations2 = [];
        let isAnimation1 = true;
        let isAnimation2 = true;
        let isAnimation3 = true;
        let isAnimation4 = true;
        const animationArray = [
          isAnimation1,
          isAnimation2,
          isAnimation3,
          isAnimation4,
        ];

        for (var i = 0; i < objects_mirrors.length; i++) {
          var imageBounds = objects_mirrors[i].getBounds();

          if (
            Phaser.Geom.Intersects.LineToRectangle(
              new Phaser.Geom.Line(
                startOfShootX,
                startOfShootY,
                currentX,
                currentY
              ),
              imageBounds
            )
          ) {
            arrayOfAnimations.push(
              ...objects_mirrors_animations.filter(
                (image) => image.x === objects_mirrors[i].x
              )
            );
            arrayOfAnimations2.push(
              ...objects_mirrors_animations2.filter(
                (image) => image.x === objects_mirrors[i].x
              )
            );
            arrayOfShipsAnimations.push(
              setInterval(() => {
                if (animationArray[arrayOfAnimations.length - 1]) {
                  arrayOfAnimations[arrayOfAnimations.length - 1].setAlpha(0);
                  arrayOfAnimations2[arrayOfAnimations.length - 1].setAlpha(1);
                } else {
                  arrayOfAnimations2[arrayOfAnimations.length - 1].setAlpha(0);
                  arrayOfAnimations[arrayOfAnimations.length - 1].setAlpha(1);
                }
                animationArray[arrayOfAnimations.length - 1] =
                  !animationArray[arrayOfAnimations.length - 1];
              }, 1000)
            );
            startOfShootX = currentX;
            startOfShootY = currentY;

            let close = false;
            for (let i = 0; i < arrayOfCollisions.length; i++) {
              if (
                arePointsClose(
                  arrayOfCollisions[i],
                  [startOfShootX, startOfShootY],
                  42
                )
              ) {
                close = true;
              }
            }
            if (!close) {
              Points_colision.push(currentX);
              Points_colision.push(currentY);
              arrayOfCollisions.push([startOfShootX, startOfShootY]);
            }

            if (!collidedRectangles.includes(objects_mirrors[i])) {
              collidedRectangles.push(objects_mirrors[i]);

              //ze względu na grafiki musi być poprawka do wyliczenia kąta lustra względem promienia czyli 360 - kąt lustra (kąt lustra wylicza w wartościach ujemnych więc można napisać 360 + kąt lustra)
              let wczesniejszy_kat_lini = normalizeAngle(kat_lini);
              let kat_lustra = objects_mirrors[i].angle.toFixed(1) % 360;
              let kat_lustra_poprawiony = normalizeAngle(kat_lustra + 360); //poprawiony by ponieważ ustawienie grafiki

              let kat_zakres_up = normalizeAngle(wczesniejszy_kat_lini - 90);
              let kat_zakres_down = normalizeAngle(wczesniejszy_kat_lini + 90);

              if (
                kat_lustra_poprawiony >= kat_zakres_up &&
                kat_lustra_poprawiony <= kat_zakres_down
              ) {
                maxDistance = 0;
                // Points_colision.push(currentX);
                // Points_colision.push(currentY);
                break;
              } else {
                if (
                  wczesniejszy_kat_lini - 90 < 0 ||
                  wczesniejszy_kat_lini + 90 >= 360
                ) {
                  if (
                    (kat_lustra_poprawiony >= 0 &&
                      kat_lustra_poprawiony <= kat_zakres_down) ||
                    (kat_lustra_poprawiony >= kat_zakres_up &&
                      kat_lustra_poprawiony <= 360)
                  ) {
                    // maxDistance = 0;
                    // Points_colision.push(currentX);
                    // Points_colision.push(currentY);
                    break;
                  }
                }
              }

              // console.log(
              //   `stary kierunek ${wczesniejszy_kat_lini}, ustawienie lustra nr${i} ${kat_lustra_poprawiony}, up:${kat_zakres_up}, down: ${kat_zakres_down} wyjasnienie: ${kat_lustra_poprawiony} >= ${kat_zakres_up} && ${kat_lustra_poprawiony} <= ${kat_zakres_down}`
              // );
              //console.log(Points_colision);

              if (
                kat_lustra_poprawiony >= kat_zakres_up &&
                kat_lustra_poprawiony <= kat_zakres_down
              ) {
                maxDistance = 0;
                // Points_colision.push(currentX);
                // Points_colision.push(currentY);
                break;
              } else {
                if (wczesniejszy_kat_lini - 90 < 0) {
                  if (
                    (kat_lustra_poprawiony >= 0 &&
                      kat_lustra_poprawiony <= kat_zakres_down) ||
                    (kat_lustra_poprawiony >= kat_zakres_up &&
                      kat_lustra_poprawiony <= 360)
                  ) {
                    maxDistance = 0;
                    // Points_colision.push(currentX);
                    // Points_colision.push(currentY);
                    break;
                  }
                }
              }

              kat_lini =
                (2 * kat_lustra_poprawiony -
                  wczesniejszy_kat_lini +
                  180 +
                  360) %
                360;

              var newDirectionX = Math.cos(Phaser.Math.DegToRad(kat_lini));
              var newDirectionY = Math.sin(Phaser.Math.DegToRad(kat_lini));
              // console.log(
              //   `nowy kierunek wektor (${newDirectionX}, ${newDirectionY}`
              // );

              // Utworzenie wektora kierunku na podstawie składowych x i y
              var newDirection = new Phaser.Math.Vector2(
                newDirectionX,
                newDirectionY
              );

              x_poz = newDirectionX;
              y_poz = newDirectionY;
            }
          }
        }

        var imageBounds = comet3.getBounds();
        // imageBounds.height *= 0.9;
        if (
          Phaser.Geom.Intersects.LineToRectangle(
            new Phaser.Geom.Line(
              startOfShootX,
              startOfShootY,
              currentX,
              currentY
            ),
            imageBounds
          )
        ) {
          maxDistance = 0;
          console.log(currentX);
          console.log(currentY);

          arrayOfCollisions.push([currentX, currentY]);
          show_starr.call(this, currentX, currentY);
          Points_colision.push(currentX);
          Points_colision.push(currentY);
          break;
          //show_starr(this, x_poz, y_poz);
          let currentVisibleComet = comet;

          setInterval(function () {
            currentVisibleComet.visible = false; // Ukryj aktualnie widoczny obiekt

            // Przełącz do innego obiektu
            currentVisibleComet =
              currentVisibleComet === comet ? comet2 : comet;
            currentVisibleComet.visible = true;
          }, 500);
        }

        graphics.lineTo(currentX, currentY);

        currentX += x_poz * 10;
        currentY += y_poz * 10;
        maxDistance -= 10;
      }
      // Points_colision.push(currentX);
      // Points_colision.push(currentY);
      graphics.strokePath();

      //console.log(collidedRectangles);

      const path2 = new Phaser.Curves.Path(
        Points_colision[0],
        Points_colision[1]
      );

      const points = Points_colision;
      console.log(points);

      for (let i = 0; i < points.length; i += 2) {
        const x = points[i];
        const y = points[i + 1];
        path2.lineTo(x, y);
      }

      const graphics2 = this.add.graphics();
      graphics2.lineStyle(0, 0xffffff, 0);
      path2.draw(graphics2, 0);
      try {
        lemming.destroy();
      } catch {
        console.log("nie działa");
      }

      lemming = this.add.follower(
        path2,
        Points_colision[0],
        Points_colision[1],
        "starr2_00"
      );

      lemming.startFollow({
        duration: 10000,
        yoyo: false,
        repeat: 0,

        rotateToPath: true,
        verticalAdjust: true,
        onComplete: () => lemming.destroy(),
      });
    };
  }

  update(time, delta) {}
}

function createEffect(x, y, image) {
  effect = this.add.sprite(x, y, image);
  effect.setAlpha(0);
}

function createComet(x, y, image, image2, scale) {
  comet = this.add.image(x, y, image).setScale(scale);
  comet2 = this.add.image(x, y, image2).setScale(scale);
  comet3 = this.add.image(x, y, "underShip").setScale(scale * 0.8, scale);
  comet.x += 100;
  comet2.x += 100;
  comet3.x -= 20;
  comet.y -= 200;
  comet2.y -= 200;
  comet3.y -= 70;
  comet2.visible = false;
  comet3.visible = false;
  //comet.visible = false;
}
/**
 * tworzy obiekt z kołem wyboru kierunku obrotu
 */
function createMirrors(x, y, image, scale, propor, shipInfoText, image2) {
  // Tworzenie sprite'a

  const shipInfo = this.add
    .image(x + 100, y, "shipInfo")
    .setScale(0.5)
    .setAlpha(0);

  const textShipInfo = this.add
    .text(x + 55, y - 15, shipInfoText, {
      font: "12px Arial",
      fill: "#ffffff",
    })
    .setAlpha(0);
  all_buttons_arrows.push(shipInfo);
  all_buttons_arrows.push(textShipInfo);

  const wrapperMother = this.add.image(x, y, "wrapperMother").setScale(propor);
  wrapperMother.setInteractive();
  all_buttons_arrows.push(wrapperMother); //
  let underRotateObject;
  if (image2 != undefined) {
    underRotateObject = this.add
      .image(x, y, image2)
      .setScale(scale * propor * 0.8, scale * propor * 0.8);
    underRotateObject.visible = false;
  }
  const rotateObject = this.add.image(x, y, image).setScale(scale * propor);
  let rotateObjectAnimation;
  let rotateObjectAnimation2;
  rotateObject.depth = 1;
  if (image !== "spacecraft") {
    objects_mirrors.push(underRotateObject);
    rotateObjectAnimation = this.add
      .image(x, y, "shipAnimation")
      .setScale(scale * propor)
      .setDepth(1)
      .setAlpha(0);
    rotateObjectAnimation2 = this.add
      .image(x, y, "shipAnimation2")
      .setScale(scale * propor)
      .setDepth(1)
      .setAlpha(0);
    objects_mirrors_animations.push(rotateObjectAnimation);
    objects_mirrors_animations2.push(rotateObjectAnimation2);
  }

  var buttons = [];

  for (var i = 0; i < 16; i++) {
    buttons[i] = this.add
      .sprite(x, y - 120, "hoverButton")
      .setScale(0.9 * propor);
    buttons[i].angle = -22.5 * i;
    buttons[i].depth = 2;
    all_buttons_arrows.push(buttons[i]); //

    buttons[i].setInteractive();

    buttons[i].on(
      "pointerdown",
      (function (idx) {
        return function (pointer) {
          if (image === "spacecraft") {
            kat_strzalu = idx * -22.5;
          } else {
            underRotateObject.angle = idx * -22.5;
            rotateObjectAnimation.angle = idx * -22.5;
            rotateObjectAnimation2.angle = idx * -22.5;
          }

          rotateObject.angle = idx * -22.5;
          if (idx == 15) {
          }
          hide_buttons(0);
        };
      })(i)
    );

    buttons[i].on(
      "pointerover",
      function (pointer) {
        // Tutaj możesz dodać logikę lub zmianę obrazka podczas najechania myszką
        this.setTexture("hoverButton1"); // 'this' wskazuje na bieżący przycisk obsługujący zdarzenie 'pointerover'
      },
      buttons[i]
    ); // Ustawienie kontekstu na obiekt 'buttons[i]'

    buttons[i].on(
      "pointerout",
      function (pointer) {
        // Tutaj możesz dodać logikę lub zmianę obrazka podczas najechania myszką
        this.setTexture("hoverButton"); // 'this' wskazuje na bieżący przycisk obsługujący zdarzenie 'pointerover'
      },
      buttons[i]
    ); // Ustawienie kontekstu na obiekt 'buttons[i]'
  }
  buttons[15].setPosition(x + 110 * propor, y + 45 * propor);
  buttons[14].setPosition(x + 85 * propor, y + 85 * propor);
  buttons[13].setPosition(x + 28, y + 110 * propor);
  buttons[12].setPosition(x, y + 120 * propor);
  buttons[11].setPosition(x - 28, y + 110 * propor);
  buttons[10].setPosition(x - 85 * propor, y + 85 * propor);
  buttons[9].setPosition(x - 110 * propor, y + 45 * propor);
  buttons[8].setPosition(x - 120 * propor, y);
  buttons[7].setPosition(x - 67, y - 45 * propor);
  buttons[6].setPosition(x - 85 * propor, y - 85 * propor);
  buttons[5].setPosition(x - 45 * propor, y - 110 * propor);
  buttons[4].setPosition(x, y - 120 * propor);
  buttons[3].setPosition(x + 28, y - 110 * propor);
  buttons[2].setPosition(x + 85 * propor, y - 85 * propor);
  buttons[1].setPosition(x + 110 * propor, y - 45 * propor);
  buttons[0].setPosition(x + 120 * propor, y);

  rotateObject.setInteractive(); // Ustawienie obiektu rotateObject jako interaktywnego

  rotateObject.on(
    "pointerover",
    function (pointer) {
      if (isHoverOverShips) {
        // Wywołanie funkcji someFunction() przy najechaniu na rotateObject
        hide_buttons(1);
        shipInfo.setAlpha(1);
        textShipInfo.setAlpha(1);
      }
    },
    this
  );

  const hide_buttons = (alpha) => {
    wrapperMother.setAlpha(alpha);
    const wrapperMotherGlide = this.tweens.add({
      targets: wrapperMother,
      scaleX: propor,
      scaleY: propor,
      duration: 1000, // Czas trwania animacji w milisekundach
    });
    wrapperMotherGlide.play();
    wrapperMother.scale = 0.8 * propor;
    for (var i = 0; i < 16; i++) {
      buttons[i].setAlpha(alpha);
    }
    shipInfo.setAlpha(alpha);
    textShipInfo.setAlpha(alpha);
  };

  hide_buttons(0);
}
function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function hide_buttons_glob() {
  for (var i = 0; i < all_buttons_arrows.length; i++) {
    all_buttons_arrows[i].setAlpha(0);
  }
}

function show_starr(pointX, pointY) {
  let mySprite = this.add.sprite(pointX, pointY, "starr2_00");
  //console.log(this);

  this.anims.create({
    key: "snooze",
    frames: [
      { key: "starr2_00" },
      { key: "starr2_01" },
      { key: "starr2_02", duration: 1, alpha: 0 },
    ],
    frameRate: 5,
    once: true,
  });

  mySprite.anims.play("snooze");

  mySprite.on(
    "animationcomplete",
    function () {
      mySprite.destroy();
    },
    this
  );
}

function show_komet(pointX, pointY) {
  let mySprite = this.add.sprite(pointX, pointY, "comet").setScale(0.5);

  this.anims.create({
    key: "snooze2",
    frames: [{ key: "comet" }, { key: "comet2" }],
    frameRate: 5,
    repeat: -1,
  });

  mySprite.anims.play("snooze2");

  // mySprite.on(
  //   "animationcomplete",
  //   function () {
  //     mySprite.destroy();
  //   },
  //   this
  // );
}

var objects_mirrors = [];
var objects_mirrors_animations = [];
var objects_mirrors_animations2 = [];
var kat_strzalu = 0;
let comet;
let comet2;
let comet3;
let effect;
let myInterval;
let isHoverOverShips = true;
let energyImages = [];

let lemming;

var all_buttons_arrows = [];
let Points_colision = [];

export default SplashScene;
