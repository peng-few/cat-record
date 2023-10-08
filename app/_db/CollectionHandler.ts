import { Collection, Filter, ObjectId, OptionalId, OptionalUnlessRequiredId, WithId} from "mongodb";
import { AnyObject } from "../_lib";
import clientPromise from "./db";

export class CollectionHandler<TEntity extends AnyObject> {
  collectionName;
  collection?: Collection<TEntity>;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  private async getCollection() {
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

  async updateData(id: string, data: OptionalUnlessRequiredId<TEntity>) {
    const collection = await this.getCollection()
    return collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          data,
          _id: new ObjectId(id)
        },
      },
    );
  }

  async deleteData(id: string) {
    const collection = await this.getCollection()
    return collection.deleteOne({_id: new ObjectId(id)});
  }

  async getDatas(queries:Filter<WithId<TEntity>>) {
    try {
      const collection = await this.getCollection()
      const cursor = await collection.find(queries)
      const list = await cursor.toArray();
      return list
    } catch (msg) {
      console.log('失敗')
      console.log(msg)
      return []
    }
  }

  async getData(id: string) {
    const collection = await this.getCollection()
    return collection.findOne({_id: new ObjectId(id)})
  }
}

export default CollectionHandler;