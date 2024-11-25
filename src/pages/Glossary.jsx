import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

export default function Glossary() {
    const [searchTerm, setSearchTerm] = useState('');

    const glossaryItems = [
        {
            name: "Grosor del Grupo (Clump Thickness)",
            description: "Evalúa si las células están en monocapa o en múltiples capas.",
            range: "1-10",
            details: "Las células benignas tienden a agruparse en monocapas, mientras que las células cancerosas suelen crecer en múltiples capas. Un valor alto puede indicar malignidad.",
            importance: "Alta",
            interpretation: {
                low: "1-3: Típicamente benigno, células en monocapa",
                medium: "4-6: Requiere evaluación adicional",
                high: "7-10: Posible indicador de malignidad, múltiples capas"
            }
        },
        {
            name: "Uniformidad del Tamaño Celular (Uniformity of Cell Size)",
            description: "Evalúa la consistencia en el tamaño de las células en la muestra.",
            range: "1-10",
            details: "Las células cancerosas tienden a variar significativamente en tamaño. La uniformidad es una característica típica de las células benignas.",
            importance: "Muy Alta",
            interpretation: {
                low: "1-3: Células uniformes, típico de tejido benigno",
                medium: "4-6: Variación moderada en tamaño",
                high: "7-10: Alta variabilidad, posible indicador de malignidad"
            }
        },
        {
            name: "Uniformidad de la Forma Celular (Uniformity of Cell Shape)",
            description: "Mide la regularidad en la forma de las células.",
            range: "1-10",
            details: "Las células normales mantienen formas regulares y similares entre sí. Las células cancerosas suelen presentar formas irregulares y variables.",
            importance: "Muy Alta",
            interpretation: {
                low: "1-3: Formas celulares regulares y consistentes",
                medium: "4-6: Algunas irregularidades en la forma",
                high: "7-10: Formas muy irregulares, posible malignidad"
            }
        },
        {
            name: "Adhesión Marginal (Marginal Adhesion)",
            description: "Evalúa la capacidad de las células para adherirse entre sí.",
            range: "1-10",
            details: "La pérdida de adhesión celular es una característica común en células cancerosas, lo que les permite desprenderse y potencialmente metastatizar.",
            importance: "Alta",
            interpretation: {
                low: "1-3: Buena adhesión celular",
                medium: "4-6: Adhesión moderada",
                high: "7-10: Pérdida significativa de adhesión"
            }
        },
        {
            name: "Tamaño de Célula Epitelial Individual (Single Epithelial Cell Size)",
            description: "Mide el tamaño de las células epiteliales individuales.",
            range: "1-10",
            details: "Las células cancerosas suelen ser significativamente más grandes que las células normales. Este parámetro es crucial para identificar anomalías celulares.",
            importance: "Media",
            interpretation: {
                low: "1-3: Tamaño celular normal",
                medium: "4-6: Células ligeramente aumentadas",
                high: "7-10: Células significativamente agrandadas"
            }
        },
        {
            name: "Núcleos Desnudos (Bare Nuclei)",
            description: "Evalúa la presencia de núcleos sin citoplasma circundante.",
            range: "1-10",
            details: "Los núcleos desnudos son una característica común en células cancerosas. Su presencia puede indicar una división celular anormal o muerte celular.",
            importance: "Alta",
            interpretation: {
                low: "1-3: Pocos o ningún núcleo desnudo",
                medium: "4-6: Presencia moderada",
                high: "7-10: Alta presencia, posible indicador de malignidad"
            }
        },
        {
            name: "Cromatina Blanda (Bland Chromatin)",
            description: "Evalúa la textura del núcleo en las células.",
            range: "1-10",
            details: "La cromatina en células cancerosas tiende a ser más gruesa y irregular. Este parámetro evalúa la estructura del material genético dentro del núcleo.",
            importance: "Media",
            interpretation: {
                low: "1-3: Textura nuclear normal",
                medium: "4-6: Algunas irregularidades en la textura",
                high: "7-10: Textura nuclear muy irregular"
            }
        },
        {
            name: "Nucléolos Normales (Normal Nucleoli)",
            description: "Evalúa el tamaño y la cantidad de nucléolos.",
            range: "1-10",
            details: "Los nucléolos son más prominentes y numerosos en células cancerosas. Son estructuras dentro del núcleo relacionadas con la síntesis de proteínas.",
            importance: "Alta",
            interpretation: {
                low: "1-3: Nucléolos normales o poco visibles",
                medium: "4-6: Nucléolos moderadamente prominentes",
                high: "7-10: Nucléolos muy prominentes"
            }
        },
        {
            name: "Mitosis (Mitoses)",
            description: "Mide la tasa de división celular.",
            range: "1-10",
            details: "Una alta tasa de división celular es característica del cáncer. Este parámetro cuenta el número de células en proceso de división.",
            importance: "Muy Alta",
            interpretation: {
                low: "1-3: Tasa de división normal",
                medium: "4-6: Tasa de división elevada",
                high: "7-10: Tasa de división muy alta, típico de malignidad"
            }
        }
    ];

    const filteredItems = glossaryItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Glosario de Características
            </h1>

            {/* Barra de búsqueda */}
            <div className="max-w-xl mx-auto mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar característica..."
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                </div>
            </div>

            {/* Grid de características */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                    <div key={item.name} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {item.name}
                                </h2>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    item.importance === 'Muy Alta' ? 'bg-red-100 text-red-800' :
                                    item.importance === 'Alta' ? 'bg-orange-100 text-orange-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                    {item.importance}
                                </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">
                                {item.description}
                            </p>
                            
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Rango:</span> {item.range}
                                    </p>
                                </div>
                                
                                <div className="space-y-2">
                                    <p className="text-sm text-green-600">{item.interpretation.low}</p>
                                    <p className="text-sm text-yellow-600">{item.interpretation.medium}</p>
                                    <p className="text-sm text-red-600">{item.interpretation.high}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 px-6 py-4">
                            <p className="text-sm text-gray-600">
                                {item.details}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 