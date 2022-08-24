const router = require('express').Router();
const Post = require('../models/posts.model');

router.route('/').get((req,res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res) => {
   Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: '+err))
});

router.route('/findUserPosts/:id').get((req,res) => {
    Post.find({postedBy: req.params.id})
         .then(post => res.json(post))
         .catch(err => res.status(400).json('Error: '+err))
 });

 router.route('/deleteUserPosts/:id').delete((req,res) => {
     Post.deleteMany({postedBy: req.params.id})
         .then(() => res.json('deleted') )
         .catch(err => console.log(err))
 })

router.route('/add').post((req,res) => {
    const body = req.body.body;
    const imgUrl = 'https://green-discussions-post-images.s3.us-east-2.amazonaws.com/public/postsPictures/';
    const title = req.body.title;
    const username = req.body.username;
    const postedBy = req.body.postedBy;
    const tags = req.body.tags;
    const createdAt = new Date();

    const newPost = new Post({
        body,
        imgUrl,
        title,
        postedBy,
        username,
        createdAt,
        tags
    })

    newPost.save()
           .then(post => res.json(post))
           .catch(err => res.status(400).json('Error: '+err))
});

router.route('/like').post((req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $addToSet:{likes:req.body.user.id}
    },{
        runValidators: true,
    }).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
});

router.route('/unlike').post((req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.body.user.id}
    },{
        new:true
    }).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
});

router.route('/update/:id').post((req,res) => {
    Post.findByIdAndUpdate(req.params.id)
       
});

router.route('/:id').delete((req,res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
});


router.put('/like',(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push: {likes:req.user._id}
    },{
        new:true
    }).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

module.exports = router;