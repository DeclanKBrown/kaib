'use server'

import app from "./config"
import { getStorage, ref, listAll, uploadBytes } from "firebase/storage"

const storage = getStorage(app)

const storageRef = ref(storage)

//List all files
export const getFileList = async () => {
    try {
      const result = await listAll(storageRef)
      const fileList = result.items.map((item) => item.name)
      return fileList
    } catch (error) {
      console.error("Error listing files:", error)
      throw error
    }
  }

//Upload files
export const uploadFirebaseFile = async (file: File) => {
    const uploadRef = ref(storage, file.name)
    await uploadBytes(uploadRef, file)
}