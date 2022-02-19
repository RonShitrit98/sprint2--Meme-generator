'use strict'
var gCanvas
var gCtx
var gElMemeImg


function setEditor(elImg) {
    gCanvas = document.querySelector('.editor')
    gCtx = gCanvas.getContext('2d')
    addListeners()
    gElMemeImg = elImg
    if (elImg.width > 600) {
        var scale = Math.min(600 / gElMemeImg.width, 600 / gElMemeImg.height);
        gCanvas.width = gElMemeImg.width * scale
        gCanvas.height = gElMemeImg.height * scale
    } else {
        gCanvas.width = elImg.width
        gCanvas.height = elImg.height
    }
    
    renderMeme()
    renderStickers()
}

function renderMeme() {
    gCtx.drawImage(gElMemeImg, 0, 0, gCanvas.width, gCanvas.height)
    renderFocus()
    renderObjs()
}

function addListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function renderObjs() {
    const objs = getObjs()
    if(objs===[]||!objs) return
    objs.forEach(obj => {
        if (obj.txt) {
            gCtx.font = `${obj.style.fontSize}px ${obj.style.font}`
            gCtx.fillStyle = obj.style.fill
            gCtx.lineWidth = obj.style.lineWidth
            gCtx.strokeStyle = obj.style.stroke
            gCtx.fillText(obj.txt, obj.x, obj.y, gCanvas.width)
            gCtx.strokeText(obj.txt, obj.x, obj.y, gCanvas.width)
            const txtWidth = gCtx.measureText(obj.txt);
            obj.width = txtWidth.width
            obj.height = obj.style.fontSize
        }else if(obj.img){
            gCtx.drawImage(obj.img, obj.x, obj.y-obj.height, obj.width, obj.height)

        }
    })
}

function renderFocus() {
    const obj = getFocusedObj()
    if(!obj) return
    if (obj) {
        gCtx.strokeStyle = 'rgba(255, 0, 0, 0.5)'
        gCtx.lineWidth = 3
        gCtx.strokeRect(obj.x - 5, obj.y + 10, obj.width + 10, -(obj.height + 10))
    }
}

function renderStickers(){
    const stickers = getStickers()
    for(var i = 0;i<stickers.length;i++){
        var strHtml = `<img onclick="onAddSticker(this)" src="${stickers[i].url}">`
      var elSticker = document.getElementById(`sticker${i+1}`)
      elSticker.innerHTML = strHtml
    }

}

function onAddSticker(elSticker){
    addStickerObj(elSticker)
    renderMeme()
}

function onMoveStickers(pos){
    moveStickers(pos)
    renderStickers()
}

function onTypeTxt(elTxt) {
    renderMeme()
    const style = getStyle()
    const txt = elTxt.value
    gCtx.font = `${style.fontSize}px ${style.font}`
    gCtx.fillStyle = style.fill
    gCtx.lineWidth = style.lineWidth
    gCtx.strokeStyle = style.stroke
    gCtx.fillText(txt, 20, 50, gCanvas.width)
    gCtx.strokeText(txt, 20, 50, gCanvas.width)
}

function onAddTxt(elTxt=false) {
    var txt = elTxt.value
    if(!elTxt){
        txt = document.querySelector('.txt-input').value
    }
    setNewTxt(txt)
    renderMeme()
}

function onClrChange(elInput) {
    setNewClr(elInput.value)
    renderMeme()
}

function onChangeFont(elInput){
setNewFont(elInput.value)
renderMeme()
renderFocus()
}

function onStrokeChange(elInput) {
    setNewStrokeClr(elInput.value)
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

function onDownloadImg(elLink) {
    clearFocus()
    renderMeme()
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onOpenColorInput(elBtn) {
    const elInput = document.querySelector('.color-input')
    elInput.style.display = 'block'
    elBtn.style.display = 'none'
}

function onOpenStrokeColor(elBtn) {
    const elInput = document.querySelector('.stroke-input')
    elInput.style.display = 'block'
    elBtn.style.display = 'none'
}

function onAlignTxt(pos) {
    const obj = getFocusedObj()
    switch (pos) {
        case 'left':
            obj.x = 20
            break
        case 'center':
            obj.x = (gCanvas.width - obj.width)/2
            break
        case 'right':
            obj.x = gCanvas.width - obj.width - 20
            break
        default: return
    }
    renderMeme()
    renderStickers()
}

function onDown(ev) {
    const pos = getEvPos(ev)
    setGrubbedObj(pos)
    renderMeme()
    gCanvas.style.cursor = 'grabbing'
}

function onUp() {
    clearGrubbedObj()
}


function onMove(ev) {
    const pos = getEvPos(ev)
    var obj = getGrabbedObj()
    if (obj) {
        gCanvas.style.cursor = 'grabbing'
        obj.x = pos.x - obj.width / 2
        obj.y = pos.y + obj.height / 2
        renderMeme(gElMemeImg)
    } else gCanvas.style.cursor = 'grab'
}
