console.warn = function () { };

if (/Mobi/.test(navigator.userAgent) && location.pathname != "/touch.html" && location.search.substr(1) != "desktop") {
    location.replace("/touch.html");

}
var camera, scene, renderer, container, eingabe, canvasDown, currentCanvasRow, currentCanvasCol, ctx, c, difficulty, score, fruit, beginningBlockNumber, gameLost, direction, doUpdatem, geometry, material, material2, materialsnake, materialsnakehead, geometrysnake, texturesnake, texturesnakehead, edges, edges2, edges3, edges4, mesh, meshes, geometry2, material2, mesh2, geometry3, material3, mesh3, geometry4, material4, mesh4, texture, helper, controls, OrbitControls, dirt, camerasettings, camerasettings2;
var cameramode = "3RD.PERSON";
$(document).ready(function () {
    $('.modal').modal();

    meshes = [];
    doUpdate = true;
    direction = "u";
    gameLost = -1;
    beginningBlockNumber = 3;
    fruit = [];
    score = 0;
    perspectiveView=cameramode;
    difficulty = "MEDIUM";
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    currentCanvasCol = 10;
    currentCanvasRow = 190;
    canvasDown = true;
    eingabe = true;


    container = document.getElementById("Spiel");

    init();
    animate();

});



function init() {

    document.addEventListener("keydown", onDocumentKeyDown, false);

    camera = new THREE.TargetCamera(70, 1, 0.01, 10);
    scene = new THREE.Scene();

    texture = new THREE.TextureLoader().load('sky.jpg');
    materialSB = new THREE.MeshBasicMaterial({ map: texture });

    sky = new THREE.BoxGeometry(0.1, 18, 18);
    skybox = new THREE.Mesh(sky, materialSB);
    skybox.position.x = -6;
    skybox.position.z = 0.1;

    sky2 = new THREE.BoxGeometry(0.1, 18, 18);
    skybox2 = new THREE.Mesh(sky2, materialSB);
    skybox2.position.x = 6;
    skybox2.position.z = 0.1;

    sky3 = new THREE.BoxGeometry(18, 0.1, 18);
    skybox3 = new THREE.Mesh(sky3, materialSB);
    skybox3.position.y = -6;
    skybox3.position.z = 0.1;

    sky4 = new THREE.BoxGeometry(18, 0.1, 18);
    skybox4 = new THREE.Mesh(sky4, materialSB);
    skybox4.position.y = 6;
    skybox4.position.z = 0.1;

    sky5 = new THREE.BoxGeometry(18, 18, 0.1);
    skybox5 = new THREE.Mesh(sky5, materialSB);
    skybox5.position.y = 0;
    skybox5.position.z = -6;

    // Dirt
    var loader = new THREE.TextureLoader();
    loader.load('dirt.jpg',
        function (texture) {
            var geometry = new THREE.SphereGeometry(4, 40, 40);
            var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
            dirt = new THREE.Mesh(geometry, material);
            dirt.position.z = -4.5;
            scene.add(dirt);
            dirt.rotation.x += -0.00045;
            dirt.rotation.y += 0.0009;
        });

    scene.add(skybox);
    scene.add(skybox2);
    scene.add(skybox3);
    scene.add(skybox4);
    scene.add(skybox5);



    material = new THREE.MeshBasicMaterial({ color: 0xff9000 });
    material2 = new THREE.MeshBasicMaterial({ color: 0xff6100 });


    var fenceTexture = new THREE.TextureLoader().load('fence.png');
    var fenceMaterial = new THREE.MeshBasicMaterial({ map: fenceTexture, transparent: true});

    var fenceTexture2 = new THREE.TextureLoader().load('fence2.png');
    var fenceMaterial2 = new THREE.MeshBasicMaterial({ map: fenceTexture2, transparent: true});

    var fenceTexture3 = new THREE.TextureLoader().load('fence3.png');
    var fenceMaterial3 = new THREE.MeshBasicMaterial({ map: fenceTexture3, transparent: true});

    var fenceTexture4 = new THREE.TextureLoader().load('fence4.png');
    var fenceMaterial4 = new THREE.MeshBasicMaterial({ map: fenceTexture4, transparent: true});


    //            material = new THREE.MeshBasicMaterial({color : 0xcccccc, wireframe : true});
    geometry = new THREE.BoxGeometry(3.51, 0.1, 0.28);
    mesh = new THREE.Mesh(geometry, fenceMaterial); // front side fence
    mesh.position.y = 1.755;
    mesh.position.x = 0.05;

    geometry2 = new THREE.BoxGeometry(3.51, 0.1, 0.28); //backside fence
    mesh2 = new THREE.Mesh(geometry2, fenceMaterial2);
    mesh2.position.y = -1.655;
    mesh2.position.x = 0.05;

    geometry3 = new THREE.BoxGeometry(0.1, 3.51, 0.28); //right side fence
    mesh3 = new THREE.Mesh(geometry3, fenceMaterial3);
    mesh3.position.x = 1.755;
    mesh3.position.y = 0.05;

    geometry4 = new THREE.BoxGeometry(0.1, 3.51, 0.28); //left side fence
    mesh4 = new THREE.Mesh(geometry4, fenceMaterial4);
    mesh4.position.x = -1.655;
    mesh4.position.y = 0.05;

    edges = new THREE.EdgesHelper(mesh, 0x000000);
    edges.material.linewidth = 1;
    edges.position.x = 0.05;
    edges.position.y = 1.755;

    edges2 = new THREE.EdgesHelper(mesh2, 0x000000);
    edges2.material.linewidth = 1;
    edges2.position.x = 0.05;
    edges2.position.y = -1.655;

    edges3 = new THREE.EdgesHelper(mesh3, 0x000000);
    edges3.material.linewidth = 1;
    edges3.position.x = 1.755;
    edges3.position.y = 0.05;

    edges4 = new THREE.EdgesHelper(mesh4, 0x000000);
    edges4.material.linewidth = 1;
    edges4.position.x = -1.655;
    edges4.position.y = 0.05;

    scene.add(mesh);
    scene.add(mesh2);
    scene.add(mesh3);
    scene.add(mesh4);
    scene.add(edges);
    scene.add(edges2);
    scene.add(edges3);
    scene.add(edges4);

    geometrysnake = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    texturesnake = new THREE.TextureLoader().load('body.png');
    texturesnakehead = new THREE.TextureLoader().load('head.png');
    materialsnake = new THREE.MeshBasicMaterial({ map: texturesnake });
    materialsnakehead = new THREE.MeshBasicMaterial({ map: texturesnakehead, transparent: true });


    // the part that shows the length of the earthworm in the game
    for (var i = 0; i < beginningBlockNumber; i++) {
        if (i == 0) {
            meshes[i] = new THREE.Mesh(geometrysnake, materialsnakehead);
        }else {
            meshes[i] = new THREE.Mesh(geometrysnake, materialsnake);
        }
        scene.add(meshes[i]);
        meshes[i].position.x = -i * 0.11;

    }

    camerasettings = {
        name: 'myTarget',
        targetObject: meshes[0],
        cameraRotation: new THREE.Euler(-Math.PI / 4 + 0.1, 0, 0),
        cameraPosition: new THREE.Vector3(0, 0, 0.45),
        fixed: false,
        stiffness: 0.08,
        matchRotation: true,
    }

    camerasettings2 = {
        name: 'myTarget2',
        targetObject: meshes[0],
        cameraRotation: new THREE.Euler(0, 0, 0),
        cameraPosition: new THREE.Vector3(0, 0, 0),
        fixed: false,
        stiffness: 0.1,
        matchRotation: true,
    }

    setView(cameramode)
    // camera.addTarget(camerasettings);
    // camera.setTarget('myTarget');
    meshes[0].rotation.x = Math.PI / 2;

    helper = new THREE.GridHelper(3.31, 30, 0x444444, 0x888888);
    helper.position.x = 0.05;
    helper.position.y = 0.05;
    helper.position.z = -0.055;
    helper.material.opacity = 100;
    helper.material.transparent = true;
    helper.rotation.x = Math.PI / 2;
    helper.rotation.y = 0;
    scene.add(helper);


    genFruits();


    renderer = new THREE.WebGLRenderer({ antialias: true });
    let size = Math.min(container.offsetHeight, container.offsetWidth);
    renderer.setSize(size, size);
    container.appendChild(renderer.domElement);

    renderer.render(scene, camera);
    canvasInit();


}

