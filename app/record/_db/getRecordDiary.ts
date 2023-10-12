import { unstable_cache } from 'next/cache'
import { Collection } from '.'
import { RecordDiaries } from './RecordCollectionHandler'


export const getRecordDiary = unstable_cache(async ({ page }):Promise<RecordDiaries> => {
  try {
    const recordDiary = await Collection.getRecordDiary({page})
    return recordDiary
  } catch (msg) {
    console.log(msg)
    return {
      data: [],
      pagination: {
        page,
        pageSize: 0,
        total: 0
      }
    }
  }
},undefined,{tags: ['records']})