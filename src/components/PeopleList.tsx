import { List, Divider, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { useState } from "react";

interface PeopleListProps {
  data: any;
  fetchMore: any;
  loading: boolean;
  error: any;
}

function PeopleList({ data, fetchMore, loading, error }: PeopleListProps) {
  const [pageCursors, setPageCursors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  // render data
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) return <p>Error: {error.message}</p>;

  // fetch forward when curser changes
  const onForward = () => {
    setCurrentPage(currentPage + 1);
    setPageCursors([...pageCursors, data.allPeople.pageInfo.endCursor]);
    fetchMore({
      variables: {
        cursor: data.allPeople.pageInfo.endCursor,
        limit: 10,
      },
    });
  };

  // fetch backward when curser changes
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
        <p>Eye Color</p>
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
                      alignItems: "center",
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
                    <p>{edges.node.eyeColor || "-"}</p>
                    <p>
                      {edges.node.filmConnection.films.map((film: any) => (
                        <p key={film.title}>- {film.title}</p>
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
