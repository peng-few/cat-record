import { db } from "@/_firebase";
import { AnyObject, WithoutId, errorResponse, successResponse } from "@/_lib";
import { collection,addDoc, doc, setDoc, query,collectionGroup,where, limit,getDocs, deleteDoc, updateDoc } from "firebase/firestore";

export class SubCollectionHander<Field extends AnyObject>{
  collectionName;
  collection;
  subCollectionName;

  constructor(collectionName: string,subCollectionName: string) {
    this.collectionName = collectionName;
    this.collection = collection(db, collectionName)
    this.subCollectionName = subCollectionName;
  }

  async addData(id:string, data: Omit<Field,'id'>) {
    try {
      const docRef = await addDoc(collection(this.collection, id, this.subCollectionName), data)
      const dataWithId = { id: docRef.id, ...data}
      await setDoc(docRef, dataWithId)
      return successResponse({data})
    } catch (msg) {
      return errorResponse({msg})
    }
  }

  updateData(groupId:string,id:string,data: Field | WithoutId<Field>) {
    const docRef = doc(this.collection,groupId, this.subCollectionName,id);

    return updateDoc(docRef, { ...data, id })
  }

  deleteData(groupId: string, id: string) {
    collectionGroup(db,this.collectionName)
    return deleteDoc(doc(this.collection, groupId, this.subCollectionName,id))
  }

  async getDatas(id: string) {
    try {
      const snapshot = await this.getDocs(id)
      const list = snapshot.docs.map((doc) => doc.data())
      return list as Field[]
    } catch (msg) {
      return []
    }
  }

  async getData(id:string) {
    const docSnap = await this.getDoc(id);
    return docSnap.data() as Field
  }

  async setGroupId(id:string) {
    const docRef = doc(db, this.collectionName, id);
    await setDoc(docRef, {id});
  }

  async getDoc(id:string) {
    const q = query(collectionGroup(db, this.subCollectionName), where('id', '==', id),limit(1));
    const querySnapshot = await getDocs(q); 
    return querySnapshot.docs[0]
  }

  getDocs(id: string) {
    return getDocs(collection(db, this.collectionName, id, this.subCollectionName))
  }
}