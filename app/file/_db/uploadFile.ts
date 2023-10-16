import { FileSchema } from "./schema/FileSchema";
import { FileUploadSchema } from "./schema/FileUploadSchema";
import { Collection } from "./Collection";
import { Binary } from "mongodb";

export const uploadFile = async (
  file: File,
  modifyBuffer: (buffer: ArrayBuffer) => Promise<Buffer|ArrayBuffer> = async (buffer) => buffer) => {
  FileUploadSchema.parse({file});

  const buffer = await file.arrayBuffer()
  const modifiedBuffer = await modifyBuffer(buffer)
 
  const view= new Uint8Array(modifiedBuffer)
  const binary = new Binary(view)
  const parseFile = FileSchema.parse({
    filename: file.name,
    type: file.type,
    uploadDate: new Date(),
    size: binary.length(),
    file: binary,
  })

  const {_id }= await Collection.addData(parseFile)
  return _id
}

export default uploadFile