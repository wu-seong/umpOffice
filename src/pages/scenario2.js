import axios from "axios";
import { useState, useEffect } from "react";

const Scenario2 = () => {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [techList, setTechList] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/technology_name")
      .then((res) => {
        setTechList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredResult(
      techList.filter((tech) =>
        tech.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, techList]);

  const searchHandler = () => {
    if (!search) {
      alert("검색어를 입력하세요.");
      return;
    }

    if (!techList.some((tech) => tech.name === search)) {
      alert("없는 기술입니다 아래 리스트를 참고하여 다시 입력해주세요.");
      return;
    }

    axios
      .post("http://localhost:3001/api/scenario2", { data: search })
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          alert(`${search} 기술은 사용된 프로젝트가 없습니다`);
          setSearched(false);
        } else {
          setResult(res.data);
          setSearched(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const selectTech = (name) => {
    setSearch(name);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={updateSearch}
        onKeyPress={(event) => {
          if (event.key == "Enter") {
            searchHandler();
          }
        }}
      />
      <button onClick={searchHandler}>검색</button>
      <div style={{ height: "220px", overflow: "scroll" }}>
        {filteredResult.map((tech, index) => (
          <div key={index} onClick={() => selectTech(tech.name)}>
            {tech.name}
          </div>
        ))}
      </div>
      {searched && (
        <table
          style={{ border: "1px solid black", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black" }}>Technology Name</th>
              <th style={{ border: "1px solid black" }}>Usage Count</th>
              <th style={{ border: "1px solid black" }}>Developer Name</th>
              <th style={{ border: "1px solid black" }}>Developer ID</th>
            </tr>
          </thead>
          <tbody>
            {result.map((row, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black" }}>
                  {row.Technology_Name}
                </td>
                <td style={{ border: "1px solid black" }}>{row.Usage_Count}</td>
                <td style={{ border: "1px solid black" }}>
                  {row.Developer_Name}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {row.Developer_ID}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Scenario2;
