import * as React from "react";
import Select from "react-select";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarning,
  faEdit,
  faCheck,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "components/atoms/Button";
import { Input } from "components/atoms/Input";
import { Label } from "components/atoms/Label";

interface Props {
  query: { address?: string };
}

interface SelectOptionProps {
  label: string;
  value: string;
}

const Wallet: NextPage<Props> = ({ query }) => {
  const address = query.address;

  const [ether, setEther] = React.useState(0.0);
  const [USD, setUSD] = React.useState(0.0);
  const [EUR, setEUR] = React.useState(0.0);
  const [firstTransaction, setFirstTransaction] = React.useState(0);
  const [isOld, setIsOld] = React.useState(false);
  const [selected, setSelected] = React.useState<SelectOptionProps>();
  const [rate, setRate] = React.useState({ usd: "0", eur: "0" });

  const [editable, setEditable] = React.useState(false);
  const [current, setCurrent] = React.useState("0");
  const [balance, setBalance] = React.useState(0);

  const options: SelectOptionProps[] = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
  ];

  React.useEffect(() => {
    setBalance(
      ether * (selected?.value === "usd" ? Number(rate.usd) : Number(rate.eur))
    );
    console.log(rate.usd, rate.eur, "heree");
  }, [rate, selected, ether]);

  React.useEffect(() => {
    if (selected?.value === "usd") setCurrent(rate.usd);
    else setCurrent(rate.eur);
  }, [selected, rate]);

  React.useEffect(() => {
    setSelected(options[0]);

    axios
      .get(`/api/getEtherBalance/${address}`)
      .then((response) => {
        setEther(Number(response.data));
      })
      .catch((error) => {
        alert(error.message);
      });

    axios
      .get("/rate")
      .then((response) => {
        setRate({ ...response.data.rate });
      })
      .catch((error) => {
        alert(error.message);
      });

    axios
      .get("/api/getEURandUSDPrice")
      .then((response) => {
        const ethPrice = response.data.ethereum;
        setUSD(Number(ethPrice.usd));
        setEUR(Number(ethPrice.eur));
      })
      .catch((error) => {
        alert(error.message);
      });

    axios
      .get(`/api/getFirstTransactionTime/${address}`)
      .then((response) => {
        setFirstTransaction(Number(response.data));
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  React.useEffect(() => {
    if (firstTransaction > 0) {
      const currentTimeStamp = new Date().getTime() / 1000;
      if (currentTimeStamp - firstTransaction > 365 * 3600 * 24) setIsOld(true);
    }
  }, [firstTransaction]);

  const updateRate = () => {
    const currentRate = rate;
    if (selected?.value === "usd") currentRate.usd = current;
    else currentRate.eur = current;

    axios({
      method: "POST",
      url: "/rate",
      data: currentRate,
    })
      .then((response: any) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error);
      });

    setRate({ ...currentRate });
  };

  return (
    <div className="mt-4" style={{ width: "600px", alignItems: "center" }}>
      <div
        className="d-flex px-4 py-2"
        style={{
          alignItems: "center",
          backgroundColor: isOld ? "pink" : "greenyellow",
          borderRadius: "5px",
          gap: "5px",
          textAlign: "left",
          marginBottom: "30px",
        }}
      >
        <FontAwesomeIcon color="#f00" icon={faWarning} />
        Wallet is {isOld ? "Old" : "not Old"}!
      </div>
      <div className="d-flex" style={{ gap: "20px" }}>
        <div
          className="d-flex"
          style={{
            backgroundColor: "#eee",
            border: "1px solid grey",
            borderRadius: "5px",
            flexDirection: "column",
            gap: "15px",
            padding: "10px",
            width: "50%",
          }}
        >
          <div className="d-flex" style={{ justifyContent: "flex-end" }}>
            <div>
              {!editable ? (
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => setEditable(true)}
                />
              ) : (
                <div className="d-flex" style={{ gap: "10px" }}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    onClick={() => updateRate()}
                  />
                  <FontAwesomeIcon
                    icon={faClose}
                    onClick={() => setEditable(false)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="container d-flex">
              <Label className="sm-5 md-5 lg-5">Custom rate:</Label>
              <Input
                className="sm-7 md-7 lg-7"
                type="text"
                value={current}
                disabled={!editable}
                onChange={(e) => {
                  setCurrent(e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "10px", gap: "5px", display: "flex" }}>
            <Label className="md-5">Real rate:</Label>
            {selected?.value === "usd" ? (
              <Input className="md-7" type="text" value={USD} disabled />
            ) : (
              <Input className="md-7" type="text" value={EUR} disabled />
            )}
          </div>
        </div>
        <div
          className="d-flex"
          style={{
            backgroundColor: "#eee",
            border: "1px solid grey",
            borderRadius: "5px",
            flexDirection: "column",
            gap: "15px",
            padding: "10px",
            width: "50%",
          }}
        >
          <Select
            defaultValue={selected}
            options={options}
            onChange={(e: any) =>
              setSelected(options.find((each) => each.value === e?.value))
            }
          />
          <p>
            {ether} ETH = {balance}
            {selected?.value === "usd" ? "$" : "€"}
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const query = {
    address: ctx.query.id || null,
  };
  return { props: { query } };
}

export default Wallet;
