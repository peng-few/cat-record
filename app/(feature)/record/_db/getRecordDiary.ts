import { Collection } from '.'
import { WithStringId, Pagination,Override } from '@/_types'
import { Record } from './schema/RecordSchema'
import { type WithId } from 'mongodb'
import objectIdToString from '@/_lib/obectIdToString'
import { getUserSession } from '@/auth/_lib/getUserSession'

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

export const getRecordDiary = async ({ page = 1, pageSize = 20 }): Promise<RecordDiaries> => {
  try {
    const session = await getUserSession();
    if (!session?.user) throw new Error('please login')

    const diaries = await Collection.paginate<dbRecordDiary[]>({
      page,
      pageSize,
      pipeline: [
        {
          $match: {
            user: session.user._id
          }
        },
        {
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
  } catch (error) {
    return {
      data: [],
      pagination: {
        page: 1,
        pageSize: 0,
        total: 0,
      }
    }
  }

}