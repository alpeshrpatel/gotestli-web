// import React from "react";
// import { ProgressBar } from "react-loader-spinner";

// const Loader = () => {
//   return (
//     <div className="d-flex justify-content-center items-center" style={{height:'100vh'}}>
//       <ProgressBar
//         visible={true}
//         height="80"
//         width="80"
//         color="#4fa94d"
//         ariaLabel="progress-bar-loading"
//         wrapperStyle={{}}
//         wrapperClass=""
//       />
//     </div>
//   );
// };

// export default Loader;

import React from "react";

/**
 * GotestliSpinner
 * - fully vector (SVG)
 * - scalable and lightweight
 * - animation inside SVG (no external CSS required)
 *
 * Usage:
 * <GotestliSpinner size={180} />
 * or
 * <GotestliSpinner style={{ width: 120, height: 120 }} />
 */

export default function Loader({ size = 180, style = {} }) {
  const w = size;
  const h = size;
  return (
    <div className="d-flex justify-content-center items-center" style={{ height: '100vh' }}>
      <div style={{ display: "inline-block", lineHeight: 0, ...style }}>
        <svg
          width={w}
          height={h}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="GoTestli loading"
          role="img"
        >
          <defs>
            <linearGradient id="ringGrad" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#0b79c1" stopOpacity="1" />
              <stop offset="100%" stopColor="#78e0ff" stopOpacity="1" />
            </linearGradient>

            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.6" result="b" />
              <feBlend in="SourceGraphic" in2="b" />
            </filter>
          </defs>

          <style>{`
          .ring { transform-origin: 100px 100px; animation: rotate 1.8s linear infinite; }
          .dash { stroke-dasharray: 170; stroke-dashoffset: 0; animation: dash 1.8s ease-in-out infinite; }
          @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes dash {
            0% { stroke-dashoffset: 170; stroke-opacity: 1; }
            50% { stroke-dashoffset: 40; stroke-opacity: 0.9; }
            100% { stroke-dashoffset: 170; stroke-opacity: 1; }
          }
          .monitor-body { transition: transform .25s; }
        `}</style>

          {/* Background circle lightly visible */}
          <circle cx="100" cy="100" r="86" fill="#ffffff" />

          {/* Animated ring */}
          <g className="ring">
            <circle
              className="dash"
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.95"
            />
          </g>

          {/* Inner logo (monitor + binders + text) */}
          <g transform="translate(100,86) translate(-45,-34)">
            {/* monitor */}
            <rect
              className="monitor-body"
              x="6"
              y="4"
              rx="6"
              ry="6"
              width="88"
              height="50"
              fill="#0f9bd6"
              stroke="#05314a"
              strokeWidth="3"
            />
            {/* monitor base */}
            <rect x="36" y="56" width="28" height="6" rx="2" fill="#05314a" />

            {/* screen glass highlight */}
            <rect x="10" y="8" width="80" height="38" rx="4" fill="url(#monitorGlass)" opacity="0.12" />

            {/* three binders (simplified) */}
            <g transform="translate(18,12)">
              {/* binder left - red */}
              <rect x="0" y="0" width="12" height="30" rx="2" fill="#E94B35" stroke="#0b2b36" strokeWidth="0.8" />
              <circle cx="6" cy="22" r="2" fill="#05242c" />
              {/* binder center - yellow */}
              <rect x="16" y="0" width="12" height="30" rx="2" fill="#F6C94C" stroke="#0b2b36" strokeWidth="0.8" />
              <circle cx="22" cy="22" r="2" fill="#05242c" />
              {/* binder right - green */}
              <rect x="32" y="0" width="12" height="30" rx="2" fill="#67C76E" stroke="#0b2b36" strokeWidth="0.8" />
              <circle cx="38" cy="22" r="2" fill="#05242c" />
            </g>

            {/* brand text */}
            <g transform="translate(0,72)">
              <rect x="0" y="0" rx="10" ry="10" width="88" height="20" fill="#052a3a" />
              <text
                x="44"
                y="14"
                fontFamily="Verdana, Arial, sans-serif"
                fontWeight="700"
                fontSize="11"
                fill="#ffffff"
                textAnchor="middle"
              >
                GOTESTLI
              </text>
            </g>
          </g>

        </svg>
      </div>
    </div>
  );
}
