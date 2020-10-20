const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.listAllUsers = functions.https.onRequest((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var allUsers = [];
  return admin
    .auth()
    .listUsers()
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        allUsers.push({
          email: userRecord.email,
          lastLogin: userRecord.metadata.lastSignInTime,
        });
      });
      res.status(200).send(JSON.stringify(allUsers));
    })
    .catch(function (error) {
      console.log("Error listing users:", error);
      res.status(500).send(error);
    });
});
