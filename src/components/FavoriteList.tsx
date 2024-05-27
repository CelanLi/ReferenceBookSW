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

function FavoriteList() {
  // set favorite states
  const [favorites, setFavorites] = useState<Node[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the items for the current page
  const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

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
        dataSource={currentItems}
        renderItem={(person: any) => (
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
                        pathname: `/people/${person.id}`,
                        search: location.search,
                      }}
                    >
                      <p>{person.name || "-"}</p>
                    </Link>
                    <p>{person.height || "-"}</p>
                    <p>{(person.homeworld && person.homeworld.name) || "-"}</p>
                    <p>{(person.species && person.species.name) || "-"}</p>
                    <p>{person.gender || "-"}</p>
                    <p>{person.eyeColor || "-"}</p>
                    <p>
                      <Button onClick={() => markAsFavorite(person)}>
                        {favorites?.some(
                          (favorite) => favorite.id === person.id
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
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Button
          style={{ marginLeft: "10px" }}
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <br />
      </div>
    </>
  );
}

export default FavoriteList;
