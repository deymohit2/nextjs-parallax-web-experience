import { Button } from '@/components/ui/button';

export function CTASection() {
    return (
        <section id="contact" className="py-24 px-8 bg-[#0a0a0a] text-center">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-white">
                    Ready to Try a Better Soda?
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-[700px] mx-auto">
                    Join thousands of people who've made the switch to functional, delicious soda.
                    Your gut will thank you.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                    <Button
                        size="lg"
                        className="px-12 py-6 text-lg font-bold tracking-wider uppercase rounded-full bg-white text-black hover:bg-transparent hover:text-white border-2 border-white hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] transition-all duration-300"
                    >
                        Shop Now
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="px-12 py-6 text-lg font-bold tracking-wider uppercase rounded-full bg-transparent text-white hover:bg-white hover:text-black border-2 border-white hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all duration-300"
                    >
                        Find a Store
                    </Button>
                </div>
            </div>
        </section>
    );
}
