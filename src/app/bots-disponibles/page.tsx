import { obtenerBots } from '@/services/graphqlService';
import BackgroundDecorative from '@/components/ui/BackgroundDecorative';
import Header from '@/components/ui/Header';
import { getWhatsAppUrl } from '@/config/env';

export const metadata = {
    title: 'Bots Disponibles | SkinsLabs',
    description: 'Explora los bots de automatización disponibles en SkinsLabs. Descubre sus funciones y solicita el tuyo.',
};

function getBotImageUrl(imagenUrl: string) {
    if (!imagenUrl) return '/placeholder.png';
    if (imagenUrl.startsWith('http')) return imagenUrl;
    return `http://localhost:8080${imagenUrl}`;
}

const sectionStyle = "mb-2 text-xs text-gray-700";
const sectionTitle = "font-semibold text-sky-700 flex items-center gap-1 mb-1";
const bullet = (icon: string) => <span className="mr-1">{icon}</span>;

export default async function BotsDisponiblesPage() {
    const bots = await obtenerBots();

    return (
        <>
            <BackgroundDecorative />
            <div className="relative z-10">
                <Header />
                <section className="max-w-7xl mx-auto pt-32 pb-20 px-4 lg:px-0">
                    <h1 className="text-4xl font-bold text-center text-white mb-4">Bots Disponibles</h1>
                    <p className="text-center text-slate-200 text-lg mb-12 max-w-2xl mx-auto">
                        Explora los bots de automatización que tenemos listos para ti. Conoce sus características y solicita el que más se adapte a tu negocio.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {bots.map((bot) => (
                            <div
                                key={bot.id}
                                className="bg-white text-black rounded-2xl shadow-xl flex flex-col justify-between h-full min-h-[540px] max-w-md mx-auto"
                                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
                            >
                                <div className="flex flex-col flex-1">
                                    <div className="w-full aspect-[4/3] bg-gray-100 rounded-t-2xl overflow-hidden flex items-center justify-center">
                                        <img
                                            src={getBotImageUrl(bot.imagenUrl)}
                                            alt={bot.titulo}
                                            className="object-cover w-full h-full"
                                            style={{ minHeight: 180, maxHeight: 240 }}
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col p-6">
                                        <h2 className="text-2xl font-bold mb-2 text-sky-700 text-center">{bot.titulo}</h2>
                                        <p className="mb-4 text-base text-gray-800 text-center min-h-[48px]">{bot.descripcion}</p>

                                        {bot.funciones && bot.funciones.length > 0 && (
                                            <div className={sectionStyle}>
                                                <div className={sectionTitle}>{bullet('🛠️')} Funciones</div>
                                                <ul className="list-disc list-inside ml-2">
                                                    {bot.funciones.map((f, i) => (
                                                        <li key={i}>{f}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {bot.integraciones && bot.integraciones.length > 0 && (
                                            <div className={sectionStyle}>
                                                <div className={sectionTitle}>{bullet('🔌')} Integraciones</div>
                                                <ul className="list-disc list-inside ml-2">
                                                    {bot.integraciones.map((f, i) => (
                                                        <li key={i}>{f}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {bot.casosUso && bot.casosUso.length > 0 && (
                                            <div className={sectionStyle}>
                                                <div className={sectionTitle}>{bullet('🎯')} Casos de Uso</div>
                                                <ul className="list-disc list-inside ml-2">
                                                    {bot.casosUso.map((f, i) => (
                                                        <li key={i}>{f}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {bot.tecnologias && bot.tecnologias.length > 0 && (
                                            <div className={sectionStyle}>
                                                <div className={sectionTitle}>{bullet('💻')} Tecnologías</div>
                                                <ul className="list-disc list-inside ml-2">
                                                    {bot.tecnologias.map((f, i) => (
                                                        <li key={i}>{f}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {bot.flujosAutomatizados && bot.flujosAutomatizados.length > 0 && (
                                            <div className={sectionStyle}>
                                                <div className={sectionTitle}>{bullet('🔁')} Flujos Automatizados</div>
                                                <ul className="list-disc list-inside ml-2">
                                                    {bot.flujosAutomatizados.map((f, i) => (
                                                        <li key={i}>{f}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {bot.requisitos && bot.requisitos.length > 0 && (
                                            <div className={sectionStyle}>
                                                <div className={sectionTitle}>{bullet('📋')} Requisitos</div>
                                                <ul className="list-disc list-inside ml-2">
                                                    {bot.requisitos.map((f, i) => (
                                                        <li key={i}>{f}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6 pt-0 flex flex-col">
                                    <a
                                        href={getWhatsAppUrl(`Hola, me interesa el bot: ${bot.titulo}`)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 rounded-xl font-bold text-center text-lg transition-colors shadow-md"
                                    >
                                        Solicitar este bot
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
} 