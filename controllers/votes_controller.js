const Vote = require("../models/vote");
const Post =  require("../models/post");
const Comment = require('../models/comment');


module.exports.toggleVote = async function(req, res){
    try{

        // votes/toggle/?id=abcdef&type=Post
        let voteable;
        let deleted = false;


        // if (req.query.type == 'Post'){
        //     voteable = await Post.findById(req.query.id).populate('votes');
        // }else{

            voteable = await Comment.findById(req.query.id).populate('votes');
        // }


        let existingVote = await Vote.findOne({
            voteable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        if (existingVote){
            voteable.votes.pull(existingVote._id);
            voteable.save();

            existingVote.remove();
            deleted = true;

        }else{

            let newVote = await Vote.create({
                user: req.user._id,
                Voteable: req.query.id,
                onModel: req.query.type
            });

            voteable.votes.push(newVote._id);
            voteable.save();

        }

        // return res.json(200, {
        //     message: "Request successful!",
        //     data: {
        //         deleted: deleted
        //     }
        // })
        return res.redirect('/');



    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}