module.exports = {
  theme: {
    extend: {
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-100%)" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-100%)" },
        },
      },
    },
  }
}