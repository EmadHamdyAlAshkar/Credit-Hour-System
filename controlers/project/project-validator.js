import {body} from "express-validator"
import project from "../../models/project/project-model"

const create_validations=[
    body("name").notEmpty().withMessage("name can't be empty").isString().withMessage("name must be string!!!"),
    // body("background").notEmpty().withMessage("background can't be empty"),
    // body("logo").notEmpty().withMessage("logo can't be empty"),
    body("photos").optional().notEmpty().isArray().withMessage('photos must be array'),
    body("videos").optional().notEmpty().isArray().withMessage('videos must be array'),
    body("sections").optional().notEmpty().isArray().withMessage('videos must be array'),

]


export default {
    create_validations
}