const router = require('express').Router();
const { Category, Interest, User } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Interest,
                    attributes: ['id','body'],
                    include: [
                        {
                            model: Category,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        const user = userData.get({ plain: true });

        return res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [affectedRows] = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (affectedRows > 0) {
            res.status(200).end();
          } else {
            res.status(404).end();
          }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            description: req.body.description,
            gender: req.body.gender,
            age: req.body.age
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.email;
            req.session.loggedIn = true;

            res.json(newUser);
        })
    } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        const isValid = user.checkPassword(req.body.password);

        if (!isValid){
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.email;
            req.session.loggedIn = true;

            res.json({ user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json({ message: 'No user account found!' });
      }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;
