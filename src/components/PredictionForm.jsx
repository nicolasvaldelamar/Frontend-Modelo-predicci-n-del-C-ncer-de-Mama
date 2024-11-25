import { useState } from 'react';
import { api } from '../services/api';

export default function PredictionForm({ onPredictionResult }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        clumpThickness: '',
        uniformityCellSize: '',
        uniformityCellShape: '',
        marginalAdhesion: '',
        singleEpithelialCellSize: '',
        bareNuclei: '',
        blandChromatin: '',
        normalNucleoli: '',
        mitoses: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const features = Object.values(values).map(Number);
            const response = await api.predict(features);
            onPredictionResult(response);
        } catch (err) {
            setError(err.message || 'Error al realizar la predicción');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value === '' || (Number(value) >= 1 && Number(value) <= 10)) {
            setValues(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(values).map(([key, value]) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                            type="number"
                            name={key}
                            value={value}
                            onChange={handleChange}
                            min="1"
                            max="10"
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                     focus:outline-none focus:ring-2 focus:ring-pink-500
                                     disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="1-10"
                        />
                    </div>
                ))}
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold
                          transition-colors duration-200
                          ${loading 
                              ? 'bg-pink-300 cursor-not-allowed' 
                              : 'bg-pink-500 hover:bg-pink-600'
                          }`}
            >
                {loading ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                    </div>
                ) : (
                    'Realizar Predicción'
                )}
            </button>
        </form>
    );
} 