import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@headlessui/react';

export default function FeatureInput({ name, value, onChange, description }) {
    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {name.replace(/_/g, ' ')}
                </label>
                <Tooltip>
                    <Tooltip.Button className="text-gray-400 hover:text-gray-500">
                        <QuestionMarkCircleIcon className="h-5 w-5" />
                    </Tooltip.Button>
                    <Tooltip.Panel className="absolute z-10 w-64 px-4 py-2 bg-white rounded-lg shadow-lg text-sm text-gray-600">
                        {description}
                    </Tooltip.Panel>
                </Tooltip>
            </div>
            <input
                type="number"
                value={value}
                onChange={onChange}
                min="1"
                max="10"
                step="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>Min: 1</span>
                <span>Max: 10</span>
            </div>
        </div>
    );
} 