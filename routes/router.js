const express = require('express')
const taskController = require('../controller/taskController')
const router = express.Router()

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/tasks',taskController.getTasks)

/**
 * @swagger
 * /addblog:
 *   post:
 *     summary: Create a new task
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               due_date:
 *                 type: date
 *               status:
 *                  type: bool
 *             required:
 *               - title
 *               - desc
 *               - due_date
 *               - status
 *  
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 */
router.post('/addtask',taskController.addTask)

/**
 * @swagger
 * /edittask/{id}:
 *   put:
 *     summary: Update an existing task
 *     
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int
 *         description: ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               due_date:
 *                 type: date
 *               status:
 *                 type: bool
 *             required:
 *               - title
 *               - content
 *               - status
 *               - due_date
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 */
router.put("/edittask/:id", taskController.editTask)

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *    
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int
 *         description: task ID to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id",taskController.deleteTask)

module.exports = router;