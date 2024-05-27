import { List, Divider, Button } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Node } from "../type";

interface PeopleListProps {
  data: any;
  fetchMore: any;
  loading: boolean;
  error: any;
}

function PeopleList({ data, fetchMore, loading, error }: PeopleListProps) {
  // set pagination states
  const [pageCursors, setPageCursors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  // set favorite states
  const [favorites, setFavorites] = useState<Node[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

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

  // handle like button
  const markAsFavorite = (node: Node) => {
    // Get the current list of favorite characters
    let favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites") as string)
      : [];

    // If the character is already a favorite, remove it from the list
    if (favorites.some((favorite: Node) => favorite.id === node.id)) {
      favorites = favorites.filter((favorite: Node) => favorite.id !== node.id);
    }
    // If the character is not a favorite, add it to the list
    else {
      favorites.push(node);
    }

    // Update the favorites in state and localStorage
    setFavorites(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
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
        <p>Like</p>
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
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: "10px",
                      justifyItems: "center",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={{
                        pathname: `/people/${edges.node.id}`,
                        search: location.search,
                      }}
                    >
                      <p>{edges.node.name || "-"}</p>
                    </Link>
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
                      <Button onClick={() => markAsFavorite(edges.node)}>
                        {favorites?.some(
                          (favorite) => favorite.id === edges.node.id
                        ) ? (
                          <HeartFilled />
                        ) : (
                          <HeartOutlined />
                        )}
                      </Button>
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
