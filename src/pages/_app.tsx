import { Fragment, ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'simplebar-react/dist/simplebar.min.css';
import SettingsProvider from '~/contexts/SettingContext';
import { AppProvider } from '~/contexts/AppContext';
import MuiTheme from '~/theme/MuiTheme';
import SnackbarProvider from '~/components/SnackbarProvider';
import RTL from '~/components/RTL';
import { AppProps } from 'next/app';
import { NextPage } from 'next';

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done()); // small change

nProgress.configure({
  showSpinner: false,
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const AnyComponent = Component;

  const getLayout = AnyComponent.getLayout ?? ((page) => page);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Affiliate Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        {/* <OpenGraphTags /> */}
        <title>Affiliate Store</title>
      </Head>

      <SettingsProvider>
        <AppProvider>
          <MuiTheme>
            <SnackbarProvider>
              <RTL>{getLayout(<AnyComponent {...pageProps} />)}</RTL>
            </SnackbarProvider>
          </MuiTheme>
        </AppProvider>
      </SettingsProvider>
    </Fragment>
  );
};

export default App;
