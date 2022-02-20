'use strict'
const STORAGE_KEY = 'memeDB'
var gImgs = loadImgs()
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
var gMemes = []
var gGrubbed
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gCurrStickers = [gStickers[0], gStickers[1], gStickers[2]]

var gStyle = {
    font: 'impact',
    fontSize: 50,
    fill: 'white',
    lineWidth: 3,
    stroke: 'black'
}

function addSticker(elSticker) {
    gMemes.push({
        isTxt: false,
        img: elSticker,
        x: 50,
        y: 50,
        width: elSticker.width,
        height: elSticker.height
    })
}

function setNewImg(img) {
    gImgs.unshift({
        id: gImgs.length,
        url: `${img}`
    })
    saveToStorage(STORAGE_KEY, gImgs)
}

function addTxt(txt) {
    clearFocus()
    gMemes.push({
        isTxt: true,
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

function setGrubbed(pos) {
    const clickedMeme = gMemes.find(meme =>
        (pos.x >= meme.x && pos.x <= meme.x + meme.width &&
            pos.y <= meme.y && pos.y >= meme.y - meme.height) || (pos.x >= meme.x && pos.x <= meme.x + meme.width &&
                pos.y <= meme.y && pos.y >= meme.y + meme.height))
    gGrubbed = clickedMeme
    clearFocus()
    if (clickedMeme) clickedMeme.isFocused = true
}

function setNewFont(font) {
    const txt = getFocused()
    if(txt) txt.style.font = font
    gStyle.font = font
}

function setNewClr(clr) {
    const txt = getFocused()
    if (txt) txt.style.fill = clr
    gStyle.fill = clr
}

function setNewStrokeColor(color) {
    const txt = getFocused()
    if (txt) txt.style.stroke = color
    gStyle.stroke = color
}

function setSize(sizeAdd) {
    const meme = getFocused()
    if (meme.txt) {
        meme.style.fontSize += sizeAdd
    } else {
        meme.width += sizeAdd * 10
        meme.height += sizeAdd * 10
    }
}

function sortImgs(sortBy) {
    if (sortBy === 'all') {
        gCurrImgs = gImgs
        return
    }
    gCurrImgs = []
    gImgs.forEach(img => {
        if (img.tag === sortBy) {
            gCurrImgs.push(img)
        }
    })
}

function switchFocus() {
    if (!gMemes[0]) return
    const objIdx = gMemes.findIndex(meme => meme.isFocused) + 1
    clearFocus()
    if (gMemes[objIdx]) gMemes[objIdx].isFocused = true
    else gMemes[0].isFocused = true
}

function removeMeme() {
    const idx = gMemes.findIndex(meme => meme.isFocused)
    if (idx === -1) return
    gMemes.splice(idx, 1)
}

function clearGrubbedObj() {
    gGrubbed = undefined
}

function clearFocus() {
    gMemes.forEach(meme => meme.isFocused = false)
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
function loadImgs() {
    var imgs = loadFromStorage(STORAGE_KEY)
    if (!imgs || imgs === []) {
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
        saveToStorage(STORAGE_KEY, imgs)
    }
    return imgs
}

function getImgs() {
    return gCurrImgs
}

function getStickers() {
    return gCurrStickers
}

function getMemes() {
    return gMemes
}

function getGrabbed() {
    return gGrubbed
}

function getStyle() {
    return gStyle
}

function getFocused() {
    var obj = gMemes.find(obj => obj.isFocused)
    return obj
}


