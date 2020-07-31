import * as Yup from 'Yup';
import Store from '../models/Store';

class StoreController {

  async index(req, res) {
    const user_id = req.userId;
    const stores = await Store.findAll({ where: { user_id } });
    return res.json({ stores });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;
    const user_id = req.userId;

    const store = await Store.create({ name, user_id });

    if (!store) {
      return res.send(500);
    }

    return res.json({ message: 'Store created' });
  }

  async delete(req, res) {
    const { store_id } = req.params;
    const user_id = req.userId;

    await Store.destroy({ where: { user_id, id: store_id } });

    return res.json({ message: 'Store deleted' });
  }
}

export default new StoreController();
