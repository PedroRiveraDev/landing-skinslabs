import { obtenerBots } from '@/services/graphqlService';
import BackgroundDecorative from '@/components/ui/BackgroundDecorative';
import Header from '@/components/ui/Header';
import { getWhatsAppUrl } from '@/config/env';
import { 
    Bot, 
    Zap, 
    Settings, 
    Target, 
    Code, 
    RefreshCw, 
    FileText, 
    CheckCircle2,
    ArrowRight,
    Star
} from 'lucide-react';

export const metadata = {
    title: 'Bots Disponibles | SkinsLabs',
    description: 'Explora los bots de automatización disponibles en SkinsLabs. Descubre sus funciones y solicita el tuyo.',
};

function getBotImageUrl(imagenUrl: string) {
    if (!imagenUrl) return '/placeholder.png';
    if (imagenUrl.startsWith('http')) return imagenUrl;
    return `http://69.62.89.201:8181${imagenUrl}`;
}

// Componente para mostrar badges de características
const FeatureBadge = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 border border-slate-200">
        <Icon className="w-4 h-4 text-sky-500" />
        <span>{label}</span>
    </div>
);

// Componente para mostrar listas de características
const FeatureList = ({ 
    title, 
    items, 
    icon: Icon, 
    color = "sky" 
}: { 
    title: string, 
    items: any[], 
    icon: any, 
    color?: string 
}) => {
    if (!items || items.length === 0) return null;
    
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-${color}-50`}>
                    <Icon className={`w-5 h-5 text-${color}-600`} />
                </div>
                <h3 className="font-semibold text-slate-800">{title}</h3>
            </div>
            <ul className="space-y-2 ml-9">
                {items.map((item, index) => (
                    <li key={item.id || index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">
                            {item.descripcion || item.nombre}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default async function BotsDisponiblesPage() {
    const bots = await obtenerBots();

    return (
        <>
            <BackgroundDecorative />
            <div className="relative z-10">
                <Header />
                
                {/* Hero Section */}
                <section className="max-w-6xl mx-auto pt-32 pb-16 px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Bot className="w-4 h-4" />
                            <span>Agentes Inteligentes</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Bots Disponibles
                        </h1>
                        <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                            Explora nuestros bots de automatización diseñados para transformar tu negocio. 
                            Cada agente está optimizado para tareas específicas y listo para implementarse.
                        </p>
                    </div>

                    {/* Bots Grid */}
                    <div className="space-y-16">
                        {bots.map((bot, index) => (
                            <div
                                key={bot.id}
                                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
                                style={{
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                {/* Header con imagen y título */}
                                <div className="relative">
                                <div className="w-full h-[420px] lg:h-[560px] bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center overflow-hidden rounded-t-3xl">
                                        <img
                                            src={getBotImageUrl(bot.imagenUrl)}
                                            alt={bot.titulo}
                                            className="object-cover object-center w-full h-full rounded-t-3xl border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                                            style={{ boxShadow: '0 6px 32px 0 rgba(31, 38, 135, 0.10)' }}
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 z-10">
                                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-700 flex items-center gap-1 shadow">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span>Premium</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contenido principal */}
                                <div className="p-8 lg:p-12">
                                    {/* Título y descripción */}
                                    <div className="mb-8">
                                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                                            {bot.titulo}
                                        </h2>
                                        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                                            {bot.descripcion}
                                        </p>
                                    </div>

                                    {/* Badges de características principales */}
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {bot.funciones && bot.funciones.length > 0 && (
                                            <FeatureBadge icon={Zap} label={`${bot.funciones.length} Funciones`} />
                                        )}
                                        {bot.integraciones && bot.integraciones.length > 0 && (
                                            <FeatureBadge icon={Settings} label={`${bot.integraciones.length} Integraciones`} />
                                        )}
                                        {bot.tecnologias && bot.tecnologias.length > 0 && (
                                            <FeatureBadge icon={Code} label={`${bot.tecnologias.length} Tecnologías`} />
                                        )}
                                        {bot.casosUso && bot.casosUso.length > 0 && (
                                            <FeatureBadge icon={Target} label={`${bot.casosUso.length} Casos de Uso`} />
                                        )}
                                    </div>

                                    {/* Grid de características */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-6">
                                            {bot.funciones && bot.funciones.length > 0 && (
                                                <FeatureList 
                                                    title="Funciones Principales" 
                                                    items={bot.funciones} 
                                                    icon={Zap} 
                                                />
                                            )}
                                            {bot.integraciones && bot.integraciones.length > 0 && (
                                                <FeatureList 
                                                    title="Integraciones" 
                                                    items={bot.integraciones} 
                                                    icon={Settings} 
                                                />
                                            )}
                                            {bot.tecnologias && bot.tecnologias.length > 0 && (
                                                <FeatureList 
                                                    title="Tecnologías" 
                                                    items={bot.tecnologias} 
                                                    icon={Code} 
                                                />
                                            )}
                                        </div>
                                        <div className="space-y-6">
                                            {bot.casosUso && bot.casosUso.length > 0 && (
                                                <FeatureList 
                                                    title="Casos de Uso" 
                                                    items={bot.casosUso} 
                                                    icon={Target} 
                                                />
                                            )}
                                            {bot.flujosAutomatizados && bot.flujosAutomatizados.length > 0 && (
                                                <FeatureList 
                                                    title="Flujos Automatizados" 
                                                    items={bot.flujosAutomatizados} 
                                                    icon={RefreshCw} 
                                                />
                                            )}
                                            {bot.requisitos && bot.requisitos.length > 0 && (
                                                <FeatureList 
                                                    title="Requisitos" 
                                                    items={bot.requisitos} 
                                                    icon={FileText} 
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* CTA Section */}
                                    <div className="border-t border-slate-200 pt-8">
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <div className="text-center sm:text-left">
                                                <p className="text-slate-600 mb-2">
                                                    ¿Te interesa este bot?
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    Implementación rápida • Soporte 24/7 • Personalización incluida
                                                </p>
                                            </div>
                                            <a
                                                href={getWhatsAppUrl(`Hola, me interesa el bot: ${bot.titulo}. ¿Podrían darme más información sobre sus funciones y precios?`)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-3 min-w-[200px] justify-center"
                                            >
                                                <span>Solicitar este bot</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="text-center mt-16">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                ¿No encuentras lo que buscas?
                            </h3>
                            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
                                Tenemos experiencia en crear bots personalizados. Cuéntanos tu necesidad y te ayudamos a diseñar la solución perfecta.
                            </p>
                            <a
                                href={getWhatsAppUrl("Hola, necesito un bot personalizado para mi negocio. ¿Podrían ayudarme?")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
                            >
                                <Bot className="w-5 h-5" />
                                <span>Solicitar bot personalizado</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
} 