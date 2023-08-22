import multer from 'multer'
import path from 'path'
import crypto from 'node:crypto'

const pathFile = path.resolve(__dirname, '..', 'tmp', 'uploads')

const upload = multer({
  dest: pathFile,
  limits: { fileSize: 1048576 },
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, pathFile)
    },
    filename(req, file, callback) {
      const fileName = `${crypto.randomBytes(20).toString('hex')}${
        file.originalname
      }`

      callback(null, fileName)
    },
  }),
})

export { upload }
