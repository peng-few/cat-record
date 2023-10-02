import { unstable_cache } from 'next/cache'
import { Collection, FieldRecord } from "./spec"
import { getDocs,orderBy,query } from 'firebase/firestore'
import { OverrideTimestamp} from '@/_lib'

export interface GetRecordsType {
  id: string,
  list: (FieldRecord & {groupId: string})[],
  totalWater: number,
  energy: number,
}

export const getRecords = unstable_cache(async ({ page = 1 }) => {
  try {
    const snapshot = await getDocs(query(Collection.collection,orderBy("id", "desc")))

    return await Promise.all(snapshot.docs.map(async (doc) => {
      const snap = await Collection.getDocs(doc.id)

      const data = snap.docs.reduce((accu:GetRecordsType,subDoc) => {
        const rawRecord = subDoc.data() as OverrideTimestamp<FieldRecord,'date'>

        return {
          ...accu,
          list: [...accu.list, {
            ...rawRecord,
            date: rawRecord.date.toDate(),
            groupId: doc.id
          }],
          totalWater: accu.totalWater + rawRecord.totalWater,
          energy: accu.energy + rawRecord.energy,
        }
      },
      {
        id: doc.id,
        list: [],
        totalWater: 0,
        energy: 0,
      })

      return data
    }))

  } catch (msg) {
    return []
  }
},undefined,{tags: ['records']})