function canvasInit() {

    c.width = Math.max(screen.width, screen.height);
    c.height = Math.min(screen.width, screen.height) - 40;

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = "#73B671";
    ctx.fillRect(10, 70, 50, 50);
    ctx.fillRect(10, 130, 50, 50);
}

function canvasRefresh() {
    ctx.fillStyle = "#73B671";
    if (currentCanvasRow + 50 > c.height) {
        currentCanvasRow -= 60;
        currentCanvasCol += 60;
        canvasDown = !canvasDown;
    } else if (currentCanvasRow < 10) {
        //alert("ende");
        currentCanvasCol += 60;
        canvasDown = !canvasDown;
        currentCanvasRow += 60;
    }
    if (currentCanvasCol < Math.max(screen.width, screen.height) / 3) {
        ctx.fillRect(currentCanvasCol, currentCanvasRow, 50, 50);
        if (canvasDown) {
            currentCanvasRow += 60;
        } else {
            currentCanvasRow -= 60;
        }
    }


}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function goFullScreen() {
    enterFullscreen(document.getElementById("Spiel"));
    setTimeout(function () {
        document.getElementById("div_guiLeft").style.display = "block";
        document.getElementById("div_guiRigth").style.display = "block";
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    }, 1000);
}

function leaveFullscreen() {
    exitFullscreen();
    setTimeout(function () {
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        let size = Math.min(container.offsetHeight, container.offsetWidth);
        renderer.setSize(size, size);
    }, 1000);
}



