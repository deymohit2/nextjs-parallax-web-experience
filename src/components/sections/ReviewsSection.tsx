import { Card } from '@/components/ui/card';

const reviews = [
    {
        stars: 5,
        text: 'Finally, a soda I can feel good about drinking! The Cherry flavor is absolutely delicious and tastes just like the classic soda I grew up with.',
        author: 'Sarah M.',
    },
    {
        stars: 5,
        text: "As someone who's been trying to cut back on sugar, Olipop is a game-changer. Great taste, low sugar, and it actually helps my digestion!",
        author: 'James T.',
    },
    {
        stars: 5,
        text: "The Grape flavor is my absolute favorite. It's become my go-to afternoon pick-me-up. Love that it's made with real ingredients!",
        author: 'Maria L.',
    },
];

export function ReviewsSection() {
    return (
        <section id="reviews" className="py-24 px-8 bg-[#0a0a0a]">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-5xl font-black text-center mb-16 tracking-wide text-white">
                    What People Are Saying
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <Card
                            key={index}
                            className="bg-[#141414] p-8 rounded-2xl border border-white/5 hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="text-2xl text-yellow-400 mb-4">
                                {'★'.repeat(review.stars)}
                            </div>
                            <p className="text-base leading-relaxed text-gray-400 mb-8 italic">
                                "{review.text}"
                            </p>
                            <p className="text-sm font-semibold text-white">— {review.author}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
