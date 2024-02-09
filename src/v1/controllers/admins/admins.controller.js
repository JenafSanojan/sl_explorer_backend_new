const admin = require('firebase-admin');

const setAdmin = async (req, res) => { 
    const { uid } = req.body; 
    const claims = { admin: true }; 

  try {
    await admin.auth().setCustomUserClaims(uid, claims);
    res.status(200).json({ message: 'Custom claims added to the user successfully' });
  } catch (error) {
    console.error('Error adding custom claims:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}; 

module.exports = { setAdmin };