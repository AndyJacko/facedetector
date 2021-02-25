const handleRoot = (db) => (req, res) => {
  db.select('*')
  .from('users')
  .then(users => {
    users.length
    ? res.json(users)
    : res.status(400).json('No Users Found...');    
  })
  .catch(err => res.status(400).json('Error Getting Users...'));
}

module.exports = {
  handleRoot
};