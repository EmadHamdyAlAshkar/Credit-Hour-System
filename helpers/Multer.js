import { MongoUnexpectedServerResponseError } from 'mongodb'
import multer from 'multer'
import fs from 'fs'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if (req.body.type == 'category_img')
            cb(null, './public/images/category')
        else if (req.body.type == 'project_img')
            cb(null, './public/images/project')
        else
            cb(null, './public/images/others')
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`
        cb(null, file.fieldname + '-' + filename)
    }
})


const validImgTypes = [
    "image/png", "image/jpg", "image/jpeg", "image/svg+xml", "image/webp", "image/gif"
]
const validVideoTypes = [
    "video/x-msvideo", "video/mp4", "video/x-flv", "video/quicktime", "video/x-ms-wmv", "video/ogg"
]

function insert_image(req, res, next) {

    const upload = multer({ storage }).single('project')
    upload(req, res, (error) => {
        const { file, type } = req;
        if (!error) {
            res.send({
                file: file.originalname,
                path: file.path

            })
        }
        else {
            res.send(error);
        }
    })
}
// function Upload_images(req, res, next) {
//     const upload = multer({ storage })
//     const multipleUpload=upload.fields([{name:'logo',maxCount:1},{name:'background',maxCount:1},{name:'photos'}])
//     multipleUpload(req, res, (error) => {
//         const { file, type } = req;
//         if (!error) {
//             // req.files.map((x)=>{
//             //     console.log(x)
//             // })
//             console.log(req.files)
//             console.log('*****************************')
//             console.log(req.files.logo[0].path)
//             console.log('*****************************')
//         }
//         else {
//             res.send(error);
//         }
//     })
// }


const upload = multer({ storage })
const Upload_images = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'background', maxCount: 1 }, { name: 'photos' }])

const uploadimage = multer({
    storage: storage, fileFilter(req, file, cb) {
        if (validImgTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('invaild file type!'))
        }

    }, limits: { fileSize: 1048576 }
})


function delete_img(paths) {
    paths.map((path) => {
        try {
            fs.unlinkSync(path)
            console.log(`Delete ${path} successfully.`);

        } catch (error) {
            console.log(error);
        }
    })

}

export default {
    insert_image,
    uploadimage,
    Upload_images,
    delete_img
}