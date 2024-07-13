import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { ProductsModal } from "@modal";
import { ProductTable } from "../../components/ui";
import product from "../../service/product";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });

  const getData = async () => {
    try {
      const response = await product.get(params);
      console.log(response);
      if (response.status === 200 && response?.data?.products) {
        setData(response?.data?.products);
        setCount(response?.data?.total_count);
        let total = Math.ceil(response.data.total_count / params.limit);
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };

  return (
    <>
    <ProductsModal open={open} handleClose={() => setOpen(false)} />
      <div className=" flex flex-col gap-3">
        <div className=" flex justify-end">
          <Button
            variant=" contained"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "#3B82F6",
              color: "white", 
              "&:hover": {
                backgroundColor: "#2563EB",
              },
            }}
          >
            Add a product
          </Button>
        </div>
        <ProductTable data={data} />
        <Pagination
          count={count}
          page={params.page}
          onChange={handleChange}
          sx={{ marginLeft: "530px", marginTop: "20px" }}
        />
      </div>
    </>
  );
};

export default Index;
