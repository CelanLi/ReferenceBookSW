import { useQuery, gql, useApolloClient } from "@apollo/client";

import { List, Divider, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { useState } from "react";

function PeopleList() {
  const [pageCursors, setPageCursors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

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
            hairColor
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

  // deal with fetched data
  const { data, fetchMore, loading, error } = useQuery(PEOPLE_QUERY, {
    variables: { cursor: null, before: null },
  });

  // render data
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) return <p>Error: {error.message}</p>;

  // fetch more data when curser changes
  const onForward = () => {
    setCurrentPage(currentPage + 1);
    setPageCursors([...pageCursors, data.allPeople.pageInfo.endCursor]);
    fetchMore({
      variables: {
        cursor: data.allPeople.pageInfo.endCursor,
        limit: 10,
      },
    }).then((newData) => {});
  };

  // fetch more data when curser changes
  const onBackward = () => {
    if (currentPage > 0) {
      const newCurrentPage = currentPage - 1;
      setCurrentPage(newCurrentPage);
      fetchMore({
        variables: {
          cursor: pageCursors[newCurrentPage - 1],
          limit: 10,
        },
      });
    }
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr) 2fr",
          gap: "10px",
          justifyItems: "center",
        }}
      >
        <p>Name</p>
        <p>Height</p>
        <p>Homeworld</p>
        <p>Species</p>
        <p>Gender</p>
        <p>Hair Color</p>
        <p>Films</p>
      </div>
      <Divider style={{ borderWidth: 2 }} />
      <List
        itemLayout="horizontal"
        dataSource={data.allPeople.edges}
        renderItem={(edges: any) => (
          <List.Item>
            <List.Item.Meta
              description={
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr) 2fr",
                      gap: "10px",
                      justifyItems: "center",
                    }}
                  >
                    <p>{edges.node.name || "-"}</p>
                    <p>{edges.node.height || "-"}</p>
                    <p>
                      {(edges.node.homeworld && edges.node.homeworld.name) ||
                        "-"}
                    </p>
                    <p>
                      {(edges.node.species && edges.node.species.name) || "-"}
                    </p>
                    <p>{edges.node.gender || "-"}</p>
                    <p>{edges.node.hairColor || "-"}</p>
                    <p>
                      {edges.node.filmConnection.films.map((film: any) => (
                        <div key={film.title}>- {film.title}</div>
                      ))}
                    </p>
                  </div>
                </>
              }
            />
          </List.Item>
        )}
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
          disabled={data.allPeople.pageInfo.hasNextPage ? false : true}
        />
        <br />
      </div>
    </>
  );
}

export default PeopleList;