function startGameLoop() {

    if (/Mobi/.test(navigator.userAgent) && innerWidth < innerHeight) {
        $('#modal4').modal('open');
    } else {

        $('#modal5').modal('close');
        direction = "u";
        meshes[0].rotation.y = 0;

        if (difficulty == "EASY") {
            diff = 350;
        } else if (difficulty == "MEDIUM") {
            diff = 200;
        } else if (difficulty == "HARD") {
            diff = 90;
        } else {
            diff = 200;
        }


        setInterval(function () {
            doUpdate = true;
        }, diff);
        goFullScreen();
    }
}

function setDifficulty(diff) {
    difficulty = diff;
    var lbl_gui = document.getElementById("lbl_gui");
    lbl_gui.innerHTML = lbl_gui.innerHTML = "SCORE: " + score + "<br>DIFFICULTY: " + difficulty+ "<br>VIEW: " + perspectiveView;

}

function setView(mode) {
    cameramode = mode;
    perspectiveView = cameramode;
    if (cameramode === "1ST.PERSON") {
        camera.addTarget(camerasettings2);
        camera.setTarget('myTarget2');
        scene.remove(meshes[0]);
    } else {
        camera.addTarget(camerasettings);
        camera.setTarget('myTarget');
        scene.add(meshes[0]);
    }
    var lbl_gui = document.getElementById("lbl_gui");
    lbl_gui.innerHTML = lbl_gui.innerHTML = "SCORE: " + score + "<br>DIFFICULTY: " + difficulty+ "<br>VIEW: " + perspectiveView;
}

// where apples occur randomly
function genFruits() {
    for (var z = fruit.length; z < 5; z++) {
        geometryfruit = new THREE.SphereGeometry(0.05, 32, 32);

        const texture = new THREE.TextureLoader().load('orange.jpg');

        materialfruit = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0,
        });

        fruit[z] = new THREE.Mesh(geometryfruit, materialfruit);

        fruit[z].position.x = THREE.Math.randInt(1, 30) * 0.11 - 1.6505;
        fruit[z].position.y = THREE.Math.randInt(1, 30) * 0.11 - 1.6505;

        scene.add(fruit[z]);
    }
}

// the part that makes your body turn as well when head turns
function takeBodyParts() {
    for (var i = meshes.length - 1; i > 0; i--) {
        meshes[i].position.x = meshes[i - 1].position.x;
        meshes[i].position.y = meshes[i - 1].position.y;
        meshes[i].rotation.x = meshes[i - 1].rotation.x;
        meshes[i].rotation.y = meshes[i - 1].rotation.y;

    }
}


function right() {

    //console.log("GO RIGHT");
    takeBodyParts();
    meshes[0].position.x += 0.11;
}

function left() {
    //console.log("GO LEFT");

    takeBodyParts();

    meshes[0].position.x -= 0.11;
}

