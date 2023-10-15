import { unstable_cache } from 'next/cache'
import { Collection } from '.'
import { WithStringId, Pagination,Override } from '@/_types'
import { Record } from './schema/RecordSchema'
import { type WithId } from 'mongodb'
import objectIdToString from '@/_lib/obectIdToString'

export interface RecordDiary {
  _id: string,
  totalWater: number,
  totalEnergy: number,
  count: number,
  records: WithStringId<Record>[]
}

export interface RecordDiaries {
  data: RecordDiary[],
  pagination: Pagination,
}

type dbRecordDiary = Override<RecordDiary, { records: WithId<Record>[] }>

export const getRecordDiary = unstable_cache(async ({ page = 1, pageSize = 20 }):Promise<RecordDiaries> => {
  const diaries = await Collection.paginate<dbRecordDiary[]>({
    page,
    pageSize,
    pipeline: [{
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$date'
          }
        },
        records: {
          $push: "$$ROOT"
        },
        totalWater: {
          $sum: '$totalWater'
        },
        totalEnergy: {
          $sum: '$energy'
        },
      }
    },
    {
      $sort: { _id: -1 }
    }]
  })

  const diariesWithStringId= diaries.data?.map(diary => ({
      ...diary,
      records: diary.records.map(objectIdToString)
    })
  )

  return {
    ...diaries,
    data: diariesWithStringId || [],
  }
},undefined,{tags: ['records']})