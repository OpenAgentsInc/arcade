import { Database } from 'app/lib/Database'

export interface DatabaseState {
  database: Database | null
}

const initialDatabaseState: DatabaseState = {
  database: null,
}

export const createDatabaseStore = (set: any, get: any) => ({
  database: initialDatabaseState.database,
  databaseActions: {
    setDatabase: (database: Database) =>
      set((state) => {
        return {
          database,
        }
      }),
  },
})
