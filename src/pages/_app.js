import { LoggedUserProvider } from '@/contextStore/LoggedUserContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <LoggedUserProvider>
      <Component {...pageProps} />
    </LoggedUserProvider>
  )
}
