import { model, Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId
const commentSchema = new Schema({
    blog: {type: ObjectId, ref: 'blogs', required: true},
    name: {type: String, required: true},
    content: {type: String, required: true},
    isApproved: {type: Boolean, default:false}
}, { timestamps: true });

const CommentDB = model("Comments", commentSchema);

export default CommentDB;