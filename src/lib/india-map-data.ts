export const indiaMapData = {
  inpath:
    "M 134.46874,173.53125 L 134.46874,173.53125 z M 134.46874,173.53125 L 134.46874,173.53125 z",
  // Note: This is a simplified example. The actual map data would be much longer
  // You'll need to get the complete map data from jsvectormap's india.js file
};

export const initIndiaMap = () => {
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.jsVectorMap.addMap("india", {
      ...indiaMapData,
      main: {
        insets: [
          {
            width: 900,
            height: 900,
            left: 100,
            top: 50,
            bbox: [
              { lat: 6.7535159, lng: 68.1623859 },
              { lat: 35.6745457, lng: 97.395561 },
            ],
          },
        ],
      },
    });
  }
};
