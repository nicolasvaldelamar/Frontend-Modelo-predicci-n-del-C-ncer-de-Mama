import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PredictionContext = createContext();

export function PredictionProvider({ children }) {
  const [predictionResult, setPredictionResult] = useState(null);
  const [modelMetrics, setModelMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModelMetrics();
  }, []);

  const fetchModelMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/metrics');
      setModelMetrics(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const makePrediction = async (features) => {
    try {
        const response = await axios.post('http://localhost:3000/predict', {
            features
        });
        return response.data;
    } catch (error) {
        throw error;
    }
  };

  return (
    <PredictionContext.Provider value={{ 
      predictionResult,
      modelMetrics,
      loading,
      error,
      makePrediction 
    }}>
      {children}
    </PredictionContext.Provider>
  );
}

export function usePrediction() {
  return useContext(PredictionContext);
} 