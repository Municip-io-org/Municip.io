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
      }
    },

  },
  plugins: [],
}
