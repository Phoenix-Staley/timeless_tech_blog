const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.post('/login', async (req, res) => {
    try {
        // Find the user who matches the posted e-mail address
        const user_data = await User.findOne({ where: { email: req.body.email } });

        if (!user_data) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Verify the posted password with the password store in the database
        const valid_password = await user_data.check_password(req.body.password);

        if (!valid_password) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Create session variables based on the logged in user
        req.session.save(() => {
            req.session.user_id = user_data.id;
            req.session.logged_in = true;
            
            res.json({ user: user_data, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // Remove the session variables
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post("/sign_up", async (req, res) => {
    try {
        const taken_email = await User.findOne({ where: { email: req.body.email } });
        const taken_username = await User.findOne({ where: { username: req.body.username } });
        const user_data = await User.create(req.body);
    
        req.session.save(() => {
            req.session.user_id = user_data.id;
            req.session.logged_in = true;
        
            res.status(200).json(user_data);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;