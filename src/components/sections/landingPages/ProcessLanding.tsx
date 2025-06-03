interface ProcessStepProps {
    number: string;
    title: string;
    description: string;
}

function ProcessStep({ number, title, description }: ProcessStepProps) {
    return (
        <div className="relative flex gap-8 items-start">
            {/* Número del paso */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-500 text-white font-bold text-xl flex items-center justify-center">
                {number}
            </div>
            
            {/* Contenido */}
            <div className="flex-grow pt-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600">{description}</p>
            </div>
        </div>
    );
}

export default function ProcessLanding() {
    const steps = [
        {
            number: "01",
            title: "Análisis y Planificación",
            description: "Estudiamos tu negocio, objetivos y público objetivo para diseñar una estrategia efectiva."
        },
        {
            number: "02",
            title: "Diseño y Wireframes",
            description: "Creamos mockups y prototipos para visualizar la estructura y flujo de la landing page."
        },
        {
            number: "03",
            title: "Desarrollo y Optimización",
            description: "Implementamos la landing page con código limpio y optimizado para máximo rendimiento."
        },
        {
            number: "04",
            title: "Pruebas y Ajustes",
            description: "Realizamos pruebas exhaustivas y ajustamos cada detalle para garantizar una experiencia perfecta."
        },
        {
            number: "05",
            title: "Lanzamiento",
            description: "Publicamos tu landing page y configuramos las herramientas de análisis y seguimiento."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Proceso de Trabajo
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Un enfoque estructurado para crear landing pages que generan resultados.
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Línea conectora */}
                                {index < steps.length - 1 && (
                                    <div className="absolute left-6 top-12 w-0.5 h-12 bg-sky-100" />
                                )}
                                <ProcessStep
                                    number={step.number}
                                    title={step.title}
                                    description={step.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 