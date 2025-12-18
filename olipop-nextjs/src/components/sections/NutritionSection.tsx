import { Separator } from '@/components/ui/separator';

export function NutritionSection() {
    return (
        <section id="nutrition" className="relative py-24 px-8 bg-[#141414] z-10">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-5xl font-black text-center mb-16 tracking-wide text-white">
                    Nutrition Facts
                </h2>
                <div className="max-w-[500px] mx-auto bg-white text-black p-8 rounded-xl border-2 border-black font-['Arial',sans-serif]">
                    <div className="mb-4">
                        <h3 className="text-3xl font-black mb-1">Nutrition Facts</h3>
                        <p className="text-sm">Serving Size: 1 Can (12 fl oz)</p>
                    </div>
                    <Separator className="h-2 bg-black mb-4" />
                    <div className="flex justify-between py-2 text-lg font-bold">
                        <span>Calories</span>
                        <span>35</span>
                    </div>
                    <Separator className="h-px bg-black my-2" />
                    <div className="flex justify-between py-1">
                        <span>Total Fat</span>
                        <span>0g</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Sodium</span>
                        <span>30mg</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Total Carbohydrate</span>
                        <span>16g</span>
                    </div>
                    <div className="flex justify-between py-1 pl-4">
                        <span>Dietary Fiber</span>
                        <span>9g</span>
                    </div>
                    <div className="flex justify-between py-1 pl-4">
                        <span>Total Sugars</span>
                        <span>2-5g</span>
                    </div>
                    <Separator className="h-px bg-black my-2" />
                    <div className="mt-4 pt-4 border-t border-black">
                        <p className="text-sm">
                            * Percent Daily Values are based on a 2,000 calorie diet.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
