import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PredictionForm from '../components/PredictionForm';
import DashboardStats from '../components/DashboardStats';
import PredictionChart from '../components/PredictionChart';
import FeatureImportanceChart from '../components/FeatureImportanceChart';
import { MetricsProvider } from '../context/MetricsContext';
import pinkRibbon from '../assets/pink-ribbon.png';

export default function Home() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePredictionResult = (result) => {
        navigate('/results', { state: { result } });
    };

    return (
        <MetricsProvider>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center mb-8">
                    <img 
                        src={pinkRibbon} 
                        alt="Pink Ribbon" 
                        className="h-8 w-8 md:h-12 md:w-12 mb-3"
                    />
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-pink-600 px-2">
                        Predicción de Cáncer de Mama
                    </h1>
                </div>

                <DashboardStats />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-lg shadow-lg">
                        <PredictionForm 
                            onPredictionResult={handlePredictionResult}
                            onLoadingChange={setLoading}
                        />
                    </div>
                    <PredictionChart />
                </div>

                <FeatureImportanceChart />
            </div>
        </MetricsProvider>
    );
} 