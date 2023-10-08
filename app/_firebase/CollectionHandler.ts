import { AnyObject, errorResponse, successResponse } from "../_lib";
import { db } from "./db";
import { collection as firbaseCollection, addDoc,query, where, getDocs,limit } from "firebase/firestore";

export class CollectionHandler<Field extends AnyObject> {
  collectionName;
  collection;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.collection = firbaseCollection(db,collectionName)
  }

  async addData(data: Field) {
    try {
      await addDoc(this.collection, data)
      return successResponse()
    } catch (msg) {
      return errorResponse({msg})
    }
  }

  async getAllData() {
    try {
      const snapshot = await getDocs(this.collection)
      const list = snapshot.docs.map((doc) => doc.data())
      return list as Field[]
    } catch (msg) {
      return []
    }
  }

  async getDocById(id: string|number){
    const q = query(this.collection, where("id", "==", id), limit(1));
    const querySnapshot = await getDocs(q); 
    return querySnapshot.docs[0]
  }
}

export default CollectionHandler;