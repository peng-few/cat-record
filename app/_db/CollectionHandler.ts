import { Collection, BSON,Sort,Condition,Filter, ObjectId, OptionalUnlessRequiredId, WithId} from "mongodb";
import clientPromise from "./db";
import objectIdToString from "@/_lib/obectIdToString";

export class CollectionHandler<TEntity extends BSON.Document> {
  collectionName;
  collection?: Collection<TEntity>;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getCollection() {
    if (this.collection) return this.collection;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    this.collection = db.collection<TEntity>(this.collectionName);

    return this.collection
  }

  async addData(data: OptionalUnlessRequiredId<TEntity>) {
    const collection = await this.getCollection()
    const result = await collection.insertOne(data);
    return {...data,_id:result.insertedId}
  }

  async updateData(id: string, data: TEntity) {
    const collection = await this.getCollection()
    const query = { _id: new ObjectId(id) } as Filter<TEntity>
    return collection.updateOne(
      query,
      {
        $set: data,
      },
    );
  }

  async deleteData(id: string) {
    const collection = await this.getCollection()
    const query = { _id: new ObjectId(id) } as Filter<TEntity>
    return collection.deleteOne(query);
  }

  async getDatas(pipeline: BSON.Document[]) {
    try {
      const collection = await this.getCollection()
      const cursor = await collection.aggregate<WithId<TEntity>>(pipeline)
      const list = await cursor.map(objectIdToString).toArray();
      cursor.close();
      return list
    } catch (msg) {
      console.log('失敗')
      console.log(msg)
      return []
    }
  }

  async getData(id: string) {
    const collection = await this.getCollection()
    const query = { _id: new ObjectId(id) } as Filter<TEntity>
    return collection.findOne(query)
  }
}

export default CollectionHandler;