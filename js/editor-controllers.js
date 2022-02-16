'use strict'
var gCanvas
var gCtx
var gElMemeImg


function setEditor(elImg) {
    gCanvas = document.querySelector('.editor')
    gCtx = gCanvas.getContext('2d')
    addListeners()
    gElMemeImg = elImg
    gCanvas.width = elImg.width
    gCanvas.height = elImg.height
    renderMeme(elImg)
    clearGrubbedObj()
}

function renderMeme() {
    gCtx.drawImage(gElMemeImg, 0, 0)
    var currObj = getGrabbedObj()
    renderFocus()
    renderObjs()
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
    if(obj){
        gCtx.lineWidth = 8
        gCtx.strokeRect(obj.x-5, obj.y+10, obj.width + 10, -(obj.height + 10))
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
        obj.x = pos.x
        obj.y = pos.y
        renderMeme(gElMemeImg)
    }

}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     }
    // }
    return pos
}

function onAddTxt(elTxt) {
    const txt = elTxt.value
    setNewTxt(txt)
    renderMeme()
}

function onClrChange(elInput) {
    console.log(elInput.value)
    setNewClr(elInput.value)
    renderMeme()
}

function onChangeSize(sizeAdd) {
    setSize(sizeAdd)
    renderMeme()
}

function onSwitchFocus(){
    switchFocus()
    renderMeme()
}

