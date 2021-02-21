import dbConnect from '../../../lib/mongodb';
import Repo from '../../../models/Repo';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const repo = await Repo.findOne({ id });
        if (!repo) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: repo });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    case 'POST':
      try {
        const { body: repoBody } = req;
        const repoExists = await Repo.findOne({
          id,
        });
        if (repoExists) {
          repoExists.updated = new Date();
          await repoExists.updateOne(repoBody);
          return res.status(201).json({ success: true, data: repoExists });
        }
        /* create a new model in the database */
        const repoInstance = new Repo(repoBody);
        const repo = await repoInstance.save();
        return res.status(201).json({ success: true, data: repo });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    case 'PUT' /* Edit a model by its ID */:
      try {
        const { body: repoBody } = req;
        const repoExists = await Repo.findOne({
          id,
        });
        if (!repoExists) {
          return res.status(400).json({ success: false, message: 'Repo does not exists' });
        }
        repoExists.updated = new Date();
        await repoExists.updateOne(repoBody);
        return res.status(200).json({ success: true, data: repoExists });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    default:
      return res.status(400).json({ success: false });
  }
}
