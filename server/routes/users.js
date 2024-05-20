const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')

// GET /users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

// GET /users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [{ model: Page }]
    })

    if (!user) {
      res.status(404)
      next()
    } else {
      res.send(user)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:name', async (req, res, next) => {
  try {
    const authorName = req.params.name;

    const user = await User.findOne({
      where: {
        name: authorName,
      },
    });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router
