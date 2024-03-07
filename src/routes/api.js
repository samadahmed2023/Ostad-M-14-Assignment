const express = require("express");
const ProfileController = require("../controller/ProfileController");
const authVerifyMiddleware = require("../middleware/authVerifyMiddleware");
const TodoListController = require("../controller/TodoListController");


const router = express.Router();


router.post("/CreateProfile", ProfileController.CreateProfile);
router.post("/UserLogin", ProfileController.UserLogin);


router.get("/SelectProfile", authVerifyMiddleware, ProfileController.SelectProfile);
router.post("/UpdateProfile", authVerifyMiddleware, ProfileController.UpdateProfile);
router.post("/CreateTodo", authVerifyMiddleware, TodoListController.CreateTodo);
router.get("/SelectTodo", authVerifyMiddleware, TodoListController.SelectTodo);
router.post("/UpdateTodo", authVerifyMiddleware, TodoListController.UpdateTodo);
router.post("/UpdateStatusTodo", authVerifyMiddleware, TodoListController.UpdateStatusTodo);
router.post("/RemoveTodo", authVerifyMiddleware, TodoListController.RemoveTodo);
router.get("/SelectTodoByStatus", authVerifyMiddleware, TodoListController.SelectTodoByStatus);
router.get("/SelectTodoByDate", authVerifyMiddleware, TodoListController.SelectTodoByDate);


module.exports = router;