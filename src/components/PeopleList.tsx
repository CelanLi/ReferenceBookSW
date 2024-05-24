import { List, Divider } from "antd";

interface ListProps {
  items: any[];
}

function PeopleList({ items }: ListProps) {
  console.log("allPeople", items);
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "10px",
        }}
      >
        <p>Name</p>
        <p>Height</p>
        <p>Homeworld</p>
        <p>Species</p>
        <p>Gender</p>
        <p>Hair Color</p>
      </div>
      <Divider style={{ borderWidth: 2 }} />
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              description={
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      gap: "10px",
                    }}
                  >
                    <p>{item.name || "-"}</p>
                    <p>{item.height || "-"}</p>
                    <p>{(item.homeworld && item.homeworld.name) || "-"}</p>
                    <p>{(item.species && item.species.name) || "-"}</p>
                    <p>{item.gender || "-"}</p>
                    <p>{item.hairColor || "-"}</p>
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default PeopleList;
