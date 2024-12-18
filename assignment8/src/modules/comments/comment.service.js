import { commentModel } from "../../DB/models/comment.model.js"
import { postModel } from "../../DB/models/posts.model.js";
import { userModel } from "../../DB/models/user.model.js";
import { Op }  from "sequelize";

export const getallcomments = async (req, res, next) => {
    const comments = await commentModel.findAll()
}

export const createBulkComments = async (req, res, next) => {
    try {
        const commentsData = req.body.comments; 

        if (!commentsData || !Array.isArray(commentsData) || commentsData.length === 0) {
            return res.status(400).json({ message: "No comments data provided" });
        }

        const validatedComments = [];
        for (const comment of commentsData) {
            const { content, postId, userId } = comment;

            if (!content || !postId || !userId) {
                return res.status(400).json({ message: "Invalid comment data. Each comment must have content, postId, and userId." });
            }
            const postExists = await postModel.findByPk(postId);
            if (!postExists) {
                return res.status(404).json({ message: `Post with ID ${postId} not found` });
            }
            const userExists = await userModel.findByPk(userId);
            if (!userExists) {
                return res.status(404).json({ message: `User with ID ${userId} not found` });
            }
            validatedComments.push({ content, postId, userId });
        }
        await commentModel.bulkCreate(validatedComments);
        return res.status(201).json({ message: "Comments created successfully"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while creating comments" });
    }
};


export const updateComment = async (req, res, next) => {
    try{
        const { commentId } = req.params;
        const { content , userId } = req.body;
        const comment = await commentModel.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: `Comment with ID ${commentId} notfound` });
        }
        if (comment.userId !== userId) {
            return res.status(403).json({ message: "You are not the owner of this comment" });
        }
        if (!content) {
            return res.status(400).json({ message: "Content is required to update a comment"});
        }
        await comment.update({ content });
        return res.status(200).json({ message: "Comment updated successfully" });
    }catch(err){
        return res.status(500).json({ error: "An error occurred while updating the comment"})
    }

}


export const findOrCreateComment = async (req, res, next) => {
    try {
        const { postId, userId, content } = req.body;

        if (!postId || !userId || !content) {
            return res.status(400).json({ message: "postId, userId, and content are required" });
        }

        const [comment, created] = await commentModel.findOrCreate({
            where: { postId, userId, content },
            defaults: { postId, userId, content } 
        });

        if (created) {
            return res.status(201).json({ message: "New comment created successfully", comment });
        } else {
            return res.status(200).json({ message: "Comment already exists", comment });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "An error occurred while finding or creating a comment",
            details: err.message
        });
    }
};



export const searchWord = async(req, res, next) => {
    try {
        const { word } = req.query;
        if(!word) {
            return res.status(400).json({ message: "Word is required" });
        }
        const comments = await commentModel.findAll({
            where: {
                content: { [Op.like]: `%${word}%` }
            }
        })
        if(comments.length === 0) {
            return res.status(404).json({ message: "No comments found with that word" });
        }
        return res.json({count:comments.length, message: "Search results", comments });
    }catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while searching comments" });
    }
}
export const newest = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await commentModel.findAll({
            where: { postId },
            attributes: ['content', 'createdAt'],
            order: [
                ['createdAt', 'DESC'] 
            ],
        });
        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this post" });
        }
        return res.json({ count: comments.length, message: "Comments for this post", comments });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while searching comments" });
    }
};



export const getcommentDetils = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            return res.status(400).json({ message: "commentId Is required" });
        }
        const id = commentId;
        const commentDetils = await commentModel.findOne({
            where: { id },
            include: [
                {
                    model: userModel,
                    as: "user",
                    attributes: ["id", "name", "email"]
                },
                {
                    model: postModel,
                    as: "post",
                    attributes: ["id", "title", "content"]                
                }
            ],
            attributes: ["id", "content"],
        });
        if (!commentDetils) {
            return res.status(404).json({ message: `Comment with ID ${commentId} not found` });
        }
        return res.json({ comment: commentDetils });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "An error occurred while finding or creating a comment",
            details: err.message
        });
    }
};