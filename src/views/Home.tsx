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
  console.log("favorites", favorites);

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
    variables: { cursor: null, before: null, limit: 20 },
  });

  // clear all conditions if data change
  useEffect(() => {
    setFilterConditions({
      gender: "",
      eyeColor: [],
      species: [],
    });
  }, [data]);

  // filter data
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (data) {
      const filtered = data.allPeople?.edges?.filter((edge: any) =>
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

      setFilteredData({
        allPeople: {
          edges: filtered,
          pageInfo: data.allPeople?.pageInfo || {
            __typename: "PageInfo",
            startCursor: null,
            endCursor: null,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
      });
    }
  }, [data, filterConditions, favorites, FavoriteMode]);

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
                data={data}
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
              <PeopleList
                data={filteredData}
                fetchMore={fetchMore}
                loading={loading}
                error={error}
              />
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
