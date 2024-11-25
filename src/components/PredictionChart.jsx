import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { api } from '../services/api';

export default function PredictionChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const predictions = await api.getPredictionHistory();
                const groupedData = groupPredictionsByMonth(predictions);
                setData(groupedData);
            } catch (error) {
                console.error('Error:', error);
                setData([]); // Datos vacíos en caso de error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const groupPredictionsByMonth = (predictions) => {
        const grouped = predictions.reduce((acc, prediction) => {
            const date = new Date(prediction.createdAt);
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!acc[monthYear]) {
                acc[monthYear] = {
                    date: monthYear,
                    benigno: 0,
                    maligno: 0
                };
            }
            
            if (prediction.tumorType === 'benigno') {
                acc[monthYear].benigno += 1;
            } else {
                acc[monthYear].maligno += 1;
            }
            
            return acc;
        }, {});

        return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const [year, month] = label.split('-');
            return (
                <div className="bg-white p-3 border rounded shadow-lg">
                    <p className="font-semibold">{`${month}/${year}`}</p>
                    <p className="text-green-600">{`Benignos: ${payload[0].value}`}</p>
                    <p className="text-red-600">{`Malignos: ${payload[1].value}`}</p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Historial de Predicciones
                </h3>
                <div className="animate-pulse flex justify-center items-center h-80 bg-gray-100">
                    Cargando gráfico...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Historial de Predicciones
            </h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="date" 
                            tickFormatter={(date) => {
                                const [year, month] = date.split('-');
                                return `${month}/${year.slice(2)}`;
                            }}
                        />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area 
                            type="monotone" 
                            dataKey="benigno" 
                            name="Benignos"
                            stackId="1"
                            stroke="#4ade80" 
                            fill="#4ade80" 
                        />
                        <Area 
                            type="monotone" 
                            dataKey="maligno" 
                            name="Malignos"
                            stackId="1"
                            stroke="#f87171" 
                            fill="#f87171" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 