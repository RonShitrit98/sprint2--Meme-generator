'use strict'
var gCanvas
var gCtx
var gElMemeImg


function setEditor(elImg) {
    gCanvas = document.querySelector('.editor')
    gCtx = gCanvas.getContext('2d')
    addListeners()
    gElMemeImg = elImg
    if (elImg.width > 700) {
        var scale = Math.min(700 / gElMemeImg.width, 700 / gElMemeImg.height);
        gCanvas.width = gElMemeImg.width * scale
        gCanvas.height = gElMemeImg.height * scale
    } else {
        gCanvas.width = elImg.width
        gCanvas.height = elImg.height
    }

    renderMeme()
    clearGrubbedObj()
}

function renderMeme() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.drawImage(gElMemeImg, 0, 0, gCanvas.width, gCanvas.height)
    var currObj = getGrabbedObj()
    renderFocus()
    renderObjs()
}

function scaleToFit(img) {
    // get the scale
    // get the top left position of the image
}

function renderObjs() {
    const objs = getObjs()
    objs.forEach(obj => {
        if (obj.txt) {
            // const style = getStyle()
            gCtx.font = `${obj.style.fontSize}px ${obj.style.font}`
            gCtx.fillStyle = obj.style.fill
            gCtx.lineWidth = obj.style.lineWidth
            gCtx.strokeStyle = obj.style.stroke
            gCtx.fillText(obj.txt, obj.x, obj.y, gCanvas.width)
            gCtx.strokeText(obj.txt, obj.x, obj.y, gCanvas.width)
            const txtWidth = gCtx.measureText(obj.txt);
            obj.width = txtWidth.width
            obj.height = obj.style.fontSize
        }
    })
}

function renderFocus() {
    const obj = getFocusedObj()
    if (obj) {
        gCtx.lineWidth = 8
        gCtx.strokeRect(obj.x - 5, obj.y + 10, obj.width + 10, -(obj.height + 10))
    }
}


function addListeners() {
    addMouseListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    setGrubbedObj(pos)
    renderMeme()
}

function onUp() {
    clearGrubbedObj()
}


function onMove(ev) {
    const pos = getEvPos(ev)
    var obj = getGrabbedObj()
    if (obj) {
        obj.x = pos.x - obj.width / 2
        obj.y = pos.y + obj.height / 2
        renderMeme(gElMemeImg)
    }

}

function onTypeTxt(elTxt) {
    renderMeme()
    const style = getStyle()
    const txt = elTxt.value
    console.log(txt)
    gCtx.font = `${style.fontSize}px ${style.font}`
    gCtx.fillStyle = style.fill
    gCtx.lineWidth = style.lineWidth
    gCtx.strokeStyle = style.stroke
    gCtx.fillText(txt, 50, 50, gCanvas.width)
    gCtx.strokeText(txt, 50, 50, gCanvas.width)
}

function onAddTxt(elTxt) {
    const txt = elTxt.value
    setNewTxt(txt)
    renderMeme()
}

function onClrChange(elInput) {
    console.log('clr')
    console.log(elInput.value)
    setNewClr(elInput.value)
    renderMeme()
}

function onChangeSize(sizeAdd) {
    setSize(sizeAdd)
    renderMeme()
}

function onSwitchFocus() {
    switchFocus()
    renderMeme()
}

function onDelete() {
    deleteObj()
    switchFocus()
    renderMeme()

}