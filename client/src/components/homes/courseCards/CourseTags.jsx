// import React, { useEffect } from "react";



// const CourseTags = ({
//   data,
//   rating,
//   totalRatings,
// }) => {
//   const tags = [];

//   // --------------------
//   // CONDITIONS
//   // --------------------
//   console.log(data)
  
// // Dates
// const now = new Date();
// const createdDate = new Date(data.created_date);
// const startDate = new Date(data.start_date);
// const endDate = new Date(data.end_date);

// // Conditions
// const isExpired = endDate < now;
// const isUpcoming = startDate > now;
// const isDemo = Number(data.is_demo) === 1;
// // const isNew = (now - createdDate) / (1000 * 60 * 60 * 24) <= 14;
//  const isNew =
//     new Date().getTime() - new Date(data.created_date).getTime() <
//     14 * 24 * 60 * 60 * 1000;
// // Level
// let level = "BEGINNER";
// if (data.title.toLowerCase().includes("intermediate")) level = "INTERMEDIATE";
// if (data.title.toLowerCase().includes("advanced")) level = "ADVANCED";

// // Domain tags
// const domainTags = data.tags
//   ? data.tags.split(",").map(t => t.trim().toUpperCase())
//   : [];

// // Priority application
// if (isExpired) {
//   tags.push("EXPIRED");
// } else {
//   if (isUpcoming) tags.push("UPCOMING");
//   if (isDemo) tags.push("DEMO");
//   if (isNew) tags.push("NEW");
//   tags.push(level);
//   if (domainTags.length) tags.push(domainTags[0]); // AWS
// }

// // Show max 2
// // const visibleTags = tags.slice(0, 2);
// //   const isNew =
// //     new Date().getTime() - new Date(data.created_date).getTime() <
// //     14 * 24 * 60 * 60 * 1000;

//   const isTrending =
//     data.recent_purchases >= 50 || data.weekly_attempts >= 100;

//   const isTopRated = rating >= 4.5 && totalRatings >= 50;
//   const isFree = data.is_demo === true;

//   if (isNew) tags.push("NEW");
//   if (isTrending) tags.push("TRENDING");
//   if (isTopRated) tags.push("TOP RATED");
//   if (isFree) tags.push("FREE");

//   const visibleTags = tags.slice(0, 2);
//   console.log("DEBUG TAG DATA", {
//   created_at: data.created_at,
//   recent_purchases: data.recent_purchases,
//   weekly_attempts: data.weekly_attempts,
//   rating,
//   totalRatings,
//   is_demo: data.is_demo,
//   visibleTags,
// });
//   if (!visibleTags.length) return null;

