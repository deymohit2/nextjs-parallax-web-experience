import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: 'What makes Olipop different from regular soda?',
        answer:
            'Olipop contains plant fiber, prebiotics, and botanicals that support digestive health. We use natural sweeteners and have only 2-5g of sugar per can, compared to 39g in traditional sodas. Plus, we skip the artificial ingredients and high-fructose corn syrup.',
    },
    {
        question: 'How much fiber is in each can?',
        answer:
            'Each can of Olipop contains 9 grams of plant fiber, which is about one-third of your daily recommended intake. This fiber comes from sources like chicory root, Jerusalem artichoke, and cassava.',
    },
    {
        question: 'Is Olipop safe for kids?',
        answer:
            'Yes! Olipop is made with clean, natural ingredients and is a much healthier alternative to traditional sodas for kids. However, we recommend introducing it gradually due to the high fiber content.',
    },
    {
        question: 'Where can I buy Olipop?',
        answer:
            'Olipop is available at major retailers including Whole Foods, Target, Kroger, and on our website. Use our store locator to find the nearest retailer carrying your favorite flavors.',
    },
    {
        question: 'What flavors do you offer?',
        answer:
            'We currently offer Cherry Soda, Grape Soda, and Lemon Ginger Soda, with more exciting flavors coming soon! Each flavor is crafted to taste like the classic sodas you love while delivering functional health benefits.',
    },
];

export function FAQSection() {
    return (
        <section id="faq" className="py-24 px-8 bg-[#141414]">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-5xl font-black text-center mb-16 tracking-wide text-white">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-[800px] mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                                <AccordionTrigger className="text-lg font-semibold text-white hover:text-white/80 text-left py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base leading-relaxed text-gray-400 pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
