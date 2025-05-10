import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';


const sentimentAnalysisSections = [
  {
    heading: "What is Sentiment Analysis?",
    content: `Sentiment Analysis is a Natural Language Processing (NLP) technique used to determine whether a piece of text (such as a product review, tweet, or customer feedback) expresses a positive, negative, or neutral sentiment. It's widely used in marketing, customer service, and social media monitoring.`,
  },
  {
    heading: "Common Use Cases",
    content: `• Analyzing customer feedback for product improvements\n• Monitoring brand reputation on social media\n• Identifying unhappy customers in support tickets\n• Market research on public opinion\n• Filtering toxic or abusive content in comments`,
  },
  {
    heading: "Types of Sentiment Analysis",
    content: `• **Binary Sentiment Analysis** – Positive or Negative\n• **Ternary Sentiment Analysis** – Positive, Neutral, Negative\n• **Fine-Grained** – Includes strength (e.g., very positive, slightly negative)\n• **Aspect-Based Sentiment Analysis (ABSA)** – Detects sentiment toward specific aspects (e.g., "battery life" is great, but "camera" is poor)\n• **Emotion Detection** – Detects emotional states like happiness, anger, sadness, etc.`,
  },
  {
    heading: "Popular NLP Libraries",
    content: `• **TextBlob** (Python) – Simple API for sentiment analysis\n• **VADER** (Valence Aware Dictionary for sEntiment Reasoning) – Optimized for social media\n• **spaCy** – Fast NLP with third-party sentiment extensions\n• **Transformers (Hugging Face)** – Use pre-trained deep learning models for advanced sentiment detection\n• **NLTK** – Basic sentiment tools with lexicons`,
  },
  {
    heading: "Using TextBlob (Python)",
    code: `from textblob import TextBlob

text = "I love the new design of your product!"
blob = TextBlob(text)
print(blob.sentiment)

# Output: Sentiment(polarity=0.5, subjectivity=0.6)`,
  },
  {
    heading: "Using VADER (Python)",
    code: `from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()
text = "That movie was absolutely fantastic!"
scores = analyzer.polarity_scores(text)
print(scores)

# Output: {'neg': 0.0, 'neu': 0.281, 'pos': 0.719, 'compound': 0.8519}`,
  },
  {
    heading: "Using Hugging Face Transformers",
    code: `from transformers import pipeline

sentiment_pipeline = pipeline("sentiment-analysis")
result = sentiment_pipeline("This app crashes all the time and it's frustrating.")
print(result)

# Output: [{'label': 'NEGATIVE', 'score': 0.998}]`,
  },
  {
    heading: "Evaluation Metrics",
    content: `• **Accuracy** – Percentage of correctly predicted labels\n• **Precision & Recall** – For imbalanced sentiment classes\n• **F1 Score** – Harmonic mean of precision and recall\n• **Confusion Matrix** – Visualization of prediction results\n• **ROC-AUC** – For binary classification performance`,
  },
  {
    heading: "Best Practices",
    content: `• Clean and normalize input text (remove emojis, URLs, stopwords)\n• Handle sarcasm and negations carefully\n• Train your model on domain-specific data for better accuracy\n• Use pre-trained models to save time and improve performance\n• Combine multiple techniques (rule-based + ML) for hybrid approaches`,
  },
  {
    heading: "Real-World Tools",
    content: `• **Google Cloud Natural Language API** – Pre-trained sentiment models\n• **AWS Comprehend** – Entity and sentiment analysis\n• **IBM Watson NLU** – Deep NLP as a service\n• **MonkeyLearn** – No-code sentiment classifier`,
  }
];

const AiSentimentAnalysisCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="NLP Sentiment Analysis Cheat Sheet"
      description="Quick reference for Sentiment Analysis using Natural Language Processing – from rule-based to deep learning approaches."
      sections={sentimentAnalysisSections}
    />
  );
};

export default AiSentimentAnalysisCheatSheet;
