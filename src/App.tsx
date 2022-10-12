import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../src/redux/store";
import { getCurrentUser } from "../src/redux/slices/user";
import MaterialTable from "material-table";
import { setAutoFreeze } from "immer";
import { Pagination } from "@material-ui/lab";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const columns = [
  {
    field: "name",
    title: "Full Name",
    sort: true,
    render: (record: any) => (
      <p>{`${record.name.title} ${record.name.first} ${record.name.last}`}</p>
    ),
  },
  {
    field: "login",
    title: "Username",
    sort: true,
    render: (record: any) => <p>{record.login.username}</p>,
  },
  {
    field: "picture",
    title: "Thumnail icon",
    render: (record: any) => <img src={record.picture.thumbnail} alt="" />,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paginationRoot: {
      padding: 20,
    },
  })
);

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user }: any = useSelector((state) => state.user);

  const [page, setPage] = useState<number>(0);
  const [pageSize] = useState<number>(10);

  useEffect(() => {
    dispatch(getCurrentUser(page, pageSize));
    setAutoFreeze(false);
  }, [page, pageSize, dispatch]);

  const handleChange = (_event: any, page: any) => {
    setPage(page);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <MaterialTable
        title={"Hello"}
        data={user?.results}
        columns={columns}
        options={{
          paging: false,
          pageSize: page,
          search: false,
          toolbar: false,
          sorting: false
        }}
      />
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        classes={{
          root: classes.paginationRoot,
        }}
      />
    </div>
  );
}

export default App;
