/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        screens: {
            'mobile': '0px',

            'tablet': '640px',

            'laptop': '1024px',

            'desktop': '1280px'
        },
        extend: {},
    },
    variants: {
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    },
    plugins: [],
}

