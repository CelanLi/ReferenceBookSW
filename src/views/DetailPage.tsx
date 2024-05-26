import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Button, Layout, Menu } from "antd";
import { Descriptions } from "antd";

const { Header, Content, Footer } = Layout;

function DetailPage() {
  // fetch people id from url
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const GET_PERSON = gql`
    query GetPerson($id: ID!) {
      person(id: $id) {
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
    }
  `;

  const { data, loading, error } = useQuery(GET_PERSON, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Layout style={{ width: "100%", minHeight: "100vh" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: "10px 50px" }}>
          <Button style={{ border: "none" }} onClick={() => navigate("/")}>
            Back
          </Button>
          <Descriptions title="Person Info" bordered>
            <Descriptions.Item label="Name">
              {data.person.name || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Height">
              {data.person.height || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {data.person.gender || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Eye Color">
              {data.person.eyeColor || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Species">
              {data.person.species?.name || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Homeworld">
              {data.person.homeworld?.name || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Film Connections">
              {data.person.filmConnection?.films.map(
                (film: any, index: any) => <div key={index}>{film.title}</div>
              ) || "-"}
            </Descriptions.Item>
          </Descriptions>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default DetailPage;
