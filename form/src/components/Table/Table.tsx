import React, { MouseEventHandler, useCallback } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import {
  Paper,
  TableContainer,
  Table as TableMaterial,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  IconButton,
  Divider,
  Skeleton,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import withTheme from "hoc/withTheme";
import converts from "helper/converts";
import Menu from "components/Menu";
import FormSimple from "components/forms/FormSimple";

const useStyles = makeStyles((theme) => ({
  tableContainerRoot: {
    boxShadow: "none !important",
    border: `1px solid ${theme.palette.grey[300]}`,
    "& .MuiTableCell-root": {
      border: 0,
      fontSize: "1rem",
    },
  },
  tableHeadRoot: {
    backgroundColor: theme.palette.primary.main,
    "& .MuiTableCell-root": {
      color: theme.palette.common.white,
    },
  },
  tableRowRoot: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  inputsWrapperClass: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridColumn: "1 / 3 span",
    gap: theme.spacing(2),
  },
  formSimple: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: theme.spacing(5),
    // "& > div:last-child": {
    //   gridColumn: "2 / 1 span !important",
    // },
  },
  btnWrapperClass: {
    gridColumn: "2 / 1 span !important",
  },
}));

type configType = {
  key: string;
  name: string;
  type:
    | "text"
    | "date"
    | "currency"
    | "map"
    | "image"
    | "link"
    | "datetime"
    | "markdown";
  options?: any[];
  width?: number | string;
};

type actionType = {
  code: string;
  name: string;
};

type TableProps = {
  searchConfig?: any[];
  config: configType[];
  data: any[];
  actions?: ("VIEW" | "EDIT" | "REMOVE" | actionType)[];
  onAction?: (action: string, data: any) => void;
  onAdd?: MouseEventHandler | undefined;
  onSearch?: (data: any) => void;
  onPage?: (newPage: number, rowsPerPage: number) => void;
  onRowsPerPage?: (rowsPerPage: number, newPage: number) => void;
  server?: boolean;
  rowsPerPageOptions?: any[];
  rowsTotal?: number;
  loading?: boolean;
};

const Table = (props: TableProps) => {
  const {
    rowsPerPageOptions = [10, 20, 40, 80, 100, { label: "All", value: -1 }],
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
      if (typeof props.onPage === "function")
        props.onPage(newPage, rowsPerPage);
    },
    [setPage, rowsPerPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      props.onRowsPerPage?.(parseInt(event.target.value, 10), 0);
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [setRowsPerPage, setPage]
  );

  return (
    <>
      {(props.searchConfig?.length as any) > 0 && (
        <div>
          <FormSimple
            btnWrapperClass={classes.btnWrapperClass}
            className={classes.formSimple}
            inputsConfig={props.searchConfig}
            inputsWrapperClass={classes.inputsWrapperClass}
            submitLabel="Tìm kiếm"
            onSubmit={(data) => {
              if (typeof props.onSearch === "function") props.onSearch(data);
            }}
          />
        </div>
      )}
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TablePagination
          labelDisplayedRows={({ from, to, count }) =>
            window.innerWidth > 600 ? `${from}-${to} của ${count}` : ""
          }
          component="div"
          labelRowsPerPage="Số hàng:"
          rowsPerPageOptions={rowsPerPageOptions}
          colSpan={3}
          count={
            props.server
              ? props.rowsTotal || props.data?.length
              : props.data?.length
          }
          rowsPerPage={rowsPerPage as any}
          page={page}
          SelectProps={{
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
        {typeof props.onAdd === "function" && (
          <div style={{ height: "fit-content", display: "flex" }}>
            <Divider
              style={{ height: "auto", margin: theme.spacing(0, 1) }}
              orientation="vertical"
            />
            <IconButton size="small" onClick={props.onAdd}>
              <PlaylistAddIcon color="primary" />
            </IconButton>
          </div>
        )}
      </div>

      <TableContainer
        classes={{ root: classes.tableContainerRoot }}
        component={Paper}
      >
        <TableMaterial>
          <TableHead className={classes.tableHeadRoot}>
            <TableRow classes={{ root: classes.tableRowRoot }}>
              {props.config?.map((c, i) => (
                <TableCell
                  width={c?.width}
                  align="center"
                  key={`${c?.key}${i}column`}
                >
                  {c?.name}
                </TableCell>
              ))}
              {!!props.actions && props.actions?.length > 0 && (
                <TableCell width="5%" align="center">
                  #
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          {props.loading && (
            <TableBody>
              <TableRow>
                {props.config?.map((c, j) => (
                  <TableCell
                    width={c?.width}
                    align="center"
                    key={`${c?.key}${j}`}
                  >
                    <Skeleton />
                  </TableCell>
                ))}
                {!!props.actions && props.actions?.length > 0 && (
                  <TableCell width="5%" align="center">
                    <Skeleton />
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          )}
          {!props.loading && (!props.data || props.data?.length === 0) && (
            <TableBody>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={
                    !!props.actions && props.actions?.length > 0
                      ? props.config?.length + 1
                      : props.config?.length
                  }
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {!props.loading && props.data?.length > 0 && (
            <TableBody>
              {(rowsPerPage > 0
                ? props.server
                  ? props.data
                  : props.data.slice(
                      page * (rowsPerPage as number),
                      page * (rowsPerPage as number) + (rowsPerPage as number)
                    )
                : props.data
              )?.map((d, i) => (
                <TableRow key={`${JSON.stringify(d)}${i}`}>
                  {props.config?.map((c, j) => (
                    <TableCell
                      width={c?.width}
                      align="center"
                      key={`${c?.key}${i}${j}`}
                    >
                      {converts(d[c?.key], c?.type, c?.options, c?.name)}
                    </TableCell>
                  ))}
                  {!!props.actions && props.actions?.length > 0 && (
                    <TableCell width="5%" align="center">
                      <Menu
                        options={
                          props.actions?.map(
                            (ac: "VIEW" | "EDIT" | "REMOVE" | actionType) => {
                              let op;

                              if (typeof ac === "string") {
                                op = { value: ac, label: ac as string };

                                switch (ac) {
                                  case "VIEW":
                                    op.label = "Xem";
                                    return op;
                                  case "EDIT":
                                    op.label = "Sửa";
                                    return op;
                                  case "REMOVE":
                                    op.label = "Xoá";
                                    return op;

                                  default:
                                    break;
                                }
                              } else if (typeof ac === "object") {
                                op = { value: ac?.code, label: ac?.name };
                                return op;
                              }
                            }
                          ) as any
                        }
                        onAction={(op: any) => {
                          if (typeof props.onAction === "function")
                            props.onAction(op?.value, d);
                        }}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </TableMaterial>
      </TableContainer>
    </>
  );
};

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

export default withTheme<TableProps>(Table);
