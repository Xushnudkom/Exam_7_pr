import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Category } from "@modal";
import { useState } from "react";
import category from "../../../service/category";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// eslint-disable-next-line react/prop-types
export default function CustomizedTables({ data }) {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);

  const deleteItem = async (id) => {
    try {
      const response = await category.delete(id);
      response.status === 200 && window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  return (
    <>
      <Category item={edit} open={open} handleClose={() => setOpen(false)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Category name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length ? (
              data.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.category_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex gap-3 justify-center text-center">
                      <button onClick={() => editItem(item)}>
                        <EditIcon sx={{color: "#ffcd38"}}/>
                      </button>
                      <button onClick={() => deleteItem(item.category_id)}>
                        <DeleteIcon sx={{color:"#ff1744"}}/>
                      </button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <div>Not found</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
