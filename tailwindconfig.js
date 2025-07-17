tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'serif': ['Playfair Display', 'serif'],
                'sans': ['Montserrat', 'sans-serif'],
            },
            colors: {
                'cream': '#F8F3E9',
                'beige': '#E6DED1',
                'charcoal': '#333333',
                'accent': '#D4A373',
            },
            animation: {
                'fade-in': 'fadeIn 1.2s ease-in-out',
                'slide-up': 'slideUp 0.8s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        }
    }
}