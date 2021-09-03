
//calls Kaboom functions
kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
});

const MOVE_SPEED = 120;
const JUMP_FORCE = 360;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const BIG_JUMP_FORCE = 450;
const ENEMY_SPEED = 30;
const MOUSE_SPEED = 75;
let isJumping = true;
const FALL_DEATH = 500;

loadSound("woosh", "https://af-marquez.github.io/resources/Whoosh2.mp3");
loadSound("pop", "https://af-marquez.github.io/resources/Pop.mp3");
loadSound("s-lost", "https://af-marquez.github.io/resources/lost.mp3");
loadSound("s-coin", "https://af-marquez.github.io/resources/coin.mp3");
loadSound("s-miau", "https://af-marquez.github.io/resources/meow.mp3");
loadSound("musica1", "https://af-marquez.github.io/resources/musica1.mp3");
loadSound("musica2", "https://af-marquez.github.io/resources/musica2.mp3");
loadSound("powerup", "https://af-marquez.github.io/resources/power-up.mp3");

loadRoot('https://i.imgur.com/');
loadSprite("bg-night", "uT9IkEQ.png")
loadSprite("coin", "3DvwyYT.png");
loadSprite("enemy1", "kK7i2Z8.png");
loadSprite('block', 'Tkvjtpx.png');
loadSprite("box", "x1myG3d.png");
loadSprite("mouse", "KOH8f7G.png");
loadSprite("surprise", "dqXMERa.png");
loadSprite("next", "uwXvDcC.png");
loadSprite("cat", "4Ochi6c.png", {
    sliceX: 6,
    sliceY: 5,
    animSpeed: 0.8,
    gridWidth: 130,
    gridHeight: 100,
    anims: {
        cat_stand: {
            from: 0,
            to: 5,
        },
        cat_right: {
            from: 6,
            to: 11,
        },
        cat_left: {
            from: 12,
            to: 17,
        },
        cat_jump_right: {
            from: 18,
            to: 21,
        },
        cat_jump_left: {
            from: 24,
            to: 27,
        },
    },
});
//code for menu
scene("menu", () => {
    add([
      text("Maui Game"),
      pos(width() / 2.5, 80),
      scale(3)
    ]);
    add([
        sprite("cat"),
        pos(width() / 20,100),
        scale(10)
    ]);
    add([
        rect(160, 20),
        pos(width() / 2.5, 180),
        "button",
        {
            clickAction: () => go('game',{ level: 0, score: 0 }),
        },
      ]);
      add([
        text("Play game"),
        pos(width() / 2.5+50, 185),
        color(0, 0, 0)
      ]);
      //instructions how to play
      add([
        rect(160, 20),
        pos(width() / 2.5, 210),
        "button",
        {
            clickAction: () => go('instructions'),
        },
      ]);
      add([
        text("Instructions"),
        pos(width() / 2.5+30, 215),
        color(0, 0, 0)
      ]);
      
      add([
        rect(160, 20),
        pos(width() / 2.5, 240),
        "button",
        {
			clickAction: () => window.open('https://af-marquez.github.io/index.html', '_blank'),
		},
      ]);
      add([
        text("Go to my website!"),
        pos(width() / 2.5+15, 245),
        color(0, 0, 0)
      ]);
      action("button", b => {
        if (b.isHovered())
          b.use(color(0.7, 0.7, 0.7));
        else
          b.use(color(1, 1, 1));
        if (b.isClicked())
            b.clickAction();
      });
  });

//code for game
scene("game", ({ level, score }) => {
    layers(["bg", "obj", "ui"], "obj");

    add([sprite("bg-night"), scale(4), layer("bg")]);


    const maps = [
        [
            '',
            '',
            '',
            '',
            '',
            '                    -                                                                  ',
            '                    -                    %                                              ',
            '                    -   -                                                               ',
            '                    -   -    €                                                           ',
            '                    -   -    €      -     -                                               ',
            '                    -   -    €                                                - - --         ',
            '                    -   -    €                 -                                   - n      ',
            '                    -   -    €                                                     -      ',
            '                    -   -    €             -                              -        ------        ',
            '                    -   -    €                                                           ',
            '                    -   -             -            -                                      ',
            '                    -   -                                              -                 ',
            '                    -             -                                                     ',
            '                    e           1       e                 e                     1         1    e',
            '                    =====================                 ======================================',
        ],
        [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '                    -      ---  n                                                      ',
            '                    -        -                                                         ',
            '                    -        --------    --  -    --   -    ----  -----    -     -     ',
            '                    -                                                                  ',
            '                    -                                                                  ',
            '                    -   %     *-x--€                  €€€                      -       ',
            '                    -                                                      -           ',
            '                    -                                                                  ',
            '                    e                   1    e         11       e  e                   e',
            '                    ======================   ====================  =====================',
        ],
        [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '                    -                                                              ',
            '                    -                                                            n  ',
            '                    -                                                               ',
            '                    -                                               --   --     --  ',
            '                    -                                                               ',
            '                    -                                         --                    ',
            '                    -             --                                               ',
            '                    -                                    --                        ',
            '                    e             1   1e    e           1   1   1   1            1e',
            '                    ====================    =======================================',
        ],
        [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '                                                                                  ',
            '                                                                                n  ',
            '                                                                                   ',
            '                                         ---                          --   ------- ',
            '                                                                                   ',
            '                                   ---                          --                 ',
            '                     --       --                ee       1ee                       ',
            '                                                ------------                       ',
            '                        --                                                         ',
            '                                                                                   ',
        ],
        [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '                    -     €                                                          ',
            '                    -     €                                                          ',
            '                    -     €                                                         ',
            '                    -     €  -  -                                                     ',
            '                    -     €                                                         ',
            '                    -     €                                                             ',
            '                    -              -    -                                                      ',
            '                    -              -    -           €€€€€€€                                         n  ',
            '                    -           -  e  1 e  -     e       1e    e     1 e  e       1e  e    1   1 1     e',
            '                    ==========  ============     ==========    =========  ==========  ==================',
        ],
        [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '                     -            %                                                      ',
            '                     -                                                                  ',
            '                     -                                     €                   -   €        ',
            '                     -   €€€  €€€                                             -    €            ',
            '                     -                          €€€     -      -             -     €        ',
            '                     -      -    ---                                        -      €       ',
            '                     ---    -    ---             -                  €      -       n        ',
            '                     -                                              -     -               ',
            '                                           -                                       =         ',
        ],
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '€': [sprite("coin"), "coin"],
        '-': [sprite('box'), solid()],
        'm': [sprite('mouse'), solid(), body(), "mouse"],
        '*': [sprite("surprise"), solid(), "coin-surprise"],
        '%': [sprite("surprise"), solid(), "mouse-surprise"],
        'x': [sprite("surprise"), solid(), "bad-surprise"],
        '1': [sprite("enemy1"), solid(), body(), "dangerous", {dir: -1}],
        'n': [sprite('next'), "next"],
        'e': [sprite('box'),"edge", solid()],
    };

    const gameLevel = addLevel(maps[level], levelCfg);

    add([
        text("Score:"),
        pos(25, 6),
    ]);

    const scoreLabel = add([
        text(score),
        pos(90, 6),
        layer('ui'),
        {
            value: score,
        }
    ]);

    add([text("level " + parseInt(level + 1)), pos(25, 20)]);

    function big() {
        let timer = 0;
        let isBig = false;
        return {
            update() {
                if (isBig) {
                    timer -= dt();
                    if (timer <= 0) {
                        this.smallify();
                    }

                }

            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1);
                CURRENT_JUMP_FORCE = JUMP_FORCE;
                timer = 0;
                isBig = false;
            },
            biggify(time) {
                this.scale = vec2(2);
                CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
                timer = time;
                isBig = true;
            }
        }
    }

    const player = add([
        solid(),
        sprite("cat"),
        pos(460, 200),
        body(),
        big(),
        origin("bot"),
        scale(1),
        {dir: 1}
        // health(8),
    ]);

    action("mouse", (m) => {
        m.move(MOUSE_SPEED, 0)
    });

    player.on("headbump", (obj) => {
        if (obj.is("coin-surprise")) {
            gameLevel.spawn("€", obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn("-", obj.gridPos.sub(0, 0))
        }
        if (obj.is("mouse-surprise")) {
            gameLevel.spawn("m", obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn("-", obj.gridPos.sub(0, 0))
        }
        if (obj.is("bad-surprise")) {
            gameLevel.spawn("1", obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn("-", obj.gridPos.sub(0, 0))
        }
    });

    player.collides("mouse", (m) => {
        destroy(m)
        player.biggify(6)
        play("powerup");
    });

    player.collides("coin", (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
        play("s-coin");
    });

    action("dangerous", (d) => {
        d.move(d.dir * ENEMY_SPEED, 0)
    });

    collides("dangerous", "edge", (d) => {
        d.dir = - d.dir
    });
    collides("dangerous", "dangerous", (d) => {
        d.dir = - d.dir
    });

    player.collides("dangerous", (d) => {
        if (isJumping) {
            play("pop")
            scoreLabel.value++
            scoreLabel.text = scoreLabel.value
            destroy(d)
            player.jump(CURRENT_JUMP_FORCE)
        }
        else if (!(player.grounded()) && (!(isJumping))){
            destroy(d)
            player.jump(CURRENT_JUMP_FORCE)
        } else {
            go("lose", { score: scoreLabel.value })
        }
    });

    player.action(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            go("lose", { score: scoreLabel.value })
            play("s-lost");
        }
    });

    player.collides("next", () => {
        camScale(3);
        play("s-miau");
        wait(2, () => {
            go("game", {
                level: (level + 1),
                score: scoreLabel.value,
            })
        })
    })

    keyDown("left", () => {
        player.move(-MOVE_SPEED, 0)
        keyPress("space", () => {       
            player.play("cat_jump_left");
        });
    });

    keyPress("left", () => {
        if (player.grounded()) {
            player.play("cat_left");
        }
    });

    keyRelease("left", () => {
        player.play("cat_stand");
    })

    keyDown("right", () => {
        player.move(MOVE_SPEED, 0)
        keyPress("space", () => {
            player.play("cat_jump_right");
        });
    });

    keyPress("right", () => {
        if (player.grounded()) {
            player.move(MOVE_SPEED, 0)
            player.play("cat_right");
        }
    });

    keyRelease("right", () => {
        player.play("cat_stand");
    })


    player.action(() => {
        if (player.grounded()) {
            isJumping = false;
        }
    })

    keyDown("space", () => {
        if (player.grounded()) {
            isJumping = true
            player.jump(CURRENT_JUMP_FORCE)
            play("woosh")
        }
    });

    keyRelease("space", () => {
        player.play("cat_stand");
    })

});

