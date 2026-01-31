import './App.css'
import MainRouter from './app/providers/router'
import Footer from './shared/Footer'
import Header from './shared/Header'
import { ThemeProvider } from "./shared/ThemeContext";



function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainRouter />
      <Footer />
    </ThemeProvider>
  )
}

export default App
