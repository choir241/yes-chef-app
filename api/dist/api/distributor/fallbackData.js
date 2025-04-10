"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallbackData = void 0;
//set up backup data for API going offline
exports.fallbackData = {
    fallback: true,
    data: [
        {
            id: 1,
            name: 'Ingredient 1',
            description: 'Mock ingredient 1',
        },
        {
            id: 2,
            name: 'Ingredient 2',
            description: 'Mock ingredient 2',
        },
    ],
};
