const router = require('express').Router();
const Comment = require('../models/comments.model');

router.route('/post/:id').get((req,res) => {
    Comment.find({ postId: req.params.id})
           .then(post=> {
               res.json(post);
           })
});

router.route('/add').post((req,res) => {
    const body = req.body.body;
    const username = req.body.username;
    const postId = req.body.postId;
    const postedBy = req.body.postedBy;

    const newComment = new Comment({
        body,
        username,
        postId,
        postedBy
    });

    newComment.save()
    .then(() => res.json('Comment added!'))
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/:id').delete((req,res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;