import { useEffect, useState } from "react";
import {
  UserOutlined,
  EyeOutlined,
  RedditOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { Radio, Checkbox, List, Button } from "antd";
import { FilterConditions } from "../type.ts";
import { useSearchParams } from "react-router-dom";

interface FilterProps {
  data: any;
  loading: boolean;
  error: any;
  setFilterConditions: React.Dispatch<React.SetStateAction<FilterConditions>>;
}

function Filters({ data, loading, error }: FilterProps) {
  // set up states
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [selectedEyeColor, setSelectedEyeColor] = useState<string[]>([]);

  // Function to update the filters
  const updateFilters = () => {
    setSearchParams({
      gender: selectedGender,
      species: selectedSpecies.join(","),
      eyeColor: selectedEyeColor.join(","),
    });
  };

  useEffect(() => {
    updateFilters();
  }, [selectedGender, selectedSpecies, selectedEyeColor]);

  // render data
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) return <p>Error: {error.message}</p>;

  // clear all states if data change
  useEffect(() => {
    // clear all conditions if data change
    setSelectedGender("");
    setSelectedEyeColor([]);
    setSelectedSpecies([]);
  }, [data]);

  // get options from data
  const genderOptions = Array.from(
    new Set(data.map((edge: any) => edge.node.gender)) ?? []
  ).map((option) => option || "Others") as string[];

  const eyeColorOptions = Array.from(
    new Set(data.map((edge: any) => edge.node.eyeColor)) ?? []
  ).map((option) => option || "Others") as string[];

  const speciesOptions = Array.from(
    new Set(data.flatMap((edge: any) => edge.node.species?.name) ?? [])
  ).map((option) => option || "Others") as string[];

  // put options into filters
  const filters = [
    {
      key: "gender",
      icon: <UserOutlined />,
      label: "Gender",
      type: "radio",
      children: genderOptions.map((option) => ({
        key: option,
        label: option,
      })),
    },
    {
      key: "eyecolor",
      icon: <EyeOutlined />,
      label: "Eye Color",
      type: "checkbox",
      children: eyeColorOptions.map((option) => ({
        key: option,
        label: option,
      })),
    },
    {
      key: "species",
      icon: <RedditOutlined />,
      label: "Species",
      type: "checkbox",
      children: speciesOptions.map((option) => ({
        key: option,
        label: option,
      })),
    },
  ];

  // handle filters change
  const handleGenderChange = (e: any) => {
    const value = e.target.value;
    setSelectedGender(value);
  };

  const handleEyeColorChange: (checkedValues: string[]) => void = (
    checkedValues
  ) => {
    setSelectedEyeColor(checkedValues);
  };

  const handleSpeciesChange: (checkedValues: string[]) => void = (
    checkedValues
  ) => {
    setSelectedSpecies(checkedValues);
  };

  const clearFilters = () => {
    setSelectedGender("");
    setSelectedEyeColor([]);
    setSelectedSpecies([]);
    // setFilterConditions({ gender: "", film: "", eyeColor: [], species: [] });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" onClick={clearFilters}>
          <ClearOutlined />
          Clear All Filters
        </Button>
      </div>
      <List
        style={{ width: "100%", padding: "10px" }}
        dataSource={filters}
        renderItem={(filter) => (
          <List.Item>
            <List.Item.Meta
              title={<div style={{ fontSize: "15px" }}>{filter?.label}</div>}
              avatar={
                <div style={{ fontSize: "15px", marginLeft: "15px" }}>
                  {filter?.icon}
                </div>
              }
              description={
                filter.type === "radio" ? (
                  <Radio.Group
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    {filter.children.map(
                      (child) =>
                        child.key !== "Others" && (
                          <div key={child.key} style={{ marginBottom: "10px" }}>
                            <Radio value={child.key}>{child.label}</Radio>
                          </div>
                        )
                    )}
                  </Radio.Group>
                ) : filter.type === "checkbox" ? (
                  filter.key === "eyecolor" ? (
                    <Checkbox.Group
                      onChange={handleEyeColorChange}
                      value={selectedEyeColor}
                    >
                      {filter.children.map(
                        (child) =>
                          child.key !== "Others" && (
                            <div
                              key={child.key}
                              style={{ marginBottom: "10px" }}
                            >
                              <Checkbox value={child.key}>
                                {child.label}
                              </Checkbox>
                            </div>
                          )
                      )}
                    </Checkbox.Group>
                  ) : (
                    <Checkbox.Group
                      onChange={handleSpeciesChange}
                      value={selectedSpecies}
                    >
                      {filter.children.map(
                        (child) =>
                          child.key !== "Others" && (
                            <div
                              key={child.key}
                              style={{ marginBottom: "10px" }}
                            >
                              <Checkbox value={child.key}>
                                {child.label}
                              </Checkbox>
                            </div>
                          )
                      )}
                    </Checkbox.Group>
                  )
                ) : null
              }
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default Filters;
