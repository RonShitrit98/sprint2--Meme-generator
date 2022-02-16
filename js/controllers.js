'use strict'
function onInit(){
    renderImgs()
}

function renderImgs(){
    const imgs = getImgs()
    var strHtml = ''
    imgs.forEach(img => {
        strHtml+= `<div class="meme-image">${img.url}</div>`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml
}