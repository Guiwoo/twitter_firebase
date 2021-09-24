import {
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getCoinData from "components/CoinApi";
import { trimText } from "components/Shared";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CoinLists = styled.div`
  font-size: 18px;
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.bgColor};
  padding: 15px 5px;
  background-color: gold;
  border-radius: 20px;
  margin-bottom: 50px;
  position: relative;
  text-align: center;
`;

const TheLink = styled.a`
  position: absolute;
  text-decoration: none;
  color: ${(props) => props.theme.fontColor};
  font-size: 12px;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  right: 0;
  bottom: -20px;
`;

const CoinBox = styled.div`
  margin-bottom: 5px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;
const CoinImage = styled.img`
  width: 30;
  height: 30;
  margin-right: 7px;
`;
const CoinText = styled.div`
  font-weight: 500;
  margin-right: 5px;
`;
const CoinTextPer = styled(CoinText)`
  color: ${(props) => (props.coinUp ? "#fc575e" : "#20bf55")};
`;

const ThirdBox = () => {
  const [result, setResult] = useState([]);
  const getData = async () => {
    const { data } = await getCoinData();
    setResult(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <div>
        <CoinLists>
          💵 코인 가격 (CoinGecko)
          <div>
            <TheLink href={"https://www.coingecko.com/ko"}>
              ✈️ CoinGecko 바로가기
            </TheLink>
          </div>
        </CoinLists>
        <div>
          {result?.length > 0 ? (
            result?.map((coinInfo) => (
              <CoinBox key={coinInfo.id}>
                <CoinImage src={coinInfo.image.thumb} />
                <div style={{ display: "flex", width: "100%" }}>
                  <CoinText>{coinInfo.symbol.toUpperCase()}</CoinText>
                  <CoinText>
                    💲{coinInfo.market_data.current_price.usd}
                  </CoinText>
                  <CoinTextPer
                    coinUp={
                      coinInfo.market_data.market_cap_change_percentage_24h >= 0
                    }
                  >
                    {coinInfo.market_data.market_cap_change_percentage_24h >= 0
                      ? "+"
                      : "-"}
                    {trimText(
                      coinInfo.market_data.market_cap_change_percentage_24h
                    )}
                    %
                  </CoinTextPer>
                  <CoinTextPer
                    coinUp={
                      coinInfo.market_data.market_cap_change_percentage_24h >= 0
                    }
                  >
                    {coinInfo.market_data.market_cap_change_percentage_24h >=
                    0 ? (
                      <FontAwesomeIcon icon={faPlaneDeparture} />
                    ) : (
                      <FontAwesomeIcon icon={faPlaneArrival} />
                    )}
                  </CoinTextPer>
                </div>
              </CoinBox>
            ))
          ) : (
            <div>CoinGecko server Error Please retry later</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ThirdBox;
