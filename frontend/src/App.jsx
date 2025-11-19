import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StatsPage from './pages/StatsPage';
import RedirectPage from './pages/RedirectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="code/:code" element={<StatsPage />} />
        </Route>
        <Route path="/:code" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
