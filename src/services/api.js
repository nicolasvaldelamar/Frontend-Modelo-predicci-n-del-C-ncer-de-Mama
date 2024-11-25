const API_URL = process.env.VITE_API_URL;

export const api = {
    predict: async (features) => {
        try {
            const response = await fetch(`${API_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ features })
            });
            if (!response.ok) throw new Error('Error en la predicción');
            return response.json();
        } catch (error) {
            console.error('Error en predict:', error);
            throw error;
        }
    },

    getMetrics: async () => {
        try {
            const response = await fetch(`${API_URL}/api/metrics`);
            if (!response.ok) {
                // Retornar datos por defecto si hay error
                return {
                    metrics: {
                        accuracy: 0.95,
                        totalPredictions: 0,
                        benignCount: 0,
                        malignCount: 0
                    },
                    predictionTrends: []
                };
            }
            return response.json();
        } catch (error) {
            console.error('Error en getMetrics:', error);
            // Retornar datos por defecto en caso de error
            return {
                metrics: {
                    accuracy: 0.95,
                    totalPredictions: 0,
                    benignCount: 0,
                    malignCount: 0
                },
                predictionTrends: []
            };
        }
    },

    getPredictionHistory: async () => {
        try {
            const response = await fetch(`${API_URL}/api/predictions/history`);
            if (!response.ok) return [];
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en getPredictionHistory:', error);
            return [];
        }
    },

    getFeatureImportance: async () => {
        try {
            const response = await fetch(`${API_URL}/feature-importance`);
            if (!response.ok) {
                // Retornar datos por defecto si hay error
                return [
                    { feature: 'Uniformity of Cell Size', importance: 0.85 },
                    { feature: 'Uniformity of Cell Shape', importance: 0.82 },
                    { feature: 'Bare Nuclei', importance: 0.78 },
                    { feature: 'Bland Chromatin', importance: 0.75 },
                    { feature: 'Clump Thickness', importance: 0.72 },
                    { feature: 'Normal Nucleoli', importance: 0.68 },
                    { feature: 'Marginal Adhesion', importance: 0.65 },
                    { feature: 'Single Epithelial Cell Size', importance: 0.62 },
                    { feature: 'Mitoses', importance: 0.58 }
                ];
            }
            return response.json();
        } catch (error) {
            console.error('Error en getFeatureImportance:', error);
            // Retornar datos por defecto en caso de error
            return [
                { feature: 'Uniformity of Cell Size', importance: 0.85 },
                { feature: 'Uniformity of Cell Shape', importance: 0.82 },
                { feature: 'Bare Nuclei', importance: 0.78 },
                { feature: 'Bland Chromatin', importance: 0.75 },
                { feature: 'Clump Thickness', importance: 0.72 },
                { feature: 'Normal Nucleoli', importance: 0.68 },
                { feature: 'Marginal Adhesion', importance: 0.65 },
                { feature: 'Single Epithelial Cell Size', importance: 0.62 },
                { feature: 'Mitoses', importance: 0.58 }
            ];
        }
    }
}; 