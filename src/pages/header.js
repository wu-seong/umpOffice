import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        UMP OFFICE
      </h1>
    </header>
  );
}

export default Header;
