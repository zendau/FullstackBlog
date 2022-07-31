/**
 * @swagger
 * components:
 *   DTOs:
 *     postData:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: user's email
 *         id:
 *           type: ObjectId
 *           description: user's ObjectId
 *         isActivated:
 *           type: boolean
 *           description: user's isActivated status
 *         rating:
 *           type: array
 *           items: [likesPercent, dislikesPercent]
 *           description: access JWT
 *         comments:
 *          type: array
 *          items:
 *            id: ObjectId
 *            userId: ObjectId
 *            message: string
 *            edited: boolean
 *         reactions:
 *          type: array
 *          items:
 *           id: ObjectId
 *           postTitle: string
 *           postId: ObjectId       
 *       example:
 *         email: root@gmail.com
 *         id: 62c7234d9f3f1739381f93c4
 *         isActivated: true
 *         rating:
 *          type: array
 *          items: [4, 6]
 *         comments:
 *          type: array
 *          items:
 *            id: 62e1906c838cfe163ca4c42f
 *            userId: 62d717847a2c15105c1a20d6
 *            message: test
 *            edited: false
 *         reactions:
 *          type: array
 *          items:
 *            id: 62e1906c838cfe163ca4c42f
 *            postTitle: title
 *            postId: 62d717847a2c15105c1a20d6
 */


