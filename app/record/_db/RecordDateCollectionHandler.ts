import { CollectionHandler } from "@/_db";
import { RecordDate } from "../_consts/RecordDateSchema";

export class RecordDateCollectionHandler extends CollectionHandler<RecordDate>{
  async upsertData({date}:RecordDate) {
    const collection = await this.getCollection();
    return collection.findOneAndUpdate(
      { date },
      { $set: {date} },
      { upsert: true }
    )
  }
}