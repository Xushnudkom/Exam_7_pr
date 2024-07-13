import { Button } from "@mui/material";
import { Category } from "@modal";
import { CategoryTable } from "../../components/ui";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { category } from "../../service";

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
      const response = await category.get(params);
      if (response.status === 200 && response?.data?.categories) {
        setData(response?.data?.categories);
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
      <Category open={open} handleClose={() => setOpen(false)} />
      <div className=" flex flex-col gap-3">
        <div className=" flex justify-end">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "white",
              "&:hover": {
                backgroundColor: "#2563EB",
              },
            }}
            onClick={() => setOpen(true)}
          >
            Add a category
          </Button>
        </div>
        <CategoryTable data={data} />
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
