import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function ResultCard({ result }) {
  const isBenign = result.tumor_type === "benigno";
  
  return (
    <div className="card max-w-md mx-auto">
      <div className="flex flex-col items-center">
        {isBenign ? (
          <CheckCircleIcon className="h-16 w-16 text-green-500 animate-pulse-slow" />
        ) : (
          <XCircleIcon className="h-16 w-16 text-red-500 animate-pulse-slow" />
        )}
        
        <h2 className="text-2xl font-bold mt-4 mb-2">
          Resultado del Análisis
        </h2>
        
        <div className={`text-lg font-medium p-2 rounded-full ${
          isBenign 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          Tumor {result.tumor_type}
        </div>
        
        <div className="mt-4 text-gray-600 text-center">
          <p className="text-sm">
            Valor de predicción: {result.prediction}
          </p>
          <p className="text-xs mt-2">
            {isBenign 
              ? "Los resultados sugieren que el tumor es benigno. Sin embargo, consulte con un profesional médico para una evaluación completa."
              : "Los resultados sugieren que el tumor podría ser maligno. Es importante consultar con un profesional médico inmediatamente."}
          </p>
        </div>
      </div>
    </div>
  );
} 