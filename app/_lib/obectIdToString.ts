import { type MongoId } from "@/_types"
import { WithStringId } from "@/_types"

export function objectIdToString<TData extends { _id: MongoId }>
  (data: TData):WithStringId<TData> {
    return {
      ...data,
      _id: data._id.toHexString()
    }
  }

  export default objectIdToString