import { body } from 'express-validator';

export const validateBlogPost = [
  body('title')
    .notEmpty().withMessage('title is required'),

  body('text')
    .notEmpty().withMessage('text is required'),

  body('typeOfBlogPost')
    .notEmpty().withMessage('typeOfBlogPost is required')
    .isIn(["noticia", "evento", "salud", "educación", "video"]).withMessage('The post type is not valid. The allowed options are:noticia, evento, salud, educación, video'),
    
  body('link')
    .optional({ checkFalsy: true }) 
    .isURL().withMessage('The link must be a valid URL') 

];