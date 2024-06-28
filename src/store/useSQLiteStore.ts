import { create } from "zustand";
import initSqlJs, { Database, QueryExecResult } from "sql.js";

interface TableInfo {
  [key: string]: {
    [columnName: string]: {
      type: string;
      isPrimaryKey: boolean;
      isForeignKey: boolean;
    };
  };
}

interface SQLiteState {
  db: Database | null;
  loadDatabase: (file: File) => Promise<void>;
  query: (sql: string) => QueryExecResult[] | [];
  tables: { name: string; count: number }[];
  setTables: (tables: { name: string; count: number }[]) => void;
  selectedTable: string;
  setSelectedTable: (value: string) => void;
  isLoading: boolean;
  tableSchemas: TableInfo;
  setTableSchemas: (schemas: TableInfo) => void;
}

const useSQLiteStore = create<SQLiteState>((set, get) => ({
  db: null,
  isLoading: false,

  loadDatabase: async (file: File) => {
    set({ isLoading: true });

    // Load database from file
    const arrayBuffer = await file.arrayBuffer();
    const SQL = await initSqlJs({
      locateFile: (fileName) => `https://sql.js.org/dist/${fileName}`,
    });
    const database = new SQL.Database(new Uint8Array(arrayBuffer));
    set({ db: database });
    console.log("Database loaded successfully");

    // Load table information here after database is loaded
    const tablesResult = database.exec(
      "SELECT name FROM sqlite_master WHERE type='table';"
    );
    if (tablesResult.length > 0) {
      const tableNames = tablesResult[0].values.map((row) => row[0]);

      // Get row count and schema for each table
      const tableCountsPromises = tableNames.map(async (tableName) => {
        const countResult = database.exec(
          `SELECT COUNT(*) FROM "${tableName}"`
        );
        const count = parseInt(countResult[0].values[0][0] as string, 10);

        const tableInfoResult = database.exec(
          `PRAGMA table_info("${tableName}")`
        );
        const tableSchema = tableInfoResult[0].values.reduce((acc, row) => {
          acc[row[1] as string] = {
            type: row[2] as string,
            isPrimaryKey: (row[5] as number) === 1, // row[5] indicates if the column is a primary key
            isForeignKey: false, // default value, will be updated later
          };
          return acc;
        }, {} as { [columnName: string]: { type: string; isPrimaryKey: boolean; isForeignKey: boolean } });

        // Check for foreign keys
        const foreignKeyInfoResult = database.exec(
          `PRAGMA foreign_key_list("${tableName}")`
        );
        if (foreignKeyInfoResult.length > 0) {
          foreignKeyInfoResult[0].values.forEach((row) => {
            const columnName = row[3] as string; // row[3] is the column name that is a foreign key
            if (tableSchema[columnName]) {
              tableSchema[columnName].isForeignKey = true;
            }
          });
        }

        return { name: tableName as string, count, schema: tableSchema };
      });

      const tablesWithCountsAndSchemas = await Promise.all(tableCountsPromises);
      set({
        tables: tablesWithCountsAndSchemas.map(({ name, count }) => ({
          name,
          count,
        })),
        tableSchemas: tablesWithCountsAndSchemas.reduce(
          (acc, { name, schema }) => {
            acc[name] = schema;
            return acc;
          },
          {} as TableInfo
        ),
      });
    }

    set({ isLoading: false });
  },

  query: (sql: string): QueryExecResult[] | [] => {
    const db = get().db;
    if (!db) {
      console.warn("Database is not loaded.");
      return [];
    }

    const result: QueryExecResult[] = db.exec(sql);
    console.log("Query executed:", sql, result);

    return result.length > 0 ? result : [];
  },

  tables: [],
  setTables: (tables: { name: string; count: number }[]) => set({ tables }),

  selectedTable: "0",
  setSelectedTable: (value: string) => set({ selectedTable: value }),

  tableSchemas: {},
  setTableSchemas: (schemas: TableInfo) => set({ tableSchemas: schemas }),
}));

export default useSQLiteStore;
