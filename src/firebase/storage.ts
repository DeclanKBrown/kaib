import app from "./config"
import { getStorage, ref, listAll } from "firebase/storage"

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