import { useState, useCallback } from "react";
import useSQLiteStore from "@/store/useSQLiteStore";

import { useDropzone, type FileError } from "react-dropzone";
import { FileStats, FileData } from "./dropzone-helpers";

export default function UploadFile() {
  const { loadDatabase, setTables, setSelectedTable, db } = useSQLiteStore();
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FileError[]>([]);

  const onDrop = useCallback(
    async (
      acceptedFiles: File[],
      fileRejections: { file: File; errors: FileError[] }[],
    ) => {
      setErrors([]);
      setTables([]);
      setSelectedTable("0");

      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        await loadDatabase(selectedFile);
      }

      if (fileRejections.length > 0) {
        const rejectionErrors = fileRejections.flatMap(
          (rejection) => rejection.errors,
        );
        setErrors(rejectionErrors);
      }
    },
    [loadDatabase, setTables, setSelectedTable],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/vnd.sqlite3": [".sqlite", ".sqlite3"],
      "application/x-sqlite3": [".sqlite", ".sqlite3"],
      "application/octet-stream": [".db"],
      "application/sql": [".sql"],
    },
  });

  const renderDropzoneContent = (hasDatabase: boolean) => (
    <div
      {...getRootProps()}
      className={`border p-6 rounded cursor-pointer text-center ${
        hasDatabase ? "" : "py-24"
      }`}
    >
      <input id="file-upload" {...getInputProps()} />
      <label htmlFor="file-upload" className="sr-only">
        Upload SQLite File
      </label>
      <p className="hidden sm:block">
        Drag and drop a SQLite file here, or click to select one
      </p>
      <p className="block sm:hidden">Click to select a SQLite file</p>
      {!hasDatabase && (
        <a
          href="https://github.com/vwh/sqlite-viewer/raw/main/db_examples/chinook.db"
          className="text-sm text-link hover:underline"
          title="Download sample file"
        >
          Or download & try this sample file
        </a>
      )}
    </div>
  );

  return (
    <section>
      {renderDropzoneContent(Boolean(db))}
      <div className="mt-2">
        {file && <FileData file={file} />}
        <FileStats errors={errors} />
      </div>
    </section>
  );
}
