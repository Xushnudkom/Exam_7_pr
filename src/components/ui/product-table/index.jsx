import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import product from "../../../service/product";
import { Link } from "react-router-dom";
import { AddMedia } from "@modal";

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

export default function CustomizedTables({ data }) {
  const deleteItem = async (id) => {
    try {
      const response = await product.delete(id);
      response.status === 200 && window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S/N</StyledTableCell>
              <StyledTableCell align="center">Product name</StyledTableCell>
              <StyledTableCell align="center">Color</StyledTableCell>
              <StyledTableCell align="center">Size</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
              <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length ? (
              data.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.product_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.color.map((color, colorIndex) => (
                      <span key={colorIndex} className="mr-1">
                        {color}
                      </span>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell  align="center">
                    {item.size.map((size, sizeIndex) => (
                      <span key={sizeIndex} className="mr-1">
                        {size}
                      </span>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.count}</StyledTableCell>
                  <StyledTableCell align="center">{item.cost}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:"#2e7d32"}}>
                    <div className="flex gap-3 justify-center text-center">
                      <button onClick={() => deleteItem(item.product_id)}>
                        <DeleteIcon sx={{color:"#ff1744"}}/>
                      </button>
                      <AddMedia data={item.product_id} />
                      <Link to={`/products/${item.product_id}`}>
                        <RemoveRedEyeIcon sx={{color:"#795548"}} />
                      </Link>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={7}>
                  Not found
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
