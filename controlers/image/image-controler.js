import { MongoUnexpectedServerResponseError } from 'mongodb'
import multer from 'multer'
import fs from 'fs'
import images from '../../models/images/images'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`
        cb(null, file.fieldname + '-' + filename)
    }
})



function upload_images(req, res, next) {
    console.log("Uploading Start")
    const upload = multer({ storage })
    const Upload_images = upload.fields([{ name: 'photos' }])
    Upload_images(req, res, (error) => {
        if (error) {
            console.log(error)
        }
        else {
            // console.log(String(req.files.photos[0].path))
            req.files.photos.map(async (photo)=>{
                let image=new images({
                    _id:photo.path,
                    name:photo.originalname,
                    path:photo.path,
                    size:photo.size,
                    filename:photo.filename
                })
                await image.save((error, result) => {
                    if (error) {
                      console.log(error)
                    }
                    else {
                      console.log(`${photo.originalname} saved !!!`)
                    }
                  })
            })
            res.send("DONE!!!")
        }
    })
}
function delete_img_by_paths(paths) {
    paths.map((path) => {
        try {
            fs.unlinkSync(path)
            console.log(`Delete ${path} successfully.`);

        } catch (error) {
            console.log(error);
        }
    })

}
async function delete_images(req,res,next) {
    let paths=req.body
    paths.map(async (path) => {
        try {
            fs.unlinkSync(path)
            await images.findOneAndDelete({_id:path})
            console.log(`Delete ${path} successfully.`);

        } catch (error) {
            console.log(error);
        }
    })
    // await images.findOneAndDelete({_id:req.body.id})
    res.send("Done!")
}
export default {
    upload_images,
    delete_images,
}