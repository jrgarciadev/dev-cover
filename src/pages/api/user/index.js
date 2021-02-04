import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}); /* find all the data in our database */
        return res.status(200).json({ success: true, data: users });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case 'POST':
      try {
        const { body: userBody } = req;
        // Make sure this account doesn't already exist
        const userExists = await User.findOne({
          username: userBody.username,
        });
        if (userExists) {
          userExists.updated = new Date();
          await userExists.updateOne(userBody);
          return res.status(201).json({ success: true, data: userExists });
        }
        /* create a new model in the database */
        const userInstance = new User(userBody);
        const user = await userInstance.save();
        // const user = await User.create(userBody); /* create a new model in the database */
        return res.status(201).json({ success: true, data: user });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    default:
      return res.status(400).json({ success: false });
  }
}
