import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';


const textGenerationSections = [
  {
    heading: "What is Text Generation?",
    content: `Text Generation is a Natural Language Processing (NLP) task where a model generates coherent, human-like text based on a given input. It can be used for auto-completion, dialogue systems, story generation, and more.`,
  },
  {
    heading: "Common Use Cases",
    content: `• Chatbots and Virtual Assistants\n• Story and Content Generation\n• Email or Subject Line Generation\n• Code Generation (e.g., GitHub Copilot)\n• Text Summarization and Translation\n• Auto-generating documentation or reports`,
  },
  {
    heading: "Text Generation Techniques",
    content: `• **Rule-Based Generation** – Uses templates and grammar rules (limited flexibility)\n• **Markov Chains** – Probabilistic word sequences (limited coherence)\n• **RNN/LSTM Models** – Learn sequences but struggle with long-term dependencies\n• **Transformer Models** – Capture global context for fluent generation\n• **Pre-trained Language Models** – GPT, BERT (masked), T5, BART, etc.`,
  },
  {
    heading: "Popular Models for Text Generation",
    content: `• **GPT-2 / GPT-3 / GPT-4** – Autoregressive transformers for general text\n• **T5 (Text-To-Text Transfer Transformer)** – Input and output as text\n• **BART** – Pretraining for sequence-to-sequence tasks\n• **XLNet** – Permutation-based transformer for language modeling`,
  },
  {
    heading: "Using Hugging Face Transformers (GPT-2)",
    code: `from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

input_text = "The future of AI is"
input_ids = tokenizer.encode(input_text, return_tensors='pt')

output = model.generate(input_ids, max_length=50, num_return_sequences=1, no_repeat_ngram_size=2, early_stopping=True)

print(tokenizer.decode(output[0], skip_special_tokens=True))`,
  },
  {
    heading: "Using Text Generation Pipeline",
    code: `from transformers import pipeline

generator = pipeline("text-generation", model="gpt2")
output = generator("Once upon a time", max_length=40, num_return_sequences=1)

print(output[0]["generated_text"])`,
  },
  {
    heading: "Key Parameters for Tuning",
    content: `• **max_length** – Maximum tokens to generate\n• **temperature** – Controls randomness (higher = more random)\n• **top_k** – Limits next token selection to top-k choices\n• **top_p (nucleus sampling)** – Chooses tokens from top cumulative probability\n• **repetition_penalty** – Discourages repeating same phrases`,
  },
  {
    heading: "Text Generation Strategies",
    content: `• **Greedy Search** – Picks the most probable next token (deterministic)\n• **Beam Search** – Explores multiple paths and keeps top k sequences\n• **Top-K Sampling** – Randomly samples from top-k probable tokens\n• **Top-P (Nucleus) Sampling** – Samples from smallest set of tokens with cumulative probability > p\n• **Temperature Sampling** – Scales logits before softmax to adjust randomness`,
  },
  {
    heading: "Evaluation Techniques",
    content: `• **BLEU Score** – Measures similarity to reference text\n• **ROUGE Score** – Recall-oriented for summarization\n• **Perplexity** – Measures confidence of model predictions\n• **Human Evaluation** – Fluency, coherence, relevance, creativity`,
  },
  {
    heading: "Best Practices",
    content: `• Fine-tune models on domain-specific datasets for better results\n• Use prompt engineering to control output\n• Filter or post-process output for grammar or bias\n• Choose decoding strategy based on task (e.g., beam search for summarization)\n• Watch for hallucinations (generated facts that are not true)`,
  }
];

const AiTextGenerationCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="NLP Text Generation Cheat Sheet"
      description="Quick reference for generating coherent text using NLP techniques and Transformer-based models."
      sections={textGenerationSections}
      cheatsheetId={2}
    />
  );
};

export default AiTextGenerationCheatSheet;
