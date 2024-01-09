import Dexie from 'dexie';
import type { IFormState } from '~/interface';



class MyDatabase extends Dexie {
  myObjectStore: Dexie.Table<IFormState, number>;

  constructor() {
    super('myDatabase');

    // Определение структуры базы данных
    this.version(1).stores({
      myObjectStore: '++id, name',
    });

    // Инициализация хранилища объектов
    this.myObjectStore = this.table('myObjectStore');
  }
}

const db = new MyDatabase();
function prepareDataForStorage(data: IFormState): IFormState {
  return JSON.parse(JSON.stringify(data));
}
export const addDataToIndexedDB = async (data: IFormState): Promise<number> => {
  try {
    const serializableData = prepareDataForStorage(data);
    const addedItemId = await db.myObjectStore.add(serializableData);
    return addedItemId;
  } catch (error) {
    console.error('Error adding object to the store', error);
    throw error;
  }
};

export const getAllDataFromIndexedDB = async (): Promise<IFormState[]> => {
  try {
    const result = await db.myObjectStore.toArray();
    return result;
  } catch (error) {
    console.error('Error retrieving data from the store', error);
    throw error;
  }
};

export const clearIndexedDB = async (): Promise<void> => {
  try {
    await db.myObjectStore.clear();
  } catch (error) {
    console.error('Error clearing IndexedDB', error);
    throw error;
  }
};

export const arrayLength = async () => {
  try {
    const length = await db.myObjectStore.count();
    return length
  } catch (error) {
    console.error('Error getting array length', error);
  }
};
export const updateDataInIndexedDB = async (id: any, newData: IFormState): Promise<void> => {
  try {
    const serializableData = prepareDataForStorage(newData);
    await db.myObjectStore.update(id, serializableData);
  } catch (error) {
    console.error('Error updating object in the store', error);
    throw error;
  }
};



export default db;
