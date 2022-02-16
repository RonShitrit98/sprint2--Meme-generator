'use strict'
var gImgs = getImgsStarter()
var gMemeObjs = [{
    txt: 'Your Text Here',
    x: 50,
    y: 50,
    isGrabbed: false,
    isFirstGrabbed: false,
    isFocused: true,
    style: {
        font: 'impact',
        fontSize: 50,
        fill: 'white',
        lineWidth: 3,
        stroke: 'black'
    }
}]
var gGrabbedObj
var gGrubbeObj = gMemeObjs[0]

var gStyle = {
    font: 'impact',
    fontSize: 50,
    fill: 'white',
    lineWidth: 3,
    stroke: 'black'
}

function getImgsStarter() {
    var imgs = []
    for (var i = 1; i <= 18; i++) {
        imgs.push({
            id: i,
            url: `../meme-imgs/${i}.jpg`,
        })
    }
    return imgs
}

function getImgs() {
    return gImgs
}

function getObjs() {
    return gMemeObjs
}

function getGrabbedObj() {
    return gGrubbeObj
}

function setGrubbedObj(pos) {
    const clickedObj = gMemeObjs.find(obj =>
        pos.x >= obj.x && pos.x <= obj.x + obj.width &&
        pos.y <= obj.y && pos.y >= obj.y - obj.height)
    gGrubbeObj = clickedObj
    clearFocus()
    if(clickedObj) clickedObj.isFocused = true
    // gGrabbedObj.isFirstGrabbed = true
}

function clearGrubbedObj() {
    gGrubbeObj = undefined
}

function setObj(pos) {
}

function setNewTxt(txt) {
    clearFocus()
    gMemeObjs.push({
        txt,
        x: 50,
        y: 50,
        isGrabbed: false,
        isFirstGrabbed: false,
        isFocused: true,
        style: {
            font: gStyle.font,
            fontSize: gStyle.fontSize,
            fill: gStyle.fill,
            lineWidth: gStyle.lineWidth,
            stroke: gStyle.stroke
        }
    })
}

function clearFocus() {
    gMemeObjs.forEach(obj => obj.isFocused = false)
}

function getStyle() {
    return gStyle
}

function setNewClr(clr) {
    const obj = getFocusedObj()
    obj.style.fill = clr
}

function setSize(sizeAdd) {
    // gStyle.fontSize += sizeAdd
    const obj = getFocusedObj()
    obj.style.fontSize+= sizeAdd
}

function getFocusedObj() {
    var obj = gMemeObjs.find(obj => obj.isFocused)
    return obj
}

function switchFocus(){
   const objIdx = gMemeObjs.findIndex(obj => obj.isFocused) + 1
    clearFocus()
    if(gMemeObjs[objIdx]) gMemeObjs[objIdx].isFocused = true
    else gMemeObjs[0].isFocused = true
}