function up() {
    //console.log("GO UP");

    takeBodyParts();

    meshes[0].position.y += 0.11;
}

function down() {
    //console.log("GO DOWN");

    takeBodyParts();
    meshes[0].position.y -= 0.11;
}

// the part where the earthworm's body length is added
function addOneBlock() {

    incrementScore();
    meshes[meshes.length] = new THREE.Mesh(geometrysnake, materialsnake);
    scene.add(meshes[meshes.length - 1]);
    meshes[meshes.length - 1].position.x = meshes[meshes.length - 2].position.x;
    meshes[meshes.length - 1].position.y = meshes[meshes.length - 2].position.y;


}

// add Score
function incrementScore() {
    score += 100;
    canvasRefresh();
    var lbl_fsGUI = document.getElementById("lbl_fsGUI");
    lbl_fsGUI.innerHTML = "<b>SCORE:<br>" + score + "<br>LENGTH:<br>" + (score / 100 + 3) + "</b>";
}

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (eingabe === false) {
        if (keyCode == 37 | keyCode == 65) { //LEFT a=65, Arrow Left = 37
            meshes[0].rotation.y += Math.PI / 2;
            if (direction == "u") {
                direction = "l";
            } else if (direction == "d") {
                direction = "r";
            } else if (direction == "l") {
                direction = "d";
            } else if (direction == "r") {
                direction = "u";
            }
            eingabe = true;

        } else if (keyCode == 39| keyCode == 68) { //RIGHT d = 68, Arrow Right = 39
            meshes[0].rotation.y -= Math.PI / 2;
            if (direction == "u") {
                direction = "r";
            } else if (direction == "d") {
                direction = "l";
            } else if (direction == "l") {
                direction = "u";
            } else if (direction == "r") {
                direction = "d";
            }
            eingabe = true;

        } else if (keyCode == 32) {

            startGameLoop();
        }
    }
}

function animate() {

    requestAnimationFrame(animate);
    if (!!dirt) {
        dirt.rotation.x += -0.00045;
        dirt.rotation.y += 0.0009;
    }



    if (doUpdate) {

        // scores-related parts
        if (gameLost !== -1) {
            if (gameLost < meshes.length) {

                // the part that shows the score when the game ends
                if (gameLost == 0) {
                    var lbl_lostScore = document.getElementById("lbl_lostScore");
                    lbl_lostScore.innerHTML = score;
                    leaveFullscreen();
                    $('#modal3').modal('open');
                }
                scene.remove(meshes[gameLost]);
                gameLost++;


            } else {


            }
        } else {
            // the part where your body stretches when you eat an apple
            for (var z1 = 0; z1 <= 4; z1++) {
                var firstBB = new THREE.Box3().setFromObject(meshes[0]);
                var secondBB = new THREE.Box3().setFromObject(fruit[z1]);
                if (firstBB.isIntersectionBox(secondBB)) {
                    addOneBlock();
                    scene.remove(fruit[z1]);
                    fruit.splice(z1, 1);
                    genFruits();
                }
            }

            // the part where the game ends when you collide with a wall or body
            var headBB = new THREE.Box3().setFromObject(meshes[0]);
            var northBB = new THREE.Box3().setFromObject(mesh);
            var southBB = new THREE.Box3().setFromObject(mesh2);
            var eastBB = new THREE.Box3().setFromObject(mesh3);
            var westBB = new THREE.Box3().setFromObject(mesh4);


            if (headBB.isIntersectionBox(northBB) || headBB.isIntersectionBox(southBB) || headBB.isIntersectionBox(eastBB) || headBB.isIntersectionBox(westBB)) {
                gameLost = 0;
            }

            //console.log(direction);

            if (direction == "r") {
                right();
            } else if (direction == "l") {
                left();
            } else if (direction == "u") {
                up();
            } else if (direction == "d") {
                down();
            }

            //cameraUpdate();

            // the part where the game ends when you hit your body
            for (var i = 1; i < meshes.length; i++) {
                if (meshes[i].position.x == meshes[0].position.x && meshes[i].position.y == meshes[0].position.y) {
                    gameLost = 0;
                    //refreshTime = 10;
                }
            }

        }
        doUpdate = false;
        eingabe = false;
    }
    // cameraUpdate();
    camera.update();
    renderer.render(scene, camera);


}