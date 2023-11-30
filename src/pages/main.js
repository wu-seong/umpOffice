import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/scenario1")}>시나리오1</button>
      <button onClick={() => navigate("/scenario2")}>시나리오2</button>
    </div>
  );
};
export default Main;
