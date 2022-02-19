'use strict'
var gElImg

function onInit() {
    renderImgs()
    renderTags()
}

function renderImgs() {
    const imgs = getImgs()
    var strHtml = ''
    imgs.forEach(img => {
        strHtml += `<img class="meme" onclick="onImgSelect(this)" id="${img.id}" src="${img.url}">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml
}

function renderTags() {
    const imgs = getImgs()
    var strHtml = `<ul class="tag-list"><li onclick="onSortImgs('funny')">Funny</li>
    <li onclick="onSortImgs('animals')">Animals</li>
    <li onclick="onSortImgs('tv')">TV</li>
    <li onclick="onSortImgs('movies')">Movies</li>
    <li onclick="onSortImgs('politics')">Politics</li>
    <li onclick="onSortImgs('all')">All</li></ul>`
    const tagList = document.querySelector('.tag-list-container')
    tagList.innerHTML = strHtml
}

function setGallery() {
    const elEditor = document.querySelector('.main-editor')
    elEditor.style.display = 'none'
    const elGallery = document.querySelector('.main-gallery')
    elGallery.style.display = 'block'
}

function onSortImgs(sortBy) {
    sortImgs(sortBy)
    renderImgs()
}

function onImgSelect(elImg) {
    const elEditor = document.querySelector('.main-editor')
    elEditor.style.display = 'flex'
    const elGallery = document.querySelector('.main-gallery')
    elGallery.style.display = 'none'
    gElImg = elImg
    setEditor(elImg)
}

function getElImg() {
    return gElImg
}

function onLogoClick() {
    renderImgs()
    setGallery()
}

function onImgInput(ev) {
    loadImageFromInput(ev, onImgSelect)
}

// function loadImageFromInput(ev, onImageReady) {
//     var reader = new FileReader()
//     reader.onload = function (ev) {
//         var img = new Image()
//         img.onload = onImageReady.bind(null, img)
//         img.src = ev.target.result
//     }
//     reader.readAsDataURL(ev.target.files[0])
// }
