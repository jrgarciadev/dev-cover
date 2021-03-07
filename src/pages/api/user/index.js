import { isEmpty } from 'lodash';
import { toLowerCase } from '@utils';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      console.log('[GET] /api/user');
      try {
        const users = await User.find({}); /* find all the data in our database */
        return res.status(200).json({ success: true, data: users });
      } catch (error) {
        console.error(error.message);
        return res.status(400).json({ success: false });
      }
    case 'POST':
      try {
        console.log('[POST] /api/user');
        const { body: userBody } = req;
        // Make sure this account doesn't already exist
        const userExists = await User.findOne({
          username: toLowerCase(userBody.username),
        });
        if (!isEmpty(userExists)) {
          userBody.updated = new Date();
          await userExists.updateOne(userBody);
          return res.status(201).json({ success: true, data: userExists });
        }
        /* create a new model in the database */
        const userInstance = new User(userBody);
        const user = await userInstance.save();
        return res.status(201).json({ success: true, data: user });
      } catch (error) {
        console.error(error.message);
        return res.status(400).json({ success: false, message: error.message });
      }
    default:
      return res.status(400).json({ success: false });
  }
}
