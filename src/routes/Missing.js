import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "components/Home/HomeShared";
import { ClickHere } from "components/Shared";

export default () => {
  return (
    <Container>
      <div style={{ width: "33%" }} />
      <div>
        <ClickHere>
          <FontAwesomeIcon icon={faArrowUp} size={"2x"} />
        </ClickHere>
        <div style={{ fontWeight: "600" }}>
          Wrogn Address , Please Go back Home
        </div>
      </div>
      <div style={{ width: "33%" }} />
    </Container>
  );
};
