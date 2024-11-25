import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Results from './pages/Results';
import Glossary from './pages/Glossary';
import Footer from './components/Footer';
import { MetricsProvider } from './context/MetricsContext';

const APP_NAME = import.meta.env.VITE_APP_NAME;

function App() {
    return (
        <Router>
            <MetricsProvider>
                <div className="min-h-screen flex flex-col bg-gray-50">
                    <Navbar appName={APP_NAME} />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/results" element={<Results />} />
                            <Route path="/glossary" element={<Glossary />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </MetricsProvider>
        </Router>
    );
}

export default App;
