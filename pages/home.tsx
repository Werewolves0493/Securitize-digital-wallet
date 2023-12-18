import * as React from 'react';
import axios from 'axios';
import Link from 'next/link';

interface WalletType {
  address: string;
  isFavorite: number;
}

const Home = () => {
  const [wallets, setWallets] = React.useState<WalletType[]>([]);

  React.useEffect(() => {
    axios.get('/wallet').then((response) => {
      setWallets(response.data.walletData);
    }).catch((error) => {
      alert(error.message);
    });
  }, []);

  const [newWallet, setNewWallet] = React.useState("");

  const addWallet = () => {
    if (newWallet === "") {
      return;
    }
    
    axios({
      method: "POST",
      url: "/wallet",
      data: {
        'address': newWallet, 'isFavorite': 0
      },
    }).then((response: any) => {
      alert(response.data.message);

      const currentWallets = wallets;
      setWallets([...currentWallets, response.data.newWallet]);

      setNewWallet("");
    }).catch((error) => {
      alert(error);
    });
  }

  const removeWallet = (address: string) => {
    axios({
      method: "DELETE",
      url: `/wallet/${address}`,
    }).then((response: any) => {
      alert(response.data.message);

      const currentWallets = wallets.filter((item) => item.address !== address);
      setWallets([...currentWallets]);

    }).catch((error) => {
      alert(error);
    });
  }

  const changeFavorite = (wallet: WalletType) => {
    axios({
      method: "PUT",
      url: `/wallet/${wallet.address}`,
      data: {
        'address': wallet.address, 'isFavorite': !wallet.isFavorite
      },
    }).then((response: any) => {
      alert(response.data.message);

      const currentWallets = wallets.map((item) => {
        if (item.address === wallet.address) {
          return response.data.existingWallet;
        } else {
          return item;
        }
      });

      setWallets([...currentWallets]);
    }).catch((error) => {
      alert(error);
    });
  }

  // const sortByAddress = () => {
  //   const currentWallets = wallets;

  // }

  return (
    <div style={{ padding: "10px 20px" }}>
      <h1>Wallet List</h1>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ display: 'flex', gap: '10px', width: '600px', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ width: "300px", textAlign: 'center', cursor: 'pointer' }}>Address</div>
          <div style={{ cursor: 'pointer' }}>Favorite</div>
          <div>Delete</div>
        </div>
        {
          wallets.map((wallet: WalletType) => {
            return <div key={wallet.address} style={{ display: 'flex', gap: '10px', width: '600px', justifyContent: 'space-between', marginBottom: '5px' }}>
              <div style={{ width: "300px" }}><Link href={`/detailed/${wallet.address}`}>{wallet.address}</Link></div>
              <div onClick={() => changeFavorite(wallet)} style={{ cursor: 'pointer' }}>{wallet.isFavorite ? 'Yes' : 'No'}</div>
              <div><button onClick={() => removeWallet(wallet.address)}>Delete</button></div>
            </div>
          })
        }
      </div>

      <div style={{ display: 'flex', gap: "10px" }}>
        <button style={{ fontSize: 'large' }} onClick={() => addWallet()}>Add Wallet</button>
        <input value={newWallet} type='text' placeholder="Enter your wallet address" onChange={((e) => { setNewWallet(e.target.value) })} />
      </div>
    </div>
  );
};

export default Home;
