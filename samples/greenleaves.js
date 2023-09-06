const { MusicXML, EncodingDate } = require('../src/index.js')

const music = new MusicXML()

music.setRights('MIT License')
music.setCreator(require('os').userInfo().username)
music.setSoftware('@brtmvdl/musicxml')
music.setEncodingDate(new EncodingDate())

music.saveToFile(`./greensleeves.${Date.now()}.musicxml`)
