'use strict'
var gElImg 

function onInit(){
    renderImgs()
}

function renderImgs(){
    const imgs = getImgs()
    var strHtml = ''
    imgs.forEach(img => {
        strHtml+= `<div class="meme-image"><img  onclick="onImgSelect(this)" id="${img.id}" src="${img.url}"></div>`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml
}

function onImgSelect(elImg){
    const elEditor = document.querySelector('.main-editor')
    elEditor.style.display = 'flex'
    const elGallery = document.querySelector('.main-gallery')
    elGallery.style.display = 'none'
    gElImg = elImg
    setEditor(elImg)
}

function getElImg(){
    return gElImg
}

function onLogoClick(){
    setGallery()
}
function setGallery(){
    const elEditor = document.querySelector('.main-editor')
    elEditor.style.display = 'none'
    const elGallery = document.querySelector('.main-gallery')
    elGallery.style.display = 'block'
}

function onImgInput(ev) {
    loadImageFromInput(ev, onImgSelect)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = function (ev) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = ev.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}