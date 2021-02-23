import React, { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { withRouter } from "react-router-dom";
import { ActionCreators } from "../../../Store/ActionCreators";
import UsersTable from "../NewUsers/UsersTable";

const mapState = ({ loading, applications, user, numApplications }) => ({
  loading,
  applications,
  user,
  numApplications,
});

const mapProps = (dispatch) => ({
  getApplications: (_id, pageSize, pageIndex, filter = {}, range = {}) =>
    dispatch(
      ActionCreators.gettingApplications(
        _id,
        pageIndex,
        pageSize,
        filter,
        range
      )
    ),
});

const connector = connect(mapState, mapProps);

const selectApplications = ({ applications }) => applications;

const selectLoading = ({ loading }) => loading;

const Applications = ({
  getApplications,
  applications,
  loading,
  user,
  numApplications,
}) => {
  const store = useStore();

  const [applicationList, setApplicationList] = useState(applications);
  const [isLoading, setIsLoading] = useState(loading);
  const [filter, setFilter] = useState({});
  const [range, setRange] = useState({});

  const data = React.useMemo(() => applicationList, [applicationList]);
  const convertDate = ({ value }) =>
    `${new Date(value).toDateString()} at ${new Date(value)
      .toTimeString()
      .slice(0, 8)}`;

  const columns = React.useMemo(
    () => [
      { Header: "User ID", accessor: "userId" },
      { Header: "Role", accessor: "role" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Application Date and Time",
        accessor: "applicationDateAndTime",
        Cell: convertDate,
      },
    ],
    []
  );

  useEffect(() => {
    const handleChange = () => {
      const currentValue = selectApplications(store.getState());
      if (applications !== currentValue) {
        setApplicationList(currentValue);
      }
    };

    const unsubscribe = store.subscribe(handleChange);

    return () => {
      unsubscribe();
    };
  }, [store, applications]);

  useEffect(() => {
    const handleChangeLoading = () => {
      const currentValue = selectLoading(store.getState());
      if (isLoading !== currentValue) {
        setIsLoading(currentValue);
      }
    };
    const unsubscribeLoading = store.subscribe(handleChangeLoading);
    return () => {
      unsubscribeLoading();
    };
  }, [isLoading, store]);

  useEffect(() => {
    getApplications(user._id, 10, 1);
    console.log("I am here");
  }, [getApplications, user._id]);

  const fetchData = React.useCallback(
    ({ pageIndex, pageSize }) => {
      getApplications(user._id, pageSize, pageIndex, filter, range);
    },
    [filter, getApplications, range, user._id]
  );

  const updateFilter = (key, value) => {
    const newFilter = { ...filter, [key]: value };
    if (value === "") delete newFilter[key];

    setFilter(newFilter);
  };

  const updateRange = (key, value) => {
    const newRange = { ...range, [key]: value };
    if (value === "") delete newRange[key];

    setRange(newRange);
  };

  return (
    <div className="table">
      <UsersTable
        data={data}
        columns={columns}
        fetchData={fetchData}
        pageCount={numApplications}
        loading={isLoading}
      />
    </div>
  );
};

export default withRouter(connector(Applications));