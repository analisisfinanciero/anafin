import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { fireStore } from "../firebase/config";

const ResultsService = {
  getAllEarningsByUid: async (email) => {
    const docRef = collection(fireStore, "results");
    const consult = query(docRef, where("email", "==", email));
    const response = getDocs(consult);
    return response;
  },
  insertResults: async (result) => {
    const docRef = doc(fireStore, `results/${result.id}`);
    await setDoc(docRef, result);
    const consult = await getDoc(docRef);
    return consult.data();
  },
  deleteResult: async (id) => {
    const docRef = doc(fireStore, `results/${id}`);
    await deleteDoc(docRef);
    return true;
  },
};
export default ResultsService;
