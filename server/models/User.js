import { model, Schema } from "mongoose"

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const UserDb = model("users", userSchema)

export default UserDb;