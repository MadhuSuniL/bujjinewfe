import React from 'react';

const plans = [
    {
        name: 'Free',
        price: '0',
        unit: 'units/day',
        description: 'Explore how AI can help you with everyday tasks',
        features: [
            'Limited use of advanced models',
            'Limited Thinking feature',
            'Limited file attachments',
            'Use up to 3 hours/day'
        ],
        isPopular: false,
        isCurrent: true,
        bg: 'hover:scale-105 duration-200 white-gray-bg',
        border: '',
        buttonColor: 'bg-gray-700 '
    },
    {
        name: 'Plus',
        price: '50',
        unit: 'units/day',
        description: 'Level up productivity and creativity with expanded access',
        features: [
            'Everything in Free',
            'Reduced limits on Thinking & file uploads',
            'Access to more advanced models',
            'Use up to 12 hours/day'
        ],
        isPopular: true,
        isCurrent: false,
        bg: 'hover:scale-105 duration-200 white-gray-bg',
        border: '',
        buttonColor: 'bg-main '
    },
    {
        name: 'Pro',
        price: '200',
        unit: 'units/day',
        description: 'Get full unlimited access to every feature and model',
        features: [
            'Everything in Plus',
            'Unlimited use of all models',
            'Unlimited Thinking and file upload',
            '24/7 access with no limits'
        ],
        isPopular: false,
        isCurrent: false,
        bg: 'hover:scale-105 duration-200 white-gray-bg',
        border: '',
        buttonColor: 'bg-white text-black'
    }
];

const Upgrade = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-22">Choose Your Plan</h1>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-xl p-6 border ${plan.bg} ${plan.border} flex flex-col justify-between`}
                    >
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold">{plan.name}</h2>
                                {plan.isPopular && (
                                    <span className="text-xs animate-pulse bg-main  px-2 py-1 rounded-full">
                                        POPULAR
                                    </span>
                                )}
                            </div>

                            <div className="text-3xl font-semibold">
                                {plan.price} <span className="text-sm">{plan.unit}</span>
                            </div>

                            <p className="text-sm text-gray-300 mt-2">{plan.description}</p>

                            <ul className="mt-4 space-y-2 text-sm text-gray-200">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span>✔️</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className={`mt-6 w-full py-2 rounded-lg font-medium ${plan.buttonColor} ${plan.isCurrent ? 'cursor-not-allowed opacity-70' : 'hover:opacity-90 transition'
                                }`}
                            disabled={plan.isCurrent}
                        >
                            {plan.isCurrent ? 'Your current plan' : `Get ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Upgrade;
