import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function PredictionResult({ result }) {
    const isBenign = result.tumor_type === "benigno";

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                    isBenign ? 'bg-green-100' : 'bg-red-100'
                } mb-4`}>
                    <span className={`text-2xl ${
                        isBenign ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {isBenign ? '✓' : '⚠'}
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Resultado del Análisis
                </h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Tipo de Tumor</p>
                        <p className={`text-lg font-semibold ${
                            isBenign ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {result.tumor_type.toUpperCase()}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Clasificación</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {result.prediction}
                        </p>
                    </div>
                </div>
            </div>

            <div className={`p-4 rounded-lg ${
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
        </div>
    );
} 