import firestore from "@react-native-firebase/firestore";

export function storeLifafa(walletPublicKey, id, transaction_hash, type) {
  if (!walletPublicKey) {
    return;
  }
  id = String(id);
  try {
    firestore()
      .collection("users")
      .doc(walletPublicKey.toString())
      .collection(type) // created or sent
      .doc(id)
      .set({
        id,
        transaction_hash,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error("storeCreateLifafa: ", error);
  }
}

export function retrieveLifafa(walletPublicKey, setData, type) {
  if (!walletPublicKey) {
    return null;
  }
  try {
    return firestore()
      .collection("users")
      .doc(walletPublicKey.toString())
      .collection(type)
      .orderBy("timestamp", "desc")
      .onSnapshot((docs) => {
        let tmpData = [];
        docs.forEach((doc) => {
          tmpData.push(doc.data().id);
        });
        setData(tmpData);
      });
  } catch (error) {
    console.error("retrieveLifafa: ", error);
    return null;
  }
}
