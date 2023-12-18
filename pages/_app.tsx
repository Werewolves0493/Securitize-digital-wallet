import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div style={{ display: 'flex', maxWidth: 1100 }}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
