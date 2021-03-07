import { toLowerCase } from '@utils';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  const {
    query: { username },
    method,
  } = req;

  const formattedUsername = toLowerCase(username);

  await dbConnect();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        console.log(`[GET] /api/user/${formattedUsername}`);
        const user = await User.findOne({ username: formattedUsername });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: user });
      } catch (error) {
        console.error(error.message);
        return res.status(400).json({ success: false, message: error.message });
      }
    case 'PUT' /* Edit a model by its ID */:
      try {
        console.log(`[PUT] /api/user/${formattedUsername}`);
        const { body: userBody } = req;
        // Make sure this account doesn't already exist
        const userExists = await User.findOne({
          username: formattedUsername,
        });
        if (!userExists) {
          return res.status(400).json({ success: false, message: 'User does not exists' });
        }
        userBody.updated = new Date();
        await userExists.updateOne(userBody);
        return res.status(200).json({ success: true, data: userExists });
      } catch (error) {
        console.error(error.message);
        return res.status(400).json({ success: false, message: error.message });
      }
    default:
      return res.status(400).json({ success: false });
  }
}
