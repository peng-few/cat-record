import { unstable_cache } from 'next/cache'
import { Record } from './schema/RecordSchema'
import { Collection } from '.'
import { WithStringId } from '@/_types'
import dayjs from 'dayjs'

export interface DailyRecord {
  date: string,
  list: (WithStringId<Record>)[],
  totalWater: number,
  totalEnergy: number,
}

export const getRecords = unstable_cache(async ({ date }:{date:string}) => {
  try {
    const records = await Collection.getDatas([{
      $match: {
        date: {
          "$gte": dayjs(date).toDate(),
          "$lt": dayjs(date).add(1, 'day').toDate()
        }
      }
    }])
    return records
  } catch (msg) {
    return []
  }
},undefined,{tags: ['records']})