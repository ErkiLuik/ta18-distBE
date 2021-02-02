const express = require('express')
const admin = require("firebase-admin");
const router = express.Router()

router.get('/cars', (req, res) => {
  carGET().then((firestoreData) => {
    res.send(firestoreData);
  })
})

router.post('/car', (req, res, next) => {
  carPOST(req.body).then((firestoreData) => {
    res.send(firestoreData);
  })
})

router.delete('/car/:id', (req, res, next) => {
  carDELETE(req.params.id).then((firestoreData) => {
    res.sendStatus(firestoreData);
  })
})

const carGET = function () {
  return new Promise(async function (resolve, reject) {
    // #1 Read
    const carCollection = admin.firestore().collection('cars');

    // #2 Read
    const docs = await carCollection.listDocuments();

    let docPromises = [];
    docs.forEach(async doc => {
      // Add all document read promises into single array
      docPromises.push(doc.get())
    });

    // #3 Read - multiple reads in parallel, x1 read per document
    let docSnapshots = await Promise.all(docPromises);
    let finalData = [];
    docSnapshots.forEach(snap => {
      // #4 Read - for each document snapshot read data
      let snapshotData = snap.data();
      snapshotData['id'] = snap.id;
      finalData.push(snapshotData);
    });

    if (finalData.length > 0) {
      resolve(finalData);
    } else {
      resolve();
    }
  });
}

const carPOST = function (body) {
  return new Promise(async function (resolve, reject) {
    const carCollection = admin.firestore().collection('cars');

    const newDoc = await carCollection.add(body);
    const docSnap = newDoc.get();
    resolve((await docSnap).data());
  });
}

const carDELETE = function (id) {
  return new Promise(async function (resolve, reject) {
    await admin.firestore().collection('cars').doc(id).delete();
    resolve(200);
  });
}

module.exports = router;