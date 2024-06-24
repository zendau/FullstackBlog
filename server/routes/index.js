import { Router } from "express"

import adminRoute from "./admin.route.js"
import commentRoute from "./comment.route.js"
import fileRoute from "./file.route.js"
import postRoute from "./post.route.js"
import reactionRoute from "./reaction.route.js"
import userRoute from "./user.route.js"

const router = Router()

router.use("/user", userRoute)
router.use("/post", postRoute)
router.use("/file", fileRoute)
router.use("/comment", commentRoute)
router.use("/admin", adminRoute)
router.use("/reaction", reactionRoute)

export default router
