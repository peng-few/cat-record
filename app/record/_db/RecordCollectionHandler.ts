import { CollectionHandler } from "@/_db";
import { Record } from "../_consts/RecordSchema";
import { Override, Pagination, WithStringId } from "@/_types";
import { type WithId } from "mongodb";
import objectIdToString from "@/_lib/obectIdToString";

export interface RecordDiary {
  _id: string,
  totalWater: number,
  totalEnergy: number,
  count: number,
  records: WithStringId<Record>[]
}

export interface RecordDiaries extends Pagination {
  data: RecordDiary[],
}

type dbRecordDiary = Override<RecordDiary, { records: WithId<Record>[] }>
type dbRecordDiaries = {
  data: dbRecordDiary[],
  pagination: [{total: number}]
}

export class RecordCollectionHandler extends CollectionHandler<Record>{
  async getRecordDiary({ page = 1, pageSize = 20 }): Promise<RecordDiaries> {
   
    const collection = await this.getCollection();
    const skip = (page - 1) * pageSize
    const findCursors = collection.aggregate<dbRecordDiaries>([
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
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: pageSize }],
          pagination: [
            {
              $count: 'total'
            },
          ]
        }
      },
    ])
    const {data:diaries,pagination} = await findCursors.next() as dbRecordDiaries;

    const diariesWithStringId= diaries.map(diary => ({
        ...diary,
        records: diary.records.map(objectIdToString)
      })
    )

    findCursors.close();
    return {
      data: diariesWithStringId,
      pagination: {
        ...pagination[0],
        page,
        pageSize,
      }
    }
  }
}