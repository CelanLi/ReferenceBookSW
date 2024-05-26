import PeopleList from "../components/PeopleList";
import { useQuery, gql } from "@apollo/client";
import { Layout, Menu, theme } from "antd";
import Filters from "../components/Filters";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { FilterConditions, Node } from "../type";

const { Header, Content, Footer, Sider } = Layout;

function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  // const filters = location.state?.searchParams || "";

  const [searchParams] = useSearchParams();

  const initialGender = searchParams.get("gender") || "";
  const initialFilm = searchParams.get("film") || "";
  const initialSpecies = searchParams.get("species")
    ? searchParams.get("species")!.split(",")
    : [];
  const initialEyeColor = searchParams.get("eyeColor")
    ? searchParams.get("eyeColor")!.split(",")
    : [];

  // const [filterConditions, setFilterConditions] = useState<FilterConditions>({
  //   gender: "",
  //   film: "",
  //   eyeColor: [],
  //   species: [],
  // });
  const [filterConditions, setFilterConditions] = useState<FilterConditions>({
    gender: initialGender,
    film: initialFilm,
    eyeColor: initialEyeColor,
    species: initialSpecies,
  });

  // if searchParams change, update filterConditions
  useEffect(() => {
    setFilterConditions({
      gender: searchParams.get("gender") || "",
      film: searchParams.get("film") || "",
      eyeColor: searchParams.get("eyeColor")
        ? searchParams.get("eyeColor")!.split(",")
        : [],
      species: searchParams.get("species")
        ? searchParams.get("species")!.split(",")
        : [],
    });
  }, [searchParams]);

  // fetch data from SWAPI
  const PEOPLE_QUERY = gql`
    query GetData($cursor: String, $before: String) {
      allPeople(first: 10, after: $cursor, before: $before) {
        edges {
          node {
            id
            name
            height
            homeworld {
              name
            }
            species {
              name
            }
            gender
            eyeColor
            filmConnection {
              films {
                title
              }
            }
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;

  // first data fetch
  const { data, fetchMore, loading, error } = useQuery(PEOPLE_QUERY, {
    variables: { cursor: null, before: null },
  });

  useEffect(() => {
    // clear all conditions if data change
    setFilterConditions({
      gender: "",
      film: "",
      eyeColor: [],
      species: [],
    });
  }, [data]);

  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (data) {
      console.log(filterConditions.gender);
      console.log("species", data.allPeople.edges[0].node.species);
      const filtered = data.allPeople.edges.filter(
        ({ node }: { node: Node }) =>
          (!filterConditions.gender ||
            node.gender === filterConditions.gender) &&
          (!filterConditions.film ||
            node.filmConnection.films.some(
              (film) => film.title === filterConditions.film
            )) &&
          (filterConditions.eyeColor.length === 0 ||
            filterConditions.eyeColor.includes(node.eyeColor)) &&
          (filterConditions.species.length === 0 ||
            filterConditions.species.includes(node.species?.name))
      );

      console.log(filtered);

      setFilteredData({
        allPeople: {
          edges: filtered,
          pageInfo: data.allPeople.pageInfo,
        },
      });
    }
  }, [data, filterConditions]);

  if (!filteredData) {
    return <p>Loading...</p>;
  }

  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
      </Header>
      <Content style={{ padding: "20px 40px 0 48px" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Filters
              data={data}
              loading={loading}
              error={error}
              setFilterConditions={setFilterConditions}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <PeopleList
              data={filteredData}
              fetchMore={fetchMore}
              loading={loading}
              error={error}
            />
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
