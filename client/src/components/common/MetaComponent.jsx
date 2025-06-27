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
  const defaultMeta = {
    title: "GoTestli - Best Quiz App for Learning, Trivia & Quiz Maker",
    description:
      "GoTestli is the best quiz maker app for learning and trivia. Create interactive quizzes for education, training, and entertainment with powerful analytics and AI insights.",
    keywords:
      "best quiz app for learning, best quiz maker app, quiz app for trivia, create quizzes, online quiz platform, educational assessment, interactive quiz builder, e-learning quizzes",
    author: "GoTestli Team",
    canonical: "https://gotestli.com",
    image: "https://gotestli.com/assets/img/gotestli-social-preview.png",
    url: "https://gotestli.com",
    publisher: "GoTestli Inc.",
    themeColor: "#2563eb",
    language: "English",
    region: "US",
    category: "Quiz Platform, Education, Assessment",
    subject: "Online Quizzes, Learning Apps, Trivia Games",
    audience: "educators, trainers, students, businesses",
    openGraph: {
      type: "website",
      url: "https://gotestli.com",
      title: "GoTestli - Best Quiz Maker App for Learning & Trivia",
      description:
        "Build quizzes for training, school, and fun. GoTestli is your all-in-one quiz app for trivia, learning, and assessments.",
      images: [
        {
          url: "https://gotestli.com/assets/img/gotestli-social-preview.png",
          width: 1200,
          height: 630,
          alt: "GoTestli - Best Quiz App for Learning & Trivia",
        },
      ],
      siteName: "GoTestli",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@GoTestli",
      creator: "@GoTestli",
      title: "GoTestli - Best Quiz App for Learning & Trivia",
      description:
        "GoTestli is the best quiz maker app for educators, students & trivia lovers. Build and share interactive quizzes online.",
      images: [
        "https://gotestli.com/assets/img/gotestli-social-preview.png",
      ],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "GoTestli",
      url: "https://gotestli.com",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web Browser, iOS, Android",
      softwareVersion: "2.0",
      description:
        "GoTestli is the best quiz app for learning and trivia. A powerful quiz maker app for educators, trainers, and students with AI analytics, mobile-friendly design, and quiz templates.",
      publisher: {
        "@type": "Organization",
        name: "GoTestli Inc.",
        url: "https://gotestli.com",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "USD",
          description: "Create quizzes with essential features for free.",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          price: "19.99",
          priceCurrency: "USD",
          description:
            "Access advanced quiz builder, analytics, integrations, and more.",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "2500",
      },
    },
  };

  const finalMeta = { ...defaultMeta, ...meta };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{finalMeta.title}</title>
        <meta name="title" content={finalMeta.title} />
        <meta name="description" content={finalMeta.description} />
        <meta name="keywords" content={finalMeta.keywords} />
        <meta name="author" content={finalMeta.author} />
        <meta name="publisher" content={finalMeta.publisher} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content={finalMeta.language} />
        <meta name="geo.region" content={finalMeta.region} />
        <meta name="distribution" content="global" />
        <meta name="category" content={finalMeta.category} />
        <meta name="subject" content={finalMeta.subject} />
        <meta name="audience" content={finalMeta.audience} />
        <link rel="canonical" href={finalMeta.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content={finalMeta.openGraph.type} />
        <meta property="og:url" content={finalMeta.openGraph.url} />
        <meta property="og:title" content={finalMeta.openGraph.title} />
        <meta property="og:description" content={finalMeta.openGraph.description} />
        <meta property="og:site_name" content={finalMeta.openGraph.siteName} />
        <meta property="og:locale" content={finalMeta.openGraph.locale} />
        {finalMeta.openGraph.images.map((image, i) => (
          <React.Fragment key={i}>
            <meta property="og:image" content={image.url} />
            <meta property="og:image:width" content={image.width} />
            <meta property="og:image:height" content={image.height} />
            <meta property="og:image:alt" content={image.alt} />
          </React.Fragment>
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content={finalMeta.twitter.card} />
        <meta name="twitter:site" content={finalMeta.twitter.site} />
        <meta name="twitter:creator" content={finalMeta.twitter.creator} />
        <meta name="twitter:title" content={finalMeta.twitter.title} />
        <meta name="twitter:description" content={finalMeta.twitter.description} />
        {finalMeta.twitter.images.map((image, i) => (
          <meta key={i} name="twitter:image" content={image} />
        ))}

        {/* Extras */}
        <meta name="theme-color" content={finalMeta.themeColor} />
        <meta name="application-name" content="GoTestli" />
        <meta name="MobileOptimized" content="width" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="format-detection" content="telephone=no" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(finalMeta.structuredData)}
        </script>
      </Helmet>
    </HelmetProvider>
  );
}
