import { type MongoId } from "@/_types"
import { WithStringId } from "@/_types"

export function objectIdToString<TData extends { _id: MongoId | string }>
  (data: TData): TData['_id'] extends MongoId ? WithStringId<TData> : TData {
    return {
      ...data,
      _id: typeof data._id === 'string' ? data._id : data._id.toHexString()
    }
  }

  export default objectIdToString