//   // --------------------
//   // KEYFRAMES (INLINE)
//   // --------------------
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       @keyframes pulse {
//         0% { transform: scale(1); box-shadow: 0 0 0 rgba(251,140,0,.6); }
//         50% { transform: scale(1.1); box-shadow: 0 0 10px rgba(251,140,0,.8); }
//         100% { transform: scale(1); box-shadow: 0 0 0 rgba(251,140,0,.6); }
//       }

//       @keyframes bounceSoft {
//         0%, 100% { transform: translateY(0); }
//         50% { transform: translateY(-4px); }
//       }

//       @keyframes blink {
//         0%, 100% { opacity: 1; }
//         50% { opacity: 0.4; }
//       }
//     `;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // --------------------
//   // TAG STYLES
//   // --------------------
//   const tagBaseStyle = {
//     padding: "4px 8px",
//     fontSize: "11px",
//     borderRadius: "6px",
//     fontWeight: 600,
//     letterSpacing: "0.5px",
//     color: "#fff",
//   };

//   const tagStyleMap = {
//     NEW: {
//       backgroundColor: "#e53935",
//       animation: "bounceSoft 1.4s infinite",
//     },
//     TRENDING: {
//       backgroundColor: "#fb8c00",
//       animation: "pulse 1.2s infinite",
//     },
//     "TOP RATED": {
//       backgroundColor: "#2e7d32",
//     },
//     FREE: {
//       backgroundColor: "#1e88e5",
//       animation: "blink 1.8s infinite",
//     },
//   };

//   console.log("Visible Tags:", visibleTags);
//   return (
//     <div
//       className="position-absolute top-0 start-0 d-flex gap-2 p-2"
//       style={{ zIndex: 2 }}
//     >
//       {visibleTags.map((tag) => (
//         <span
//           key={tag}
//           className="text-uppercase"
//           style={{
//             ...tagBaseStyle,
//             ...tagStyleMap[tag],
//           }}
//         >
//           {tag}
//         </span>
//       ))}
//     </div>
//   );
// };

// export default CourseTags;


import React, { useEffect } from "react";

const CourseTags = ({ data }) => {
  if (!data) return null;

  const now = new Date();

  // --------------------
  // SAFE DATES
  // --------------------
  const createdDate = data.created_date ? new Date(data.created_date) : null;
  const startDate = data.start_date ? new Date(data.start_date) : null;
  const endDate = data.end_date ? new Date(data.end_date) : null;

  // --------------------
  // CONDITIONS
  // --------------------
  const isExpired = endDate && endDate < now;
  const isUpcoming = startDate && startDate > now;
  const isDemo = Number(data.is_demo) === 1;

  const isNew =
    createdDate &&
    (now - createdDate) / (1000 * 60 * 60 * 24) <= 14;

  // Level from title
  let level = "BEGINNER";
  const titleLower = data.title?.toLowerCase() || "";
  if (titleLower.includes("intermediate")) level = "INTERMEDIATE";
  if (titleLower.includes("advanced")) level = "ADVANCED";

  // Domain tags
  const domainTags = data.tags
    ? data.tags.split(",").map((t) => t.trim().toUpperCase())
    : [];

  // --------------------
  // TAG PRIORITY
  // --------------------
  const tags = [];

  if (isExpired) {
    tags.push("EXPIRED");
  } else {
    if (isUpcoming) tags.push("UPCOMING");
    if (isDemo) tags.push("FREE");
    if (isNew) tags.push("NEW");
    tags.push(level);
    if (domainTags.length) tags.push(domainTags[0]); // AWS
  }

  const visibleTags = tags.slice(0, 2);

  // console.log("VISIBLE TAGS:", visibleTags);

  if (!visibleTags.length) return null;

  // --------------------
  // ANIMATIONS (INLINE)
  // --------------------
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulse {
        0% { transform: scale(1); box-shadow: 0 0 0 rgba(255,152,0,.6); }
        50% { transform: scale(1.1); box-shadow: 0 0 10px rgba(255,152,0,.9); }
        100% { transform: scale(1); box-shadow: 0 0 0 rgba(255,152,0,.6); }
      }

      @keyframes bounceSoft {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // --------------------
  // STYLES
  // --------------------
  const baseStyle = {
    padding: "4px 8px",
    fontSize: "11px",
    fontWeight: 600,
    borderRadius: "6px",
    color: "#fff",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
  };

  const styleMap = {
    NEW: { backgroundColor: "#e53935", animation: "bounceSoft 1.4s infinite" },
    DEMO: { backgroundColor: "#1e88e5" },
    UPCOMING: { backgroundColor: "#fb8c00", animation: "pulse 1.2s infinite" },
    EXPIRED: { backgroundColor: "#424242" },
    BEGINNER: { backgroundColor: "#2e7d32" },
    INTERMEDIATE: { backgroundColor: "#6a1b9a" },
    ADVANCED: { backgroundColor: "#b71c1c" },
    AWS: { backgroundColor: "#ff9900" },
  };

  return (
    <div
      className="position-absolute top-0 start-0 d-flex gap-2 p-2"
      style={{ zIndex: 10 }}
    >
      {visibleTags.map((tag) => (
        <span
          key={tag}
          className="text-uppercase"
          style={{
            ...baseStyle,
            ...(styleMap[tag] || { backgroundColor: "#546e7a" }),
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default CourseTags;
