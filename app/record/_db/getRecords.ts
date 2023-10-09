import { unstable_cache } from 'next/cache'
import { Record } from '../_consts/RecordSchema'
import { RecordDateCollection,Collection } from '.'
import dayjs from 'dayjs'
import { WithStringId } from '@/_types'

export interface DailyRecord {
  date: string,
  list: (WithStringId<Record>)[],
  totalWater: number,
  energy: number,
}

export const getRecords = unstable_cache(async ({ page = 1 }) => {
  try {
    const dateCollection = await RecordDateCollection.getCollection()
    const findCursors = await dateCollection .find({}).sort({ date: -1 }).limit(20)
    const DailyRecordPomises = await findCursors.map(async (doc) => {
      const list = await Collection.getDatas(
        {
          date: {
            "$gte": dayjs(doc.date).toDate(),
            "$lt": dayjs(doc.date).add(1, 'day').toDate()
          }
        })

      const { totalWater, energy } = list.reduce((accu, record) => (
        {
          totalWater: accu.totalWater + record.totalWater,
          energy: accu.energy + record.energy
        }
      ), { totalWater: 0, energy: 0 })

      return {
        date: doc.date,
        list,
        totalWater,
        energy,
      }
    }).toArray()

    const dailyRecords = await Promise.all(DailyRecordPomises)
    findCursors.close();
    return dailyRecords
  } catch (msg) {
    return []
  }
},undefined,{tags: ['records']})