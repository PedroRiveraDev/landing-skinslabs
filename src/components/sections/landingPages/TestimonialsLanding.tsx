import Image from 'next/image';

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    company: string;
    image: string;
}

function TestimonialCard({ quote, author, role, company, image }: TestimonialCardProps) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-sky-100 border border-sky-50">
            {/* Comillas decorativas */}
            <svg className="w-12 h-12 text-sky-100 mb-6" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            {/* Testimonio */}
            <blockquote className="text-slate-600 mb-6">
                {quote}
            </blockquote>

            {/* Autor */}
            <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                        src={image}
                        alt={author}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="font-semibold text-slate-900">{author}</div>
                    <div className="text-sm text-slate-600">{role} en {company}</div>
                </div>
            </div>
        </div>
    );
}

export default function TestimonialsLanding() {
    const testimonials = [
        {
            quote: "La landing page superó nuestras expectativas. La tasa de conversión aumentó un 150% en el primer mes.",
            author: "Ana Martínez",
            role: "CEO",
            company: "TechStart",
            image: "/images/testimonials/placeholder-1.jpg"
        },
        {
            quote: "El proceso fue muy profesional y el resultado final es exactamente lo que necesitábamos para nuestro lanzamiento.",
            author: "Carlos Ruiz",
            role: "Marketing Director",
            company: "InnovateLab",
            image: "/images/testimonials/placeholder-2.jpg"
        },
        {
            quote: "Excelente servicio y soporte. La página está optimizada perfectamente y los resultados hablan por sí solos.",
            author: "María González",
            role: "Founder",
            company: "EduTech",
            image: "/images/testimonials/placeholder-3.jpg"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Lo Que Dicen Nuestros Clientes
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Historias de éxito de quienes ya han confiado en nosotros.
                    </p>
                </div>

                {/* Grid de Testimonios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            quote={testimonial.quote}
                            author={testimonial.author}
                            role={testimonial.role}
                            company={testimonial.company}
                            image={testimonial.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
} 