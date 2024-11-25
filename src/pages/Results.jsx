import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Results() {
    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state?.result;

    useEffect(() => {
        if (!result) {
            navigate('/');
        }
    }, [result, navigate]);

    if (!result) return null;

    const isBenign = result.tumor_type === "benigno";

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                        isBenign ? 'bg-green-100' : 'bg-red-100'
                    } mb-4`}>
                        <span className={`text-4xl ${
                            isBenign ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {isBenign ? '✓' : '⚠'}
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Resultado del Análisis
                    </h2>
                    <p className={`text-xl font-semibold ${
                        isBenign ? 'text-green-600' : 'text-red-600'
                    }`}>
                        Tumor {result.tumor_type}
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg shadow">
                            <p className="text-sm text-gray-500">Clasificación</p>
                            <p className="text-xl font-bold text-gray-900">
                                {result.prediction}
                            </p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow">
                            <p className="text-sm text-gray-500">Tipo</p>
                            <p className={`text-xl font-bold ${
                                isBenign ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {result.tumor_type.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg mb-8 ${
                    isBenign ? 'bg-green-50' : 'bg-red-50'
                }`}>
                    <p className={`text-sm ${
                        isBenign ? 'text-green-700' : 'text-red-700'
                    }`}>
                        {isBenign 
                            ? "Los resultados sugieren que el tumor es benigno. Sin embargo, consulte con un profesional médico para una evaluación completa."
                            : "Los resultados sugieren que el tumor podría ser maligno. Es importante consultar con un profesional médico inmediatamente."}
                    </p>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                 transition-colors duration-200 font-semibold"
                    >
                        Nueva Predicción
                    </button>
                </div>
            </div>
        </div>
    );
} 