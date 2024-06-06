import PeopleList from "../components/PeopleList";
import { useQuery } from "@apollo/client";
import { Button, Layout, Menu, theme } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import FavoriteList from "../components/FavoriteList";
import Filters from "../components/Filters";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterConditions } from "../type";
import { PEOPLE_QUERY } from "../query";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // get search params
  const [searchParams] = useSearchParams();

  const initialGender = searchParams.get("gender") || "";
  const initialSpecies = searchParams.get("species")
    ? searchParams.get("species")!.split(",")
    : [];
  const initialEyeColor = searchParams.get("eyeColor")
    ? searchParams.get("eyeColor")!.split(",")
    : [];

  // set filter conditions
  const [filterConditions, setFilterConditions] = useState<FilterConditions>({
    gender: initialGender,
    eyeColor: initialEyeColor,
    species: initialSpecies,
  });

  // set favorite status
  const [FavoriteMode, setFavoriteMode] = useState(false);
  const toggleFavoriteMode = () => {
    setFavoriteMode(!FavoriteMode);
  };

  // get favorite list from local storage
  const favorites = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") as string) || []
  )[0];

  // if searchParams change, update filterConditions
  useEffect(() => {
    setFilterConditions({
      gender: searchParams.get("gender") || "",
      eyeColor: searchParams.get("eyeColor")
        ? searchParams.get("eyeColor")!.split(",")
        : [],
      species: searchParams.get("species")
        ? searchParams.get("species")!.split(",")
        : [],
    });
  }, [searchParams]);

  const { data, fetchMore, loading, error } = useQuery(PEOPLE_QUERY, {
    variables: { limit: 20, cursor: null, before: null },
  });

  // set pagination states
  const [pageCursors, setPageCursors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataList, setDataList] = useState(data?.allPeople?.edges);

  // set limit of data fetch
  const limit = 20;

  // fetch forward when curser changes
  const onForward = () => {
    setCurrentPage(currentPage + 1);
    // if the next page has been stored in pageCursors, fetch data from pageCursors, not add more cursors to pageCursors
    if (pageCursors[currentPage]) {
      fetchMore({
        variables: {
          cursor: pageCursors[currentPage],
          limit: limit,
          before: null,
        },
      });
      return;
    }
    if (data?.allPeople?.pageInfo?.endCursor) {
      setPageCursors([...pageCursors, data.allPeople.pageInfo.endCursor]);
    }
    fetchMore({
      variables: {
        cursor: data?.allPeople?.pageInfo.endCursor,
        limit: limit,
        before: null,
      },
    });
  };

  // fetch backward when curser changes
  const onBackward = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // when data change, slice the data, store is into dataList based on the current page
  useEffect(() => {
    if (data) {
      const start = currentPage * limit;
      const end = start + limit;
      setDataList(data?.allPeople?.edges?.slice(start, end));
    }
  }, [data, currentPage]);

  // clear all conditions if data change
  useEffect(() => {
    setFilterConditions({
      gender: "",
      eyeColor: [],
      species: [],
    });
  }, [data]);

  // filter data
  const [filteredData, setFilteredData] = useState(dataList);
  useEffect(() => {
    if (dataList) {
      const filtered = dataList.filter((edge: any) =>
        Boolean(
          edge?.node &&
            (!filterConditions.gender ||
              edge.node.gender === filterConditions.gender) &&
            (filterConditions.eyeColor.length === 0 ||
              (edge.node.eyeColor &&
                filterConditions.eyeColor.includes(edge.node.eyeColor))) &&
            (filterConditions.species.length === 0 ||
              (edge.node.species &&
                filterConditions.species.includes(edge.node.species.name)))
        )
      );

      setFilteredData(filtered);
    }
  }, [dataList, filterConditions, favorites, FavoriteMode]);

  if (!filteredData) {
    return <p>Loading...</p>;
  }

  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div
          className="demo-logo"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="/Star_Wars_Logo.png"
            alt="Logo"
            style={{ height: "50px" }}
          />
        </div>
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
        <Button type="primary" onClick={toggleFavoriteMode}>
          {FavoriteMode ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <HeartFilled />
              <p style={{ margin: "0 0 0 10px" }}>
                Click to Close Favorite Only Mode
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <HeartOutlined />
                <p style={{ margin: "0 0 0 10px" }}>
                  Click to Switch to Favorite Only Mode
                </p>
              </div>
            </>
          )}
        </Button>
      </Header>
      <Content style={{ padding: "20px 40px 0 48px" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {FavoriteMode ? (
            <></>
          ) : (
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Filters
                data={dataList}
                loading={loading}
                error={error}
                setFilterConditions={setFilterConditions}
              />
            </Sider>
          )}

          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {FavoriteMode ? (
              <FavoriteList />
            ) : (
              <>
                <PeopleList
                  data={filteredData}
                  loading={loading}
                  error={error}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    style={{ marginRight: "10px" }}
                    shape="circle"
                    icon={<LeftOutlined />}
                    onClick={onBackward}
                    disabled={currentPage > 0 ? false : true}
                  />
                  <Button
                    style={{ marginLeft: "10px" }}
                    shape="circle"
                    icon={<RightOutlined />}
                    onClick={onForward}
                    disabled={
                      data?.allPeople?.pageInfo.hasNextPage ? false : true
                    }
                  />
                  <br />
                </div>
              </>
            )}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Home;
