import * as React from 'react';
import axios from 'axios';
import { NextPage, NextPageContext } from 'next';

interface Props {
  query: { address?: string };
}

const Wallet: NextPage<Props> = ({ query }) => {
  const address = query.address;

  const [ether, setEther] = React.useState(0.0);
  const [USD, setUSD] = React.useState(0.0);
  const [EUR, setEUR] = React.useState(0.0);
  const [firstTransaction, setFirstTransaction] = React.useState(0);
  const [isOld, setIsOld] = React.useState(false);
  const [selected, setSelected] = React.useState('usd');
  const [rate, setRate] = React.useState({ usd: '0', eur: '0' });

  const [editable, setEditable] = React.useState(false);
  const [current, setCurrent] = React.useState('0');
  const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    setBalance(ether * (selected === 'usd' ? Number(rate.usd) : Number(rate.eur)));
    console.log(rate.usd, rate.eur, "heree");
  }, [rate, selected, ether])

  React.useEffect(() => {
    if (selected === 'usd') setCurrent(rate.usd);
    else setCurrent(rate.eur);
  }, [selected, rate])

  React.useEffect(() => {
    axios.get(`/api/getEtherBalance/${address}`).then((response) => {
      setEther(Number(response.data));
    }).catch((error) => {
      alert(error.message);
    });

    axios.get('/rate').then((response) => {
      setRate({...response.data.rate});
    }).catch((error) => {
      alert(error.message);
    });

    axios.get('/api/getEURandUSDPrice').then((response) => {
      const ethPrice = response.data.ethereum;
      setUSD(Number(ethPrice.usd));
      setEUR(Number(ethPrice.eur));
    }).catch((error) => {
      alert(error.message);
    });

    axios.get(`/api/getFirstTransactionTime/${address}`).then((response) => {
      setFirstTransaction(Number(response.data));
    }).catch((error) => {
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
    if (selected === 'usd') currentRate.usd = current;
    else currentRate.eur = current;
    
    axios({
      method: "POST",
      url: "/rate",
      data: currentRate,
    }).then((response: any) => {
      alert(response.data.message);
    }).catch((error) => {
      alert(error);
    });

    setRate({...currentRate});
  }

  return (
    <div style={{ width: '600px', alignItems: 'center' }}>
      <div style={{ backgroundColor: isOld ? 'pink' : 'greenyellow', borderRadius: '5px', textAlign: 'center', marginBottom: '30px' }}>
        Wallet is {isOld ? 'Old' : 'not Old'}!
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <div style={{ marginBottom: '10px', gap: '5px', display: 'flex' }}>
            Custom rate:
            <input type='text' value={current} disabled={!editable} onChange={(e) => { setCurrent(e.target.value) }} />
            <button onClick={() => setEditable(!editable)}>Edit</button>
            <button onClick={() => updateRate()}>Save</button>
          </div>
          Real rate:
          {selected === 'usd' ? <input type="text" value={USD} disabled />
            : <input type="text" value={EUR} disabled />}
        </div>
        <div>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
          <p>{ether} ETH = {balance}{selected === 'usd' ? '$' : '€'}</p>
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
