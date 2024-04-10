/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "municip-blue": '#5875F6',
        "municip-light-blue": '#66D7FB',
        "municip-blank": '#F5F7FA',
        "municip-blank-gray": '#F5F5F7',
        "municip-normal-black": '#4D4D4D',
        "municip-highlight-black": "#283138",
        "municip-black": "#18191F",
        "municip-gray": "#717171"
      }
      ,
      fontFamily: {
        "roboto": ["Roboto"],
        "inter": ["Inter"],
        "open-sans": ["Open Sans"],
        "poppins": ["Poppins"],
        "varela-round": ['Varela Round']
      },
      keyframes: {
        myBounce: {
          "0%": {
            transform: "scaleX(1) scaleY(1)",
          },
          "50%": {
            transform: "scaleX(0.97) scaleY(0.97)",
          },
          "100%": {
            transform: "scaleX(1) scaleY(1)",
          },
        },

      },
      animation: {
        "myBounceAnim": "myBounce 8s linear infinite",
      },
    },
  },
  plugins: [],
}
