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
const S_ENEMY_SPEED = 40;
const MOUSE_SPEED = 75;
let isJumping = true;
const FALL_DEATH = 500;

let current_score = 0;

loadSound("music","https://af-marquez.github.io/resources/Scott%20Holmes%20Music%20-%20Upbeat%20Funk%20Pop.mp3")
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
loadSprite("small_enemy", "kK7i2Z8.png");
loadSprite('block', 'Tkvjtpx.png');
loadSprite("box", "x1myG3d.png");
loadSprite("mouse", "KOH8f7G.png");
loadSprite("surprise", "dqXMERa.png");
loadSprite("next", "uwXvDcC.png");
loadSprite("invisible","9QrGT12.png");
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

//splash screen___________________________________________
scene("splash",() =>{
    add([
        text("Welcome \n\n  to\n\n",height()/40),
        pos(width() / 3, 200),
        color(rgba(1, 0.5, 0, 1)),
        scale(3)
    ]);
    wait(4, () => {
        go("menu")
    });

});

//code for menu_________________________________________________
scene("menu", () => {
    add([sprite("bg-night"),
    scale(3)]);
    add([
        text("Maui Game"),
        pos(width() / 2.5, 80),
        color(rgba(1, 0.5, 0, 1)),
        scale(3)
    ]);
    add([
        sprite("cat"),
        pos(width() / 20, 100),
        scale(10)
    ]);
    add([
        rect(160, 20),
        pos(width() / 2.5, 180),
        "button",
        {
            clickAction: () => go('game', { level: 0, score: 0 }),
        },
    ]);
    add([
        text("Play game"),
        pos(width() / 2.5 + 50, 185),
        color(1, 1, 1)
    ]);
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
        pos(width() / 2.5 + 30, 215),
        color(1, 1, 1)
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
        pos(width() / 2.5 + 15, 245),
        color(1, 1, 1)
    ]);
    action("button", b => {
        if (b.isHovered())
            b.use(color(1, 0.3, 0, 1));
        else
            b.use(color(1, 0.5, 0, 1));
        if (b.isClicked())
            b.clickAction();
    });
});

//code for game_______________________________________________________________
scene("game", ({ level, score }) => {


        layers(["bg", "obj", "ui"], "obj");
        camIgnore([ "ui"]);
        add([sprite("bg-night"), scale(4), layer("bg")]);

        const maps = [
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
                '                    .                                                                ',
                '                    .                                                                ',
                '                    .                                                              ---  ',
                '                    .                                                        -        ',
                '                    .             -x-         **                            --          ',
                '                    .                                                      ---         ',
                '                    .                                                     ----         ',
                '                    .                   1         1                   1  e---e    1      n',
                '                    e         e=======================e   e===========================e    ',
                '                    ==========                                                         ====',
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
                '                    .                                                              ',
                '                    .                                                              ',
                '                    .                                                               ',
                '                    .                                              --   --       ',
                '                    .                                                               ',
                '                    .             *          *%-              -                    ',
                '                    .                                        --                       ',
                '                    .                                       ---                 n    ',
                '                    e             1                 1   1  e---e 1   1  1e          ',
                '                    ======================================================      -     ',
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
                '                    .                                                              ',
                '                    .                                                            n  ',
                '                    .                                                               ',
                '                    .                                               --   --     --  ',
                '                    .                                                               ',
                '                    .                                         --                    ',
                '                    .             --                                               ',
                '                    .                                    --                        ',
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
                '                    .        -',
                '                    .        -',
                '                    .        -  n                                                      ',
                '                    .        -                                                         ',
                '                    .        --------    --  -    --   -    ----  -----    -           ',
                '                    .                                                                  ',
                '                    .                                                                  ',
                '                    .   %     *-x--€                  €€€                      -       ',
                '                    .                                                               -  ',
                '                    .                                                                  ',
                '                    e                   1    e         11       e  e              1    e',
                '                    ======================   ====================  =====================',
            ],
            [
                '',
                '',
                '',
                '',
                '',
                '                    .                                                                          ',
                '                    .                    %                                                     ',
                '                    .   .                                                                      ',
                '                    .   .   €€                                                                 ',
                '                    .   .   €€      -     -                                     1     1           ',
                '                    .       €€                                                e----------e        ',
                '                    .       €€                 -                              -        n - -         ',
                '                    .       €€                                                -          -        ',
                '                    .       €€             -                                       -------      -       ',
                '                    .       €€                                                    --                  ',
                '                    .                 -            -                         --                        ',
                '                    .                                                                       -            ',
                '                    .             -                                                                      ',
                '                    .           1       e                 e     1                1         1  1 1       e         ',
                '                    =====================                 ====================e   e=========================',
            ], 
            [
                '',
                '',
                '',
                '',
                '                               *',
                '                   .                                       ',
                '                   .    €               1                                   1       ',
                '                   .    -     ---     e---e    -    €                    1 e--e        ',
                '                   .                                -                 1 e---         ',
                '                   .      €                              -  1     1 e----            ',
                '                   .      -                              e----------                 ',
                '                   .                                                                 ',
                '                   .    €                                                          --  ',
                '                   .    -                                                                €€',
                '                   .                                                                     --',
                '                   .      €                                                          ',
                '                   .      -                                    n                     ',
                '                   .                                                                 ',
                '                   .                                           -        €           € ',
                '                    =======     -     -     -     -     -         -     -     -     - ',
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
        ]

        const levelCfg = {
            width: 20,
            height: 20,
            '=': [sprite('block'), solid()],
            '€': [sprite("coin"), "coin"],
            '-': [sprite('box'), solid()],
            '.': [ sprite('invisible'),solid()],
            'm': [sprite('mouse'), solid(), body(), "mouse", { dir: 1 }],
            '*': [sprite("surprise"), solid(), "coin-surprise"],
            '%': [sprite("surprise"), solid(), "mouse-surprise"],
            'x': [sprite("surprise"), solid(), "bad-surprise"],
            '1': [sprite("small_enemy"), solid(),body({maxVel: 100}),"dangerous", { dir: -1 }],
            'n': [sprite('next'), "next"],
            'e': [sprite('box'), "edge", solid()],
        };

        const gameLevel = addLevel(maps[level], levelCfg);

        add([
            text("Score:"),
            pos(25, 6),
            layer('ui'),
        ]);

        const scoreLabel = add([
            text(score),
            pos(80, 6),
            layer('ui'),
            {
                value: score,
            }
        ]);

        add([
            text("level " + parseInt(level + 1)),
            pos(25, 20),
            layer('ui')
        ]);

        let isBig = false;
        function big() {
            let timer = 0;
            
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
            "player",
            origin("bot"),
            scale(1),
            { dir: 1 }
        ]);

        action("mouse", (m) => {
            m.move(m.dir * MOUSE_SPEED, 0)
        });

        every("dangerous", (d) => d.use(body()));

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
                const danger = gameLevel.spawn("1", obj.gridPos.sub(0, 1))
                danger.use(body());
                destroy(obj)
                gameLevel.spawn("-", obj.gridPos.sub(0, 0))
            }
            if (obj.is("dangerous")) {
                if (isBig){
                    destroy(obj)
                    player.smallify()
                    play("s-lost");
                }
                else{
                    go("lose", { level: level, score: scoreLabel.value })
                }           
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
            d.move(d.dir * S_ENEMY_SPEED, 0)
        });
        player.on("grounded", (obj) => {
            if (obj.is("dangerous")) {
                play("pop")
                scoreLabel.value++
                scoreLabel.text = scoreLabel.value
                destroy(obj)
                player.jump(CURRENT_JUMP_FORCE - 50)
            }
        });
//fix this so it doesnt jump levels
        player.collides("next", () => {
            level++;
            camScale(3);
            play("s-miau");
            wait(2, () => {
                go("game", {
                    level: level,
                    score: scoreLabel.value,
                })
            })
        })

        collides("dangerous", "edge", (d) => {
            d.dir = - d.dir
        });
        collides("dangerous", "dangerous", (d) => {
            d.dir = - d.dir
        });
        collides("mouse", "dangerous", (d,m) => {
            d.dir = - d.dir
            m.dir = - m.dir
        });
        collides("mouse", "edge", (m) => {
            m.dir = - m.dir
        });

        player.collides("dangerous", (d) => {
            if (isBig){
                destroy(d)
                player.smallify()
                play("s-lost");
            }
            else{
                go("lose", { level: level, score: scoreLabel.value })
            }
        });

        player.action(() => {
            camPos(player.pos)
            if (player.pos.y >= FALL_DEATH) {
                player.smallify();
                go("lose", { level: level, score: scoreLabel.value })
            }
        });


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

        keyDown("right", () => {
            player.move(MOVE_SPEED, 0)
            keyPress("space", () => {
                player.play("cat_jump_right");
            });
        });

        keyPress("right", () => {
            if (player.grounded()) {
                player.play("cat_right");
            }
        });

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

        keyRelease(["space","right","left"], () => {
            player.play("cat_stand");
        })
});

//Code for losing scene ________________________________________
scene("lose", ({ level, score }) => {
    play("s-lost"),
    add([text("GAME OVER\n\nScore: " + score, 32),
    origin("center"),
    pos(width() / 2, height() / 2)]),

    add([
        rect(160, 20),
        pos(width() / 2.5, 375),
        "button",
        {
            clickAction: () => go('game', { level: level, score: 0 }),
        },
    ]);

    add([
        text("Retry!"),
        pos(width() / 2.5 + 50, 380),
        color(1, 1, 1)
    ]);

    add([
        rect(160, 20),
        pos(width() / 2.5, 400),
        "button",
        {
            clickAction: () => go('menu'),
        },
    ]);

    add([
        text("Go back!"),
        pos(width() / 2.5 + 50, 405),
        color(1, 1, 1)
    ]);

    action("button", b => {
        if (b.isHovered())
            b.use(color(1, 0.3, 0, 1));
        else
            b.use(color(1, 0.5, 0, 1));
        if (b.isClicked())
            b.clickAction();
    });
});

//Code for instructions ________________________________________
scene("instructions", () => {
    add([
        text("Instructions:", 25),
        color(rgba(1, 1, 0, 1)),
        pos(width() / 6, 80),
    ]);
    add([
        text("Move right -- right arrow\nMove left  -- left arrow\n   Jump    --  [space]\n   Pause   --   [ESC]", 15),
        pos(width() / 6, 120)
    ]);
    add([
        sprite("next"),
        pos(width() / 3.5, 180),
    ]);
    add([
        text("           -- end of level", 15),
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
        pos(width() / 2.5 + 50, 245),
        color(1, 1, 1)
    ]);
    action("button", b => {
        if (b.isHovered())
            b.use(color(1, 0.3, 0, 1));
        else
            b.use(color(1, 0.5, 0, 1));
        if (b.isClicked())
            b.clickAction();
    });
});

start("splash");
