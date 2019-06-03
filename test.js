const path = require('path')
const fs = require('fs')
const fr = require('face-recognition')

const image = fr.loadImage('./img/aile.jpg')
const detector = fr.FaceDetector()
const targetSize = 100
const faceImages = detector.detectFaces(image, targetSize)
faceImages.forEach((img, i) => fr.saveImage(`face_${i}.jpg`, img))

