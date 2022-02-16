'use strict'
var gImgs = getImgsStarter()

function getImgsStarter() {
    var imgs = []
    for (var i = 1; i <= 18; i++) {
        imgs.push({
id: i,
url: `<img src="/meme-imgs (square)/${i}.jpg">`,
        })
    }
    return imgs
}

function getImgs(){
    return gImgs
}