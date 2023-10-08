import { getDoc,doc,updateDoc } from 'firebase/firestore';
import { db } from '@/_firebase';
import { AnyObject } from '@/_lib';

export const COLLECTION_NAME = 'serialNumber';

export interface FieldSerialNumber {
  serial: number
}

export async function get(name: string) {
  const docRef = doc(db, COLLECTION_NAME, name);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data()
  return data as FieldSerialNumber;
}

export async function increment(name: string, serial: number) {
  return updateDoc(doc(db, COLLECTION_NAME, name), { serial: serial + 1 });
}

export async function applyId<T extends AnyObject>(name: string,data:T) {
  const{ serial } = await get(name)
  await increment(name,serial)
  return { ...data, id: serial };
}