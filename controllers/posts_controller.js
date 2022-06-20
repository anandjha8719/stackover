const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.create = async function(req, res){
    try{
        console.log(req.body);
        let post = await Post.create({
            content: req.body.content,
            tag: req.body.tags,
            user: req.user._id
        });
        // let rep
        console.log(req.user._id)

        let user = await User.findById({_id:req.user.id})
        console.log(user)
        user.rep = user.rep + 5
        // let repUpdate = await User.findByIdAndUpdate({_id:req.user._id}, user)
        await user.save()
        // console.log(repUpdate)
        
        if (req.xhr){
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post  : post,
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        console.log(err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "question deleted"
                });
            }

            req.flash('success', 'question removed!');

            return res.redirect('back');
        }else{
            req.flash('error', 'cannot delete this question!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}