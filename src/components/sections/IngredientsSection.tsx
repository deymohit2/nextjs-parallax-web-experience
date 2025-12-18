import { Card } from '@/components/ui/card';

const ingredients = [
    {
        icon: '🌿',
        title: 'Plant Fiber',
        description:
            '9g of fiber from chicory root, Jerusalem artichoke, and cassava to support digestive health',
    },
    {
        icon: '🦠',
        title: 'Prebiotics',
        description:
            'Nourishes the good bacteria in your gut for optimal microbiome health',
    },
    {
        icon: '🍃',
        title: 'Botanicals',
        description:
            'Natural extracts including marshmallow root, calendula, and kudzu root',
    },
    {
        icon: '🍯',
        title: 'Natural Sweeteners',
        description: 'Low sugar (2-5g) using cassava syrup and stevia leaf extract',
    },
];

export function IngredientsSection() {
    return (
        <section id="ingredients" className="relative py-24 px-8 bg-[#0a0a0a] z-10">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-5xl font-black text-center mb-16 tracking-wide text-white">
                    Ingredients & Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ingredients.map((ingredient) => (
                        <Card
                            key={ingredient.title}
                            className="bg-[#141414] p-8 rounded-2xl text-center border border-white/5 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)] transition-all duration-300"
                        >
                            <div className="text-6xl mb-4">{ingredient.icon}</div>
                            <h3 className="text-2xl font-bold mb-4 text-white">
                                {ingredient.title}
                            </h3>
                            <p className="text-base text-gray-400 leading-relaxed">
                                {ingredient.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
