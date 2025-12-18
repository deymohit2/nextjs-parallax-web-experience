'use client';

import Image from 'next/image';
import { useVariantContext } from '@/contexts/VariantContext';

const productImages = {
    CHERRY: '/assets/cherry-product.png',
    GRAPE: '/assets/grape-product.png',
    LEMON: '/assets/ginger-lemon-product.png',
};

export function ProductSection() {
    const { currentVariant } = useVariantContext();
    const imageSrc = productImages[currentVariant.name as keyof typeof productImages] || productImages.GRAPE;

    return (
        <section id="product" className="relative py-24 px-8 bg-[#141414] z-10">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-5xl font-black text-center mb-16 tracking-wide text-white">
                    A New Kind of Soda
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <h3 className="text-3xl font-bold mb-8 text-white">Our Story</h3>
                        <p className="text-lg leading-relaxed text-gray-400 mb-8">
                            Olipop is a modern functional soda brand inspired by classic flavors but
                            made with better ingredients. We're bringing back the nostalgia of your
                            favorite childhood sodas, but with a healthy twist that supports your
                            digestive health.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-400">
                            Each can is crafted with plant fiber, prebiotics, and botanicals to create
                            a delicious soda that's actually good for you. No artificial sweeteners, no
                            high-fructose corn syrup – just real ingredients and real flavor.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative w-full aspect-square max-w-md">
                            <Image
                                key={currentVariant.name}
                                src={imageSrc}
                                alt={`Olipop ${currentVariant.name} Soda`}
                                fill
                                className="object-contain rounded-3xl transition-transform duration-500 hover:scale-105 hover:rotate-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
