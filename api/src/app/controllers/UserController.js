import User from '../models/User';
import * as Yup from 'Yup';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    if (!user) {
      return res.send(500);
    }

    return res.json({ message: 'User created', id: user.id });
  }
}

export default new UserController();
