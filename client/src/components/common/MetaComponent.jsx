// import React from "react";
// import { Helmet, HelmetProvider } from "react-helmet-async";

// export default function MetaComponent({ meta }) {
//   return (
//     <HelmetProvider>
//       <Helmet>
//         <title>{meta?.title}</title>
//         <meta name="description" content={meta?.description} />
//       </Helmet>
//     </HelmetProvider>
//   );
// }

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function MetaComponent({ meta }) {
  // Default fallback values
  const defaultMeta = {
    title: "GoTestli - Ultimate Quiz Platform | Create, Take & Share Online Quizzes",
    description: "Create interactive quizzes, assessments and tests with GoTestli. Join millions of students and instructors using our quiz maker platform for education, training and fun.",
    keywords: "quiz maker, online quiz platform, create quizzes, educational quizzes, assessment tool",
    author: "GoTestli Team",
    canonical: "https://gotestli.com",
    image: "https://gotestli.com/assets/img/gotestli-social-preview.png",
    url: "https://gotestli.com"
  };

  // Merge provided meta with defaults
  const finalMeta = { ...defaultMeta, ...meta };

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{finalMeta.title}</title>
        <meta name="title" content={finalMeta.title} />
        <meta name="description" content={finalMeta.description} />
        
        {/* Keywords and Author */}
        {finalMeta.keywords && (
          <meta name="keywords" content={finalMeta.keywords} />
        )}
        <meta name="author" content={finalMeta.author} />
        <meta name="publisher" content={finalMeta.publisher || "GoTestli Inc."} />
        
        {/* Robots and Crawling */}
        <meta name="robots" content={finalMeta.robots || "index, follow, max-image-preview:large"} />
        <meta name="googlebot" content={finalMeta.googlebot || "index, follow"} />
        <meta name="bingbot" content="index, follow" />
        
        {/* Language and Geographic */}
        <meta name="language" content={finalMeta.language || "English"} />
        <meta name="geo.region" content={finalMeta.region || "US"} />
        <meta name="distribution" content="global" />
        
        {/* Content Classification */}
        {finalMeta.category && (
          <meta name="category" content={finalMeta.category} />
        )}
        {finalMeta.subject && (
          <meta name="subject" content={finalMeta.subject} />
        )}
        {finalMeta.audience && (
          <meta name="audience" content={finalMeta.audience} />
        )}
        
        {/* Canonical URL */}
        <link rel="canonical" href={finalMeta.canonical} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={finalMeta.openGraph?.type || "website"} />
        <meta property="og:url" content={finalMeta.openGraph?.url || finalMeta.url} />
        <meta property="og:title" content={finalMeta.openGraph?.title || finalMeta.title} />
        <meta property="og:description" content={finalMeta.openGraph?.description || finalMeta.description} />
        <meta property="og:site_name" content={finalMeta.openGraph?.siteName || "GoTestli"} />
        <meta property="og:locale" content={finalMeta.openGraph?.locale || "en_US"} />
        
        {/* Open Graph Images */}
        {finalMeta.openGraph?.images?.length > 0 ? (
          finalMeta.openGraph.images.map((image, index) => (
            <React.Fragment key={index}>
              <meta property="og:image" content={image.url} />
              <meta property="og:image:width" content={image.width} />
              <meta property="og:image:height" content={image.height} />
              <meta property="og:image:alt" content={image.alt} />
              {image.type && <meta property="og:image:type" content={image.type} />}
            </React.Fragment>
          ))
        ) : (
          <>
            <meta property="og:image" content={finalMeta.image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${finalMeta.title} - GoTestli`} />
          </>
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content={finalMeta.twitter?.card || "summary_large_image"} />
        <meta name="twitter:site" content={finalMeta.twitter?.site || "@GoTestli"} />
        <meta name="twitter:creator" content={finalMeta.twitter?.creator || "@GoTestli"} />
        <meta name="twitter:title" content={finalMeta.twitter?.title || finalMeta.title} />
        <meta name="twitter:description" content={finalMeta.twitter?.description || finalMeta.description} />
        
        {/* Twitter Images */}
        {finalMeta.twitter?.images?.length > 0 ? (
          finalMeta.twitter.images.map((image, index) => (
            <meta key={index} name="twitter:image" content={image} />
          ))
        ) : (
          <meta name="twitter:image" content={finalMeta.image} />
        )}
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        
        {/* Theme and App Meta */}
        <meta name="theme-color" content={finalMeta.themeColor || "#2563eb"} />
        <meta name="application-name" content="GoTestli" />
        <meta name="msapplication-TileColor" content={finalMeta.themeColor || "#2563eb"} />
        
        {/* Content Freshness */}
        {finalMeta.lastModified && (
          <meta name="last-modified" content={finalMeta.lastModified} />
        )}
        {finalMeta.publishedTime && (
          <meta property="article:published_time" content={finalMeta.publishedTime} />
        )}
        
        {/* Article Meta (for blog posts/articles) */}
        {finalMeta.article && (
          <>
            <meta property="article:author" content={finalMeta.article.author} />
            <meta property="article:section" content={finalMeta.article.section} />
            {finalMeta.article.tag && finalMeta.article.tag.map((tag, index) => (
              <meta key={index} property="article:tag" content={tag} />
            ))}
          </>
        )}
        
        {/* Structured Data (JSON-LD) */}
        {finalMeta.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(finalMeta.structuredData)}
          </script>
        )}
        
        {/* Additional Custom Meta Tags */}
        {finalMeta.customMeta && finalMeta.customMeta.map((meta, index) => (
          <meta key={index} {...meta} />
        ))}
        
        {/* Additional Custom Links */}
        {finalMeta.customLinks && finalMeta.customLinks.map((link, index) => (
          <link key={index} {...link} />
        ))}
        
        {/* Preconnect for Performance (if specified) */}
        {finalMeta.preconnect && finalMeta.preconnect.map((url, index) => (
          <link key={index} rel="preconnect" href={url} />
        ))}
        
        {/* DNS Prefetch (if specified) */}
        {finalMeta.dnsPrefetch && finalMeta.dnsPrefetch.map((url, index) => (
          <link key={index} rel="dns-prefetch" href={url} />
        ))}
      </Helmet>
    </HelmetProvider>
  );
}
