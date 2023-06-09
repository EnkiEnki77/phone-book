const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { info } = require('../utils/logger');

blogsRouter.get('/', (req, res) => {
    Blog.find({})
    .then(result => res.json(result))
});

blogsRouter.get('/:id', (req, res, next) => {
    const id = req.params.id

    Blog.findById(id)
        .then(result => {
            if(result != null){
                res.json(result)
            }else{
                res.status(404).end()
            }
        })
        .catch(err => next(err))
});

blogsRouter.post('/', (req, res, next) => {
    const body = req.body

    if(body.title == null){
        res.status(400).send({error: 'Title is missing'})
    }else if(body.author == null){
        res.status(400).send({error: 'Author is missing'})
    }else if(body.url == null){
        res.status(400).send({error: 'URL is missing'})
    }else if(body.likes == null){
        res.status(400).send({error: 'Likes is missing'})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    blog.save()
        .then(result => {
            info('Added new blog')
            res.json(result)
        })
        .catch(err => next(err))
})

blogsRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(() => res.status(204).end())
        .catch(err => next(err))
})

blogsRouter.put('/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        like: body.likes
    }

    Blog.findByIdAndUpdate(id, blog, {new: true, runValidators: true, context: 'query'})
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(err => next(err))
})

module.exports = blogsRouter;
