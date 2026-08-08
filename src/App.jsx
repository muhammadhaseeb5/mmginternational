import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import CatalogueHub from './pages/CatalogueHub'
import CatalogueItem from './pages/CatalogueItem'

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogue" element={<CatalogueHub />} />
          <Route path="catalogue/:slug" element={<CatalogueItem />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
