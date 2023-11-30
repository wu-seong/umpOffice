import axios from "axios";
import { useState, useEffect } from "react";

const Scenario1 = () => {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [empList, setEmpList] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/employee_name")
      .then((res) => {
        setEmpList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredResult(
      empList.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, empList]);

  const searchHandler = () => {
    if (!search) {
      alert("검색어를 입력하세요.");
      return;
    }

    if (!empList.some((emp) => emp.name === search)) {
      alert("없는 직원입니다 아래 리스트를 참고하여 다시 입력해주세요.");
      return;
    }

    axios
      .post("http://localhost:3001/api/scenario1", { data: search })
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          alert(`${search} 직원은 참여한 프로젝트가 없습니다`);
          setSearched(false);
        } else {
          setResult(res.data);
          setSearched(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const selectEmp = (name) => {
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
        {filteredResult.map((emp, index) => (
          <div key={index} onClick={() => selectEmp(emp.name)}>
            {emp.name}
          </div>
        ))}
      </div>

      {searched && (
        <table
          style={{ border: "1px solid black", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black" }}>Name</th>
              <th style={{ border: "1px solid black" }}>
                Programmer Project ID
              </th>
              <th style={{ border: "1px solid black" }}>Join Start Date</th>
              <th style={{ border: "1px solid black" }}>Join End Date</th>
              <th style={{ border: "1px solid black" }}>Programmer ID</th>
              <th style={{ border: "1px solid black" }}>Project ID</th>
              <th style={{ border: "1px solid black" }}>Duty Name</th>
              <th style={{ border: "1px solid black" }}>Project Name</th>
              <th style={{ border: "1px solid black" }}>Project Start Date</th>
              <th style={{ border: "1px solid black" }}>Project End Date</th>
              <th style={{ border: "1px solid black" }}>Project Description</th>
            </tr>
          </thead>
          <tbody>
            {result.map((row, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black" }}>{row.name}</td>
                <td style={{ border: "1px solid black" }}>
                  {row.Programmer_Project_ID}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {row.join_start_date}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {row.join_end_date}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {row.programmer_ID}
                </td>
                <td style={{ border: "1px solid black" }}>{row.project_ID}</td>
                <td style={{ border: "1px solid black" }}>{row.Duty_Name}</td>
                <td style={{ border: "1px solid black" }}>
                  {row.Project_Name}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {row.Project_Start_Date}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {row.Project_End_Date}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {row.Project_Description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Scenario1;
