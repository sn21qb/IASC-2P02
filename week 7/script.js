import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(1, 0, 0)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

scene.background = new THREE.Color("#000000")

/***********
** MESHES **
************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(20, 10)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

// OBJECTS
// torusKnot
const IcosahedronGeometry = new THREE.IcosahedronGeometry(1,0);
const IcosahedronMaterial = new THREE.MeshNormalMaterial()
const Icosahedron = new THREE.Mesh(IcosahedronGeometry, IcosahedronMaterial)
//Icosahedron.position.set(6, 1.5, 0)
Icosahedron.castShadow = true
//scene.add(Icosahedron)

// sphere
const SphereGeometry = new THREE.SphereGeometry(0.7)
const SphereMaterial = new THREE.MeshNormalMaterial()
const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial)
//Sphere.position.set(6, 2.5, 0)
Sphere.position.set(0, 1, 0)
Sphere.castShadow = true
//scene.add(Sphere)

// Group
const Group = new THREE.Group()
Group.add(Icosahedron)
Group.add(Sphere)
scene.add(Group)
Group.position.set(6, 1.5, 0)

// SUN
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity: 20
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

/***********
** LIGHTS **
************/
/*
// Ambient Light
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('white')
)
scene.add(ambientLight)
*/

// Direcional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(10, 2.5, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

// Directional Light Helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*******
** UI **
********/
/* 
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
    directionalLight.position.set(8.6, 1.7, 0)
}

// Directional Light
const lightPositionFolder = ui.addFolder('Directional Light Position')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset position')

*/

/*********************
** DOM INTERACTIONS **
**********************/
//domObject
const domObject = {
    firstChange:false,
    secondChange:false,
    thirdChange:false,
    fourthChange:false,
    fifthChange:false,
    sixthChange:false,
    seventhChange:false,
    eightChange:false,
}

//continue reading
document.querySelector('#continue-reading').onclick = function() {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
}
//restart
document.querySelector('#restart').onclick = function() {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
}

//first change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

//second change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

//third change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}

//fourth change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

//fifth change
document.querySelector('#fifth-change').onclick = function() {
    domObject.fifthChange = true
}

//sixth change
document.querySelector('#sixth-change').onclick = function() {
    domObject.sixthChange = true
}

//seventh change
document.querySelector('#seventh-change').onclick = function() {
    domObject.seventhChange = true
}

//eighth change
document.querySelector('#eighth-change').onclick = function() {
    domObject.eighthChange = true
}




/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    //Icosahedron.rotation.y = elapsedTime
    //Icosahedron.position.z = Math.sin(elapsedTime * 0.5) * 2
    Group.rotation.y = elapsedTime
    Group.position.z = Math.sin(elapsedTime * 0.5) * 2
    //if(secondChange){
    //    directionalLight.position.y = Math.sin(elapsedTime)
    //}
    //if(move2)
    //{
        
    //}

    // Update directionalLightHelper
    //directionalLightHelper.update()

    // Update sun position to match directionalLight position
    sun.position.copy(directionalLight.position)

    //console.log(camera.position)

    // Controls
    controls.update()

    //DOM INTERACTIONS
    //first-change
    if(domObject.firstChange){
        Group.position.y = Math.sin(elapsedTime * 1) * -4
        Group.position.x = 3
    }
    
    //second-change
    if(domObject.secondChange){
        Group.position.set(6, 1.5, 0)

        Group.position.z = Math.sin(elapsedTime * 0.5) * 2
    }

    //third-change
    if(domObject.thirdChange){
        camera.position.set(10, 5, 0)
    }

    //fourth-change
    if(domObject.fourthChange){
        camera.position.set(15, 8, 0)
        //scene.background = new THREE.Color("#0000FF")
    }

    //fifth-change
    if(domObject.fifthChange){
        camera.position.set(10, 8, 10)
        directionalLight.position.y = 5
    }

    //sixth-change
    if(domObject.sixthChange){

    }

    //seventh-change
    if(domObject.seventhChange){

    }

    //eighth-change
    if(domObject.eighthChange){

    }

    //nineth-change
    if(domObject.ninethChange){

    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()

