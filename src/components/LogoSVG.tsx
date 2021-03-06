import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const CHAT_PATH = [
  'M 0 60.01 L 0 10.01 A 9.788 9.788 0 0 1 0.781 6.128 A 9.771 9.771 0 0 1 2.93 2.954 Q 4.297 1.611 6.128 0.806 A 9.533 9.533 0 0 1 10.01 0 L 47.998 0 A 9.533 9.533 0 0 1 51.88 0.806 A 10.622 10.622 0 0 1 55.078 2.954 Q 56.445 4.297 57.227 6.128 A 9.788 9.788 0 0 1 58.008 10.01 L 58.008 19.043 L 47.998 19.043 L 47.998 10.01 L 10.01 10.01 L 10.01 60.01 L 47.998 60.01 L 47.998 51.026 L 58.008 51.026 L 58.008 60.01 A 9.788 9.788 0 0 1 57.227 63.892 A 10.055 10.055 0 0 1 55.078 67.09 A 10.055 10.055 0 0 1 51.88 69.238 Q 50.049 70.02 47.998 70.02 L 10.01 70.02 A 9.788 9.788 0 0 1 6.128 69.238 A 10.055 10.055 0 0 1 2.93 67.09 A 10.055 10.055 0 0 1 0.781 63.892 A 9.788 9.788 0 0 1 0 60.01 Z',
  'M 124.121 0 L 134.131 0 L 134.131 70.02 L 124.121 70.02 L 124.121 40.039 L 84.033 40.039 L 84.033 70.02 L 74.024 70.02 L 74.024 0 L 84.033 0 L 84.033 30.029 L 124.121 30.029 L 124.121 0 Z',
  'M 173.096 0 L 183.106 0 L 210.108 70.02 L 200.098 70.02 L 193.897 53.906 L 162.305 53.906 L 156.104 70.02 L 146.094 70.02 L 173.096 0 Z M 178.125 13.037 L 166.113 43.897 L 190.039 43.897 L 178.125 13.037 Z',
  'M 208.106 10.01 L 208.106 0 L 264.111 0 L 264.111 10.01 L 241.113 10.01 L 241.113 70.02 L 231.104 70.02 L 231.104 10.01 L 208.106 10.01 Z',
];

const VIRTUAL_PATH = [
  'M 38.037 70.022 L 27.002 70.022 L 0 0.003 L 10.742 0.003 L 32.52 57.62 L 54.346 0.003 L 65.039 0.003 L 38.037 70.022 Z',
  'M 77.002 0.003 L 87.012 0.003 L 87.012 70.022 L 77.002 70.022 L 77.002 0.003 Z',
  'M 160.303 17.044 L 160.303 25.003 A 25.461 25.461 0 0 1 159.616 31.177 Q 157.587 39.278 149.561 41.335 A 20.345 20.345 0 0 1 147.803 41.702 L 160.986 70.022 L 149.902 70.022 L 136.914 42.044 L 114.99 42.044 L 114.99 70.022 L 104.98 70.022 L 104.98 0.003 L 143.311 0.003 A 24.396 24.396 0 0 1 150.035 0.847 Q 157.575 3.013 159.578 10.733 A 25.175 25.175 0 0 1 160.303 17.044 Z M 114.99 10.012 L 114.99 32.034 L 142.773 32.034 A 14.395 14.395 0 0 0 144.822 31.899 Q 147.221 31.553 148.489 30.322 A 4.378 4.378 0 0 0 148.535 30.276 A 5.159 5.159 0 0 0 149.673 28.477 Q 150.284 26.916 150.293 24.586 A 18.101 18.101 0 0 0 150.293 24.514 L 150.293 17.532 A 14.395 14.395 0 0 0 150.158 15.484 Q 149.812 13.085 148.581 11.816 A 4.378 4.378 0 0 0 148.535 11.77 A 5.159 5.159 0 0 0 146.736 10.632 Q 145.175 10.022 142.845 10.012 A 18.101 18.101 0 0 0 142.773 10.012 L 114.99 10.012 Z',
  'M 170.996 10.012 L 170.996 0.003 L 227.002 0.003 L 227.002 10.012 L 204.004 10.012 L 204.004 70.022 L 193.994 70.022 L 193.994 10.012 L 170.996 10.012 Z',
  'M 239.014 60.012 L 239.014 0.003 L 249.023 0.003 L 249.023 60.012 L 289.014 60.012 L 289.014 0.003 L 299.023 0.003 L 299.023 60.012 A 9.788 9.788 0 0 1 298.242 63.894 A 10.055 10.055 0 0 1 296.094 67.092 A 10.055 10.055 0 0 1 292.896 69.241 Q 291.064 70.022 289.014 70.022 L 249.023 70.022 A 9.788 9.788 0 0 1 245.142 69.241 A 10.055 10.055 0 0 1 241.943 67.092 A 10.055 10.055 0 0 1 239.795 63.894 A 9.788 9.788 0 0 1 239.014 60.012 Z',
  'M 337.988 0.003 L 347.998 0.003 L 375 70.022 L 364.99 70.022 L 358.789 53.909 L 327.197 53.909 L 320.996 70.022 L 310.986 70.022 L 337.988 0.003 Z M 343.018 13.04 L 331.006 43.899 L 354.932 43.899 L 343.018 13.04 Z',
  'M 387.012 0.003 L 397.021 0.003 L 397.021 60.012 L 433.008 60.012 L 433.008 70.022 L 387.012 70.022 L 387.012 0.003 Z',
];

const LogoSVG = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      pathLength: [0, 1],
      transition: {
        delay: i * 0.15,
        duration: 1,
        type: 'spring',
        damping: 30,
        stiffness: 700,
        times: [0, 1],
        // repeatType: 'loop',
        repeat: Infinity,
        repeatDelay: 5,
      },
    }));
    return () => {};
  }, [controls]);
  return (
    <svg
      width="100vw"
      height="100vh"
      viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
      //   stroke="white"
      fill="transparent"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="5%" stop-color="#39c5bb" />
          <stop offset="95%" stop-color="white" />
        </linearGradient>
      </defs>
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        strokeWidth="0.25mm"
        stroke="url('#myGradient')"
        transform="rotate(-10 0 0) translate(-100, 150) skewX(15) "
      >
        <svg
          x="0"
          y="0"
          width="100vw"
          height="50vh"
          viewBox="0 0 433.008 70.022"
        >
          {VIRTUAL_PATH.map((d, idx) => (
            <motion.path
              d={d}
              key={idx}
              strokeWidth="3"
              vector-effect="non-scaling-stroke"
              custom={idx}
              animate={controls}
            />
          ))}
        </svg>
        <svg x="5vw" y="65vh" width="100vw" height="50vh" viewBox="0 0 264 111">
          {CHAT_PATH.map((d, idx) => (
            <motion.path
              d={d}
              key={idx}
              strokeWidth="3"
              vector-effect="non-scaling-stroke"
              custom={idx + VIRTUAL_PATH.length - 3}
              animate={controls}
            />
          ))}
        </svg>
      </g>
    </svg>
  );
};

export default LogoSVG;
