import { AnyObject, WithoutId, errorResponse, successResponse } from "../_lib";
import { db } from "./db";
import { collection as firbaseCollection, addDoc,getDoc, getDocs, setDoc, doc, updateDoc, deleteDoc, query, where, QueryFieldFilterConstraint, and } from "firebase/firestore";

export class CollectionHandler<Field extends AnyObject> {
  collectionName;
  collection;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.collection = firbaseCollection(db,collectionName)
  }

  async addData(data: Omit<Field,'id'>) {
    try {
      const docRef = await addDoc(this.collection, data)
      const dataWithId = { id: docRef.id, ...data}
      await setDoc(docRef, dataWithId)
      
      return successResponse({data: dataWithId})
    } catch (msg) {
      return errorResponse({msg})
    }
  }

  updateData(id:string,data: Field | WithoutId<Field>) {
    const docRef = doc(this.collection, id);

    return updateDoc(docRef, { ...data, id })
  }

  deleteData(id:string) {
    const docRef = doc(this.collection, id)
    return deleteDoc(docRef)
  }

  async getDatas(queries:QueryFieldFilterConstraint[] = []) {
    try {
      const q1 = query(this.collection,...queries);
      const snapshot = await getDocs(q1)
      const list = snapshot.docs.map((doc) => doc.data())
      return list as Field[]
    } catch (msg) {
      return []
    }
  }

  async getData(id:string) {
    const docRef = doc(this.collection, id)
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Field
  }
}

export default CollectionHandler;