import Image from 'next/image';
import Link from 'next/link';

interface PortfolioItemProps {
    title: string;
    category: string;
    image: string;
    stats: {
        conversion: string;
        visitors: string;
    };
}

function PortfolioItem({ title, category, image, stats }: PortfolioItemProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Imagen */}
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 to-transparent" />
            </div>

            {/* Contenido */}
            <div className="absolute bottom-0 w-full p-6 text-white">
                <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-sky-500/20 backdrop-blur-sm rounded-full">
                        {category}
                    </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <div className="flex gap-4 text-sm">
                    <div>
                        <span className="text-sky-300">Conversión:</span> {stats.conversion}
                    </div>
                    <div>
                        <span className="text-sky-300">Visitantes:</span> {stats.visitors}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PortfolioLanding() {
    const portfolioItems = [
        {
            title: "E-commerce Premium",
            category: "Tienda Online",
            image: "/images/portfolio/placeholder-1.jpg",
            stats: {
                conversion: "8.5%",
                visitors: "15k/mes"
            }
        },
        {
            title: "App Fitness Pro",
            category: "Aplicación Móvil",
            image: "/images/portfolio/placeholder-2.jpg",
            stats: {
                conversion: "12.3%",
                visitors: "25k/mes"
            }
        },
        {
            title: "Curso Marketing Digital",
            category: "Educación",
            image: "/images/portfolio/placeholder-3.jpg",
            stats: {
                conversion: "15.7%",
                visitors: "10k/mes"
            }
        },
        {
            title: "Servicio de Consultoría",
            category: "B2B",
            image: "/images/portfolio/placeholder-4.jpg",
            stats: {
                conversion: "18.2%",
                visitors: "5k/mes"
            }
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-sky-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Nuestro Portfolio
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Casos de éxito que demuestran nuestro compromiso con resultados excepcionales.
                    </p>
                </div>

                {/* Grid de Portfolio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {portfolioItems.map((item, index) => (
                        <PortfolioItem
                            key={index}
                            title={item.title}
                            category={item.category}
                            image={item.image}
                            stats={item.stats}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <Link
                        href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20una%20landing%20page"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver Más Proyectos
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
} 