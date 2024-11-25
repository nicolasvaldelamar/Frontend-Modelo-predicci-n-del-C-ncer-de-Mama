import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';

export default function FeatureImportanceChart() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.getFeatureImportance();
                const formattedData = response.map(item => ({
                    name: item.feature.replace(/_/g, ' '),
                    value: item.importance
                }));
                setData(formattedData);
            } catch (err) {
                setError('Error al cargar la importancia de características');
                console.error('Error:', err);
                // Usar datos por defecto en caso de error
                setData([
                    { name: 'Uniformity of Cell Size', value: 0.85 },
                    { name: 'Uniformity of Cell Shape', value: 0.82 },
                    { name: 'Bare Nuclei', value: 0.78 },
                    { name: 'Bland Chromatin', value: 0.75 },
                    { name: 'Clump Thickness', value: 0.72 },
                    { name: 'Normal Nucleoli', value: 0.68 },
                    { name: 'Marginal Adhesion', value: 0.65 },
                    { name: 'Single Epithelial Cell Size', value: 0.62 },
                    { name: 'Mitoses', value: 0.58 }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const dimensions = {
        height: windowWidth < 640 ? 800 : windowWidth < 768 ? 700 : windowWidth < 1024 ? 600 : 500,
        marginLeft: windowWidth < 640 ? 120 : windowWidth < 768 ? 150 : windowWidth < 1024 ? 180 : 200,
        fontSize: windowWidth < 640 ? 10 : windowWidth < 768 ? 11 : 12,
        labelWidth: windowWidth < 640 ? 110 : windowWidth < 768 ? 140 : windowWidth < 1024 ? 170 : 190
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Importancia de Características
                </h3>
                <div className="animate-pulse flex justify-center items-center h-[400px] bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Cargando gráfico...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Importancia de Características
            </h3>
            <div style={{ height: `${dimensions.height}px` }} className="w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 20,
                            right: 30,
                            left: dimensions.marginLeft,
                            bottom: 20
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            type="number"
                            domain={[0, 1]}
                            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={dimensions.labelWidth}
                            tick={{
                                fontSize: dimensions.fontSize,
                                width: dimensions.labelWidth - 10
                            }}
                        />
                        <Tooltip
                            formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Importancia']}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.375rem',
                                padding: '0.5rem'
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#FF69B4"
                            radius={[0, 4, 4, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 