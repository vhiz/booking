const { allUsersLog, userLog } = require("../controllers/userlog");

const router = require("express").Router();


router.get('/', allUsersLog)

router.get('/:id', userLog)
module.exports = router;
