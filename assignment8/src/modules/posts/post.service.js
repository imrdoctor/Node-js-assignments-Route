import { commentModel } from "../../DB/models/comment.model.js";
import { postModel } from "../../DB/models/posts.model.js"
import { userModel } from "../../DB/models/user.model.js"




export const createPost = async (req, res, next) => {
    try {
        const { title, content, id } = req.body;
        if (!title || !content || !id) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await userModel.findOne({ where: { id } });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const post = await postModel.create({
            title,
            content,
            userId: user.id
        });
        res.status(201).json({ message: "Post created successfully", post });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while creating the post", error: err.message });
    }
}



export const getallPosts = async (req, res, next) => {
    try {
        const count = await postModel.count(); // يجلب عدد البوستات

        if (count === 0) {
            return res.status(200).json({ message: "No posts found", postsCount: 0 });
        } else {
            const posts = await postModel.findAll(); // يجلب جميع البوستات إذا أردت عرضها أيضاً
            return res.status(200).json({ postsCount: count, posts: posts });
        }
    } catch (err) {
        return res.status(500).json({ error: "An error occurred while retrieving posts", details: err });
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.body;
        const post = await postModel.findOne({ where: { id } });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        await postModel.destroy({ where: { id } });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.log(err);

        return res.status(500).json({ error: "An error occurred while deleting the post", details: err });
    }
}



// Retrieve the 3 most recent comments for a specific post, ordered by creation date.

export const getPostDetails = async (req, res, next) => {
    try {
        const { word } = req.query;
        // check if have post with id or no
        const post = await postModel.findOne({
            where: { id },
            include: [
                { model: userModel, as: "user", attributes: ["id", "name"] },
            ],
        });

        const comments = await commentModel.findAll({
            where: { postId: id },
            include: [
                { model: userModel, as: "user", attributes: ["id", "name"] },
            ],
            order: [["createdAt", "DESC"]],
        });

        // get comments count 
        const commentsCount = await commentModel.count({
            where: { postId: id },
        })
        
        const postDetails = {
            postId: post.id,
            title: post.title,
            user: {
                userId: post.userId,
                userName: post.user?.name || "Unknown User",
            },
            comments: comments.map((comment) => (
                [{
                    commentId: comment.id,
                    content: comment.content,
                    userId: comment.userId,
                    userName: comment.user?.name || "Unknown User",
                }]
            )),
        };
        res.status(200).json({commentsCount , postDetails});

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "An error occurred while retrieving the post details",
            details: err.message || err,
        });
    }
}


// Post Comment Count

export const getPostCommentCount = async (req, res, next) => {
    try {
        const { id } = req.params;
        // get id + title + comment count
        const post = await postModel.findOne({
            where: { id },
            include: [
                { model: userModel, as: "user", attributes: ["id", "name"] },
                { model: commentModel, as: "comments", attributes: ["id", "content"] }
            ]
        })
        const title = post.title
        const comments = post.comments.length;
        const post_data = [{
            id,
            title,
            comments,
        }]
        res.status(200).json(post_data);

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "An error occurred while retrieving the post comment count",
        })
    }
}
