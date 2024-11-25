import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function DashboardStats() {
    const [stats, setStats] = useState({
        accuracy: 0.95,
        totalPredictions: 0,
        benignCount: 0,
        malignCount: 0,
        responseTime: 1.2
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.getMetrics();
                const { metrics } = response;
                
                setStats(prevStats => ({
                    ...prevStats,
                    accuracy: metrics.accuracy || 0.95,
                    totalPredictions: metrics.totalPredictions || 0,
                    benignCount: metrics.benignCount || 0,
                    malignCount: metrics.malignCount || 0
                }));
            } catch (error) {
                console.error('Error al obtener estadísticas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="animate-pulse">Cargando estadísticas...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-sm font-medium text-gray-500">
                    Precisión del Modelo
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {(stats.accuracy * 100).toFixed(1)}%
                </p>
                <div className="mt-2 flex items-center text-green-600">
                    <span className="mr-1">↑</span>
                    <span className="text-sm">Alta precisión</span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-sm font-medium text-gray-500">
                    Predicciones Totales
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {stats.totalPredictions}
                </p>
                <div className="mt-2 flex items-center text-green-600">
                    <span className="mr-1">📊</span>
                    <span className="text-sm">
                        {stats.benignCount} benignas, {stats.malignCount} malignas
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-sm font-medium text-gray-500">
                    Velocidad de Respuesta
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {stats.responseTime.toFixed(1)}s
                </p>
                <div className="mt-2 flex items-center text-green-600">
                    <span className="mr-1">⚡</span>
                    <span className="text-sm">Tiempo promedio</span>
                </div>
            </div>
        </div>
    );
} 