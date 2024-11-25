import { useEffect, useState } from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer
} from 'recharts';

export default function ModelMetrics({ metrics }) {
    const [radarData, setRadarData] = useState([]);

    useEffect(() => {
        if (metrics) {
            setRadarData([
                { metric: 'Precisión', value: metrics.accuracy * 100 },
                { metric: 'Sensibilidad', value: metrics.recall * 100 },
                { metric: 'Especificidad', value: metrics.specificity * 100 },
                { metric: 'F1-Score', value: metrics.f1 * 100 },
                { metric: 'ROC AUC', value: metrics.roc_auc * 100 }
            ]);
        }
    }, [metrics]);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Métricas del Modelo
            </h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                            name="Métricas"
                            dataKey="value"
                            stroke="#60a5fa"
                            fill="#60a5fa"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 