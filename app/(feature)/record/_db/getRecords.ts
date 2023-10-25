import { unstable_cache } from 'next/cache'
import { Record } from './schema/RecordSchema'
import { Collection } from '.'
import { WithStringId } from '@/_types'
import dayjs from 'dayjs'
import { getUserSession } from '@/auth/_lib/getUserSession'

export interface DailyRecord {
  date: string,
  list: (WithStringId<Record>)[],
  totalWater: number,
  totalEnergy: number,
}

export const getRecords = unstable_cache(async ({ date }:{date:string}) => {
  try {
    const session = await getUserSession();
    if (!session?.user) throw new Error('please login')
  
    const records = await Collection.getDatas([{
      $match: {
        date: {
          "$gte": dayjs(date).toDate(),
          "$lt": dayjs(date).add(1, 'day').toDate()
        },
        user: session.user._id
      }
    }])
    return records
  } catch (msg) {
    return []
  }
},undefined,{tags: ['records','auth']})