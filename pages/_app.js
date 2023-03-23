import '../styles/globals.css'
import { AdminProvider } from '../context/AdminProvider'
import { Provider } from 'react-redux';
import store from '../redux/store';
import NextNProgress from 'nextjs-progressbar';


export default function App({ Component, pageProps }) {
  return (
    <AdminProvider>
      <Provider store={store}>
      <NextNProgress color="#14B8A6" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={false} />
      <Component {...pageProps} />
      </Provider>
    </AdminProvider>
  )
}