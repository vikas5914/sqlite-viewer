import { useMemo, useCallback, useEffect } from "react";
import useSQLiteStore from "@/store/useSQLiteStore";
import { useQueryData } from "@/hooks/useQueryData";
import { usePagination } from "@/hooks/usePagination";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import PageSelect from "./page-select";
import TableSelect from "./table-select";
import DBTableComponent from "./table-data";
import ErrorMessage from "./error";
import Loading from "./loading";
import ExportButtons from "./export-buttons";

import {
  TrashIcon,
  PlayIcon,
  ListRestartIcon,
  Maximize2Icon,
  Minimize2Icon
} from "lucide-react";

export default function DBTable() {
  const {
    tables,
    selectedTable,
    tableSchemas,
    queryError,
    setQueryError,
    rowPerPageOrAuto,
    isCustomQuery,
    setIsCustomQuery,
    customQuery,
    setCustomQuery,
    expandPage,
    setExpandPage
  } = useSQLiteStore();

  const { page, setPage, rowsPerPage } = usePagination(rowPerPageOrAuto);

  const tableName = useMemo(
    () => tables[parseInt(selectedTable)]?.name,
    [tables, selectedTable]
  );

  const rowCount = useMemo(
    () => tables[parseInt(selectedTable)]?.count || 0,
    [tables, selectedTable]
  );

  const { data, columns, isQueryLoading, handleCustomQuery } = useQueryData(
    tableName,
    rowsPerPage,
    page,
    isCustomQuery
  );

  const handleResetQuery = useCallback(() => {
    setQueryError(null);
    setCustomQuery("");
    setIsCustomQuery(false);
  }, [setIsCustomQuery, setQueryError, setCustomQuery]);

  const handleResetPage = useCallback(() => {
    setPage(0);
    handleResetQuery();
  }, [handleResetQuery, setPage]);

  useEffect(() => {
    setPage(0);
  }, [selectedTable]);

  const renderQueryInput = useMemo(
    () => (
      <div className="flex flex-col gap-2 md:flex-row">
        <Input
          type="text"
          value={customQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCustomQuery(e.target.value)
          }
          placeholder="Enter your custom query"
          className="w-full"
        />
        <div className="flex gap-1">
          <Button
            className="w-full"
            onClick={handleCustomQuery}
            title="Run custom query"
          >
            <PlayIcon className="h-5 w-5" />
          </Button>
          <Button
            className="w-full"
            onClick={handleResetQuery}
            title="Reset query"
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
          <Button
            className="w-full"
            onClick={handleResetPage}
            title="Reset to first page"
            disabled={page === 0}
          >
            <ListRestartIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    ),
    [customQuery, handleCustomQuery, handleResetQuery, handleResetPage, page]
  );

  const renderTableContent = useMemo(() => {
    if (isQueryLoading) return <Loading>Loading {tableName}</Loading>;
    if (data.length > 0) {
      return (
        <div className="rounded border">
          <DBTableComponent
            data={data}
            columns={columns}
            tableName={tableName}
            tableSchemas={tableSchemas}
          />
        </div>
      );
    }
    return <ErrorMessage>{`Table ${tableName} is empty`}</ErrorMessage>;
  }, [isQueryLoading, data, columns, tableName, tableSchemas]);

  return (
    <div className="flex flex-col gap-3 pb-8">
      <section className="flex flex-col gap-2 rounded border p-3 pb-2">
        <div className="flex h-full gap-1">
          <TableSelect />
          <div className="ml-1 flex gap-1">
            <ExportButtons />
            <Button
              className="hidden expand:block"
              onClick={() => setExpandPage(!expandPage)}
              title="Toggle page size"
            >
              {expandPage ? (
                <Minimize2Icon className="h-5 w-5" />
              ) : (
                <Maximize2Icon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        {renderQueryInput}
        {queryError && (
          <p className="text-center text-xs capitalize text-red-500">
            {queryError}
          </p>
        )}
      </section>
      {renderTableContent}
      {!isCustomQuery && (
        <PageSelect
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          rowCount={rowCount}
        />
      )}
    </div>
  );
}
