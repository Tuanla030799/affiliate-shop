import { SetStateAction, useState } from "react";

type Order = "asc" | "desc";

type MuiTableProps = {
  listData: Array<any>;
  defaultSort: string;
  defaultOrder: Order;
};

// ================================================================

// ================================================================
export function descendingComparator(
  a: { [x: string]: number },
  b: { [x: string]: number },
  orderBy: string
) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
export function getComparator(order: Order, orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}
export function stableSort(
  array: any[],
  comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any }
) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
} // ================================================================

// ================================================================
const useMuiTable = (props: MuiTableProps) => {
  const { listData = [], defaultSort = "name", defaultOrder = "asc" } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(20);
  const [orderBy, setOrderBy] = useState<string>(defaultSort);
  const [selected, setSelected] = useState<Array<string>>([]);
  const [order, setOrder] = useState(defaultOrder); // Handle list sorting

  const handleRequestSort = (property: SetStateAction<string>) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }; // Handle select whole list

  const handleSelectAllClick = (checked: boolean, defaultSelect: string) => {
    if (checked) {
      const newSelecteds = listData.map((n) => n[defaultSelect]);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  }; // Handle individual row click

  const handleRowClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_: any, newPage: number) => setPage(newPage - 1);

  const filteredList = stableSort(
    listData,
    getComparator(order, orderBy)
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return {
    page,
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleRowClick,
    handleChangePage,
    handleRequestSort,
    handleSelectAllClick,
  };
};

export default useMuiTable;
