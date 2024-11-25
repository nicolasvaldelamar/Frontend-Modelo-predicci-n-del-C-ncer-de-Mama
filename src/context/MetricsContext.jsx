import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MetricsContext = createContext();

export function MetricsProvider({ children }) {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMetrics = async () => {
        try {
            const response = await axios.get(process.env.VITE_API_URL+'/metrics');
            setMetrics(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar las métricas');
            console.error('Error fetching metrics:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics();
        // Actualizar métricas cada 5 minutos
        const interval = setInterval(fetchMetrics, 300000);
        return () => clearInterval(interval);
    }, []);

    return (
        <MetricsContext.Provider value={{ metrics, loading, error, refreshMetrics: fetchMetrics }}>
            {children}
        </MetricsContext.Provider>
    );
}

export function useMetrics() {
    return useContext(MetricsContext);
} 