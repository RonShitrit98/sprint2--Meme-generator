'use strict'
const STORAGE_KEY = 'memeDB'
var gImgs = getImgsStarter()
var gCurrImgs = gImgs
const gStickers = [{
    id: 1,
    url: `stickers/1.png`,
}, {
    id: 2,
    url: `stickers/2.png`,
}, {
    id: 3,
    url: `stickers/3.png`,
}, {
    id: 4,
    url: `stickers/4.png`,
}, {
    id: 5,
    url: `stickers/5.png`,
}, {
    id: 6,
    url: `stickers/6.png`,
}, {
    id: 7,
    url: `stickers/7.png`,
}, {
    id: 8,
    url: `stickers/8.png`,
}, {
    id: 9,
    url: `stickers/9.png`,
}]
var gMemeObjs = []
var gGrubbedObj
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gCurrStickers = [gStickers[0], gStickers[1], gStickers[2]]

var gStyle = {
    font: 'impact',
    fontSize: 50,
    fill: 'white',
    lineWidth: 3,
    stroke: 'black'
}

function getImgsStarter() {
    var imgs = loadFromStorage(STORAGE_KEY)
    if(!imgs||imgs === []){
        imgs = []
        for (var i = 1; i <= 25; i++) {
            imgs.push({
                id: i,
                url: `meme-imgs/${i}.jpg`,
            })
        }
        imgs[0].tag = 'tv'
        imgs[1].tag = 'movies'
        imgs[2].tag = 'politics'
        imgs[3].tag = 'animals'
        imgs[4].tag = 'funny'
        imgs[5].tag = 'animals'
        imgs[6].tag = 'movies'
        imgs[7].tag = 'movies'
        imgs[8].tag = 'funny'
        imgs[9].tag = 'funny'
        imgs[10].tag = 'politics'
        imgs[11].tag = 'tv'
        imgs[12].tag = 'funny'
        imgs[13].tag = 'animals'
        imgs[14].tag = 'politics'
        imgs[15].tag = 'tv'
        imgs[16].tag = 'funny'
        imgs[17].tag = 'movies'
        imgs[18].tag = 'movies'
        imgs[19].tag = 'movies'
        imgs[20].tag = 'tv'
        imgs[21].tag = 'tv'
        imgs[22].tag = 'politics'
        imgs[23].tag = 'movies'
        imgs[24].tag = 'animals'
        saveToStorage(STORAGE_KEY,imgs)
    }
    return imgs
}

function getImgs() {
    return gCurrImgs
}

function getStickers() {
    return gCurrStickers
}

function getObjs() {
    return gMemeObjs
}

function getGrabbedObj() {
    return gGrubbedObj
}

function getStyle() {
    return gStyle
}

function getFocusedObj() {
    var obj = gMemeObjs.find(obj => obj.isFocused)
    return obj
}

function addStickerObj(elSticker){
    gMemeObjs.push({
        img: elSticker,
        x: 50,
        y:50,
        width: elSticker.width,
        height: elSticker.height
    })
}

function setNewImg(img){
    gImgs.unshift({
        id:gImgs.length,
        url: `${img}`
    })
    saveToStorage(STORAGE_KEY,gImgs)
}

function setNewTxt(txt) {
    clearFocus()
    gMemeObjs.push({
        txt,
        x: 50,
        y: 50,
        isGrabbed: false,
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

function setGrubbedObj(pos) {
    const clickedObj = gMemeObjs.find(obj =>
        (pos.x >= obj.x && pos.x <= obj.x + obj.width &&
        pos.y <= obj.y && pos.y >= obj.y - obj.height)|| (pos.x >= obj.x && pos.x <= obj.x + obj.width &&
        pos.y <= obj.y && pos.y >= obj.y + obj.height))
    gGrubbedObj = clickedObj
    clearFocus()
    if (clickedObj) clickedObj.isFocused = true
}

function setNewFont(font) {
    const obj = getFocusedObj()
    if (obj) obj.style.font = font
    gStyle.font = font
}

function setNewClr(clr) {
    const obj = getFocusedObj()
    if (obj) obj.style.fill = clr
    gStyle.fill = clr
}

function setNewStrokeClr(clr) {
    const obj = getFocusedObj()
    if (obj) obj.style.stroke = clr
    gStyle.stroke = clr
}

function setSize(sizeAdd) {
    const obj = getFocusedObj()
    if(obj.txt){
        obj.style.fontSize += sizeAdd
    }else{
        obj.width+=sizeAdd*10
        obj.height+=sizeAdd*10
    } 
}

function sortImgs(sortBy){
    if(sortBy==='all'){
        gCurrImgs=gImgs
        return
    } 
    gCurrImgs = []
    gImgs.forEach(img => {
        if(img.tag === sortBy){
            gCurrImgs.push(img)
        }
    })
}

function switchFocus() {
    if (!gMemeObjs[0]) return
    const objIdx = gMemeObjs.findIndex(obj => obj.isFocused) + 1
    clearFocus()
    if (gMemeObjs[objIdx]) gMemeObjs[objIdx].isFocused = true
    else gMemeObjs[0].isFocused = true
}

function deleteObj() {
    const objIdx = gMemeObjs.findIndex(obj => obj.isFocused)
    if (objIdx === -1) return
    gMemeObjs.splice(objIdx, 1)
}

function clearGrubbedObj() {
    gGrubbedObj = undefined
}

function clearFocus() {
    gMemeObjs.forEach(obj => obj.isFocused = false)
}

function moveStickers(pos) {
    var moveTo
    switch (pos) {
        case 'right':
            moveTo = 1
            break
        case 'left':
            moveTo = -1
            break
        default: return
    }
    const idx = gStickers.findIndex(sticker => sticker === gCurrStickers[2])
    if (idx >= gStickers.length - 1 && moveTo === 1) gCurrStickers = [gStickers[0], gStickers[1], gStickers[2]]
    else if (idx <= 2 && moveTo === -1) gCurrStickers = [gStickers[gStickers.length - 3], gStickers[gStickers.length - 2], gStickers[gStickers.length - 1]]
    else gCurrStickers = [gStickers[idx + moveTo], gStickers[idx + moveTo * 2], gStickers[idx + moveTo * 3]]
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = function (ev) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = ev.target.result
        setNewImg(img.src)
    }
    reader.readAsDataURL(ev.target.files[0])
}




