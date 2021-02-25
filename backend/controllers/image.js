const Clarifai = require('clarifai');


const app = new Clarifai.App({
  apiKey: process.env.API_KEY
});

const handleImageAPI = () => (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('Error With API...'))
}

const handleImage = (db) => (req, res) => {
  const {id} = req.body;
  db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    entries.length
    ? res.json(entries[0])
    : res.status(400).json('User Not Found...');
  })
  .catch(err => res.status(404).json('Error Getting Entries...'));
}

module.exports = {
  handleImage,
  handleImageAPI
};