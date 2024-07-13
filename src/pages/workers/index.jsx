import { Button } from "@mui/material";
import { AddWork } from "@modal";
import { WorkersTable } from "../../components/ui";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import workers from "../../service/worker";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
  });

  const getData = async () => {
    try {
      const response = await workers.get(params);
      console.log(response);
      if (response.status === 200 && response?.data?.user) {
        setData(response?.data?.user);
        setCount(response?.data?.totcal_count);
        let total = Math.ceil(response.data.totcal_count / params.limit);
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
      <AddWork open={open} handleClose={() => setOpen(false)} />
      <div className=" flex flex-col gap-3">
        <div className=" flex justify-end">
          <Button variant="contained" onClick={() => setOpen(true)} sx={{
              backgroundColor: "#3B82F6",
              color: "white",
              "&:hover": {
                backgroundColor: "#2563EB",
              },
            }}>
            Add a worker
          </Button>
        </div>
        <WorkersTable data={data} />
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
