import PostModel from "../apis/posts/model.js"

export const postPost = async (req,res,next) => {
   
    try{

        const newPost = new PostModel(req.body)
    
        const {_id} = await newPost.save()
        
        res.status(201).send({ id: _id})
    
    } catch(error){
        next(error)
    }
    }
