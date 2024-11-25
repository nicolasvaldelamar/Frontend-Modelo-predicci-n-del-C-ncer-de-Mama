import { Link, useLocation } from 'react-router-dom';
import pinkRibbon from '../assets/pink-ribbon.png';

export default function Navbar({ appName }) {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img 
                                src={pinkRibbon} 
                                alt="Pink Ribbon" 
                                className="h-8 w-8 mr-3"
                            />
                            <span className="text-xl font-bold text-pink-600 hidden md:block">
                                {appName}
                            </span>
                        </Link>
                    </div>
                    <div className="flex space-x-4 md:space-x-8 items-center">
                        <Link 
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === '/' 
                                    ? 'text-pink-600 bg-pink-50' 
                                    : 'text-gray-500 hover:text-pink-600'
                            }`}
                        >
                            Predicción
                        </Link>
                        <Link 
                            to="/glossary"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === '/glossary' 
                                    ? 'text-pink-600 bg-pink-50' 
                                    : 'text-gray-500 hover:text-pink-600'
                            }`}
                        >
                            Glosario
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
} 