//Code for losing scene ________________________________________
scene("lose", ({ score }) => {
    add([text("GAME OVER\n\nScore: " + score, 32),
    origin("center"),
    pos(width() / 2, height() / 2)]),

    
    add([
        rect(160, 20),
        pos(width() / 2.5,400),
        "button",
        {
            clickAction: () => go('menu'),
        },
      ]);

    add([
        text("Go back!"),
        pos(width() / 2.5+50, 405),
        color(0, 0, 0)
    ]);

    action("button", b => {
        if (b.isHovered())
          b.use(color(0.7, 0.7, 0.7));
        else
          b.use(color(1, 1, 1));
        if (b.isClicked())
            b.clickAction();
    });
});

//Code for instructions ________________________________________
scene("instructions", () => {
    add([
        text("Instructions:",25),
        color(1,0,1),
        pos(width()/6, 80),
        ]);
    add([
        text("Move right -- right arrow\nMove left  -- left arrow\n   Jump    --  [space]\n   Pause   --   [ESC]",15),
        pos(width()/6, 120)
    ]);
    add([
        sprite("next"),
        pos(width() / 3.5, 180),
    ]);
    add([
        text("           -- end of level",15),
        pos(width() / 6, 190),
    ]);
    add([
        rect(160, 20),
        pos(width() / 2.5, 240),
        "button",
        {
            clickAction: () => go('menu'),
        },
      ]);
    add([
        text("Go back!"),
        pos(width() / 2.5+50, 245),
        color(0, 0, 0)
    ]);
    action("button", b => {
        if (b.isHovered())
          b.use(color(0.7, 0.7, 0.7));
        else
          b.use(color(1, 1, 1));
        if (b.isClicked())
            b.clickAction();
    });
});

start("menu");