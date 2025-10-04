module.exports = {
content: ["./src/**/*.html", "./src/js/**/*.js"],
darkMode: 'class',
theme: {
extend: {
colors: {
brand: {
50: '#f5f7ff',
500: '#4f46e5',
700: '#4338ca'
}
}
}
},
plugins: [require('@tailwindcss/forms')],
}