export default function Footer() {
    return (
        <footer className="bg-white shadow-lg mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex flex-col items-center space-y-4">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-pink-600 mb-2">
                            Desarrollado por
                        </h3>
                        <div className="space-y-1">
                            <p className="text-gray-700">Nicolás De Jesús Valdelamar Caicedo</p>
                            <p className="text-gray-700">Jesús David Plata Saenz</p>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-gray-600 font-medium">
                            Fundación Universitaria Los Libertadores
                        </p>
                        <p className="text-sm text-gray-500">
                            Ingeniería de Sistemas y Computación
                        </p>
                    </div>

                    <div className="text-center text-sm text-gray-500 pt-2">
                        <p>© {new Date().getFullYear()} - Todos los derechos reservados</p>
                    </div>
                </div>
            </div>
        </footer>
    );
} 