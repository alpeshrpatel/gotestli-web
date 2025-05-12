import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const classificationSections = [
  {
    heading: "What is Classification?",
    content: `Classification is a supervised learning task where the model learns to predict discrete class labels or categories from labeled training data. The goal is to identify which category an observation belongs to based on its features.<br/><br/>Classification is one of the most common machine learning tasks with numerous applications including spam detection, medical diagnosis, credit scoring, image recognition, and sentiment analysis.`,
  },
  {
    heading: "Classification vs. Other ML Tasks",
    content: `**Classification vs. Regression:**<br/>
• **Classification**: Predicts discrete class labels (categories)<br/>
• **Regression**: Predicts continuous numerical values<br/><br/>

**Binary vs. Multiclass vs. Multilabel:**<br/>
• **Binary**: Two possible classes (e.g., spam/not spam)<br/>
• **Multiclass**: More than two mutually exclusive classes (e.g., animal species)<br/>
• **Multilabel**: Instances can belong to multiple classes simultaneously<br/><br/>

**Classification vs. Clustering:**<br/>
• **Classification**: Supervised (uses labeled data)<br/>
• **Clustering**: Unsupervised (finds natural groupings in unlabeled data)`,
  },
  {
    heading: "Popular Classification Algorithms",
    content: `**Logistic Regression:**<br/>
• Linear model for binary classification<br/>
• Uses sigmoid function to model probability<br/>
• Simple, interpretable, efficient<br/><br/>

**Decision Trees:**<br/>
• Tree-like model of decisions<br/>
• Intuitive, interpretable<br/>
• Prone to overfitting<br/><br/>

**Random Forest:**<br/>
• Ensemble of decision trees<br/>
• Reduced overfitting, good performance<br/>
• Less interpretable than single trees<br/><br/>

**Support Vector Machines (SVM):**<br/>
• Finds optimal hyperplane separating classes<br/>
• Effective in high-dimensional spaces<br/>
• Kernel trick for non-linear boundaries<br/><br/>

**K-Nearest Neighbors (KNN):**<br/>
• Instance-based learning<br/>
• Classifies based on majority vote of k nearest neighbors<br/>
• Simple but can be computationally expensive<br/><br/>

**Naive Bayes:**<br/>
• Probabilistic classifier based on Bayes' theorem<br/>
• Fast, efficient, works well with high-dimensional data<br/>
• Assumes feature independence (often unrealistic)<br/><br/>

**Neural Networks:**<br/>
• Multi-layer perceptrons for complex patterns<br/>
• Powerful, can model complex relationships<br/>
• Require more data and tuning`,
  },
  {
    heading: "Evaluation Metrics",
    content: `**Accuracy:**<br/>
• Proportion of correct predictions<br/>
• Accuracy = (TP + TN) / (TP + TN + FP + FN)<br/>
• Misleading for imbalanced classes<br/><br/>

**Precision and Recall:**<br/>
• **Precision**: TP / (TP + FP) - How many selected items are relevant<br/>
• **Recall**: TP / (TP + FN) - How many relevant items are selected<br/><br/>

**F1 Score:**<br/>
• Harmonic mean of precision and recall<br/>
• F1 = 2 * (Precision * Recall) / (Precision + Recall)<br/><br/>

**Confusion Matrix:**<br/>
• Table showing actual vs. predicted classes<br/>
• Shows TP, TN, FP, FN counts<br/><br/>

**ROC Curve and AUC:**<br/>
• Plots TPR vs. FPR at various thresholds<br/>
• AUC: Area Under ROC Curve<br/>
• AUC = 1 (perfect), AUC = 0.5 (random)<br/><br/>

**Precision-Recall Curve:**<br/>
• Better for imbalanced datasets<br/>
• Plots precision vs. recall at various thresholds<br/><br/>

**Log Loss:**<br/>
• Measures uncertainty of predictions<br/>
• Heavily penalizes confident incorrect predictions`,
  },
  {
    heading: "Feature Engineering for Classification",
    content: `**Numeric Features:**<br/>
• **Scaling**: StandardScaler, MinMaxScaler, RobustScaler<br/>
• **Binning**: Convert continuous to categorical<br/>
• **Polynomial Features**: Capture non-linear relationships<br/><br/>

**Categorical Features:**<br/>
• **One-Hot Encoding**: Create binary columns for each category<br/>
• **Label Encoding**: Convert categories to numbers (ordinal data)<br/>
• **Target Encoding**: Replace category with target mean<br/><br/>

**Text Features:**<br/>
• **Bag of Words**: Count word occurrences<br/>
• **TF-IDF**: Term frequency-inverse document frequency<br/>
• **Word Embeddings**: Word2Vec, GloVe, BERT<br/><br/>

**Feature Selection:**<br/>
• **Filter Methods**: Chi-square, ANOVA, correlation<br/>
• **Wrapper Methods**: Recursive feature elimination<br/>
• **Embedded Methods**: L1 regularization, tree importance<br/><br/>

**Dimensionality Reduction:**<br/>
• **PCA**: Principal Component Analysis<br/>
• **LDA**: Linear Discriminant Analysis<br/>
• **t-SNE**: For visualization`,
  },
  {
    heading: "Code Example: Scikit-learn Classification",
    code: `# Simple classification workflow with scikit-learn
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# Load data
data = pd.read_csv('your_dataset.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Identify numeric and categorical features
numeric_features = X.select_dtypes(include=['int64', 'float64']).columns
categorical_features = X.select_dtypes(include=['object', 'category']).columns

# Preprocessing pipelines
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Combine preprocessing steps
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ]
)

# Create pipeline with model
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Train model
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Cross-validation
cv_scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
print(f"Cross-validation accuracy: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# Feature importance (for Random Forest)
if hasattr(model[-1], 'feature_importances_'):
    importances = model[-1].feature_importances_
    forest_importances = pd.Series(importances, index=numeric_features.tolist() + categorical_features.tolist())
    forest_importances.sort_values(ascending=False).plot(kind='bar')
`
  },
  {
    heading: "Code Example: Binary Classification with TensorFlow",
    code: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load and preprocess data
data = pd.read_csv('your_dataset.csv')
X = data.drop('target', axis=1).values
y = data['target'].values

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Build model
model = Sequential([
    Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    Dropout(0.2),
    Dense(32, activation='relu'),
    Dropout(0.2),
    Dense(1, activation='sigmoid')
])

# Compile model
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy', tf.keras.metrics.AUC(), tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]
)

# Early stopping
early_stopping = EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True
)

# Train model
history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=32,
    validation_split=0.2,
    callbacks=[early_stopping],
    verbose=1
)

# Evaluate model
eval_results = model.evaluate(X_test, y_test)
print(f"Test loss: {eval_results[0]:.4f}")
print(f"Test accuracy: {eval_results[1]:.4f}")
print(f"Test AUC: {eval_results[2]:.4f}")
print(f"Test precision: {eval_results[3]:.4f}")
print(f"Test recall: {eval_results[4]:.4f}")

# Make predictions
y_pred_prob = model.predict(X_test)
y_pred = (y_pred_prob > 0.5).astype(int).flatten()

# Create confusion matrix
from sklearn.metrics import confusion_matrix, classification_report
cm = confusion_matrix(y_test, y_pred)
print(cm)
print(classification_report(y_test, y_pred))
`
  },
  {
    heading: "Handling Class Imbalance",
    content: `**Resampling Techniques:**<br/>
• **Undersampling**: Reduce majority class samples<br/>
• **Oversampling**: Duplicate or generate minority class samples<br/>
• **SMOTE**: Synthetic Minority Over-sampling Technique<br/><br/>

**Algorithm-level Methods:**<br/>
• **Class weights**: Penalize misclassification of minority class<br/>
• **Threshold moving**: Adjust decision threshold<br/>
• **Ensemble methods**: Specialized for imbalanced data<br/><br/>

**Evaluation with Imbalanced Data:**<br/>
• **Stratified sampling**: Maintain class proportions<br/>
• **Precision-Recall curve**: Better than ROC for imbalance<br/>
• **F-beta score**: Weight precision vs. recall<br/>
• **G-mean**: Geometric mean of class-wise sensitivity`,
  },
  {
    heading: "Hyperparameter Tuning",
    content: `**Common Hyperparameters by Algorithm:**<br/>
• **Logistic Regression**: C (regularization), penalty type<br/>
• **Decision Tree**: max_depth, min_samples_split, criterion<br/>
• **Random Forest**: n_estimators, max_features, bootstrap<br/>
• **SVM**: C, kernel, gamma<br/>
• **KNN**: n_neighbors, weights, metric<br/>
• **Neural Network**: learning_rate, layer sizes, activation functions<br/><br/>

**Tuning Methods:**<br/>
• **Grid Search**: Exhaustive search over parameter grid<br/>
• **Random Search**: Random sampling from parameter distributions<br/>
• **Bayesian Optimization**: Sequential model-based optimization<br/>
• **Genetic Algorithms**: Evolutionary approach to parameter tuning<br/><br/>

**Cross-Validation Strategies:**<br/>
• **K-Fold**: Split data into k folds, train on k-1, test on 1<br/>
• **Stratified K-Fold**: Maintains class distribution in each fold<br/>
• **Leave-One-Out**: Extreme case of k-fold where k=n<br/>
• **Time Series Splits**: For temporal data`,
  },
  {
    heading: "Real-world Considerations",
    content: `**Interpretability vs Performance:**<br/>
• Linear models vs complex black-box models<br/>
• Feature importance and SHAP values<br/>
• Model-specific explanation methods<br/><br/>

**Bias and Fairness:**<br/>
• Identify and mitigate bias in training data<br/>
• Evaluate fairness across protected attributes<br/>
• Fairness-aware algorithms and constraints<br/><br/>

**Deployment Challenges:**<br/>
• Model drift and monitoring<br/>
• Computational efficiency<br/>
• Integration with existing systems<br/>
• Versioning and reproducibility<br/><br/>

**Common Pitfalls:**<br/>
• Data leakage during preprocessing<br/>
• Overfitting to the validation set<br/>
• Improper handling of categorical features<br/>
• Not addressing class imbalance appropriately<br/>
• Choosing metrics that don't align with business goals`,
  },
  {
    heading: "Popular Classification Datasets",
    content: `• **Iris**: 150 samples, 3 classes of iris plants (beginner-friendly)<br/>
• **MNIST**: 70K handwritten digits<br/>
• **Breast Cancer Wisconsin**: Binary classification of tumors<br/>
• **Adult Income**: Predict income exceeds $50K/year<br/>
• **Credit Card Fraud**: Highly imbalanced fraud detection<br/>
• **Heart Disease**: Predict presence of heart disease<br/>
• **Wine Quality**: Classify wine quality based on attributes<br/>
• **Titanic**: Predict passenger survival<br/>
• **CIFAR-10/100**: Image classification with 10/100 classes<br/>
• **IMDb Reviews**: Sentiment analysis of movie reviews`,
  }
];

const ClassificationCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Machine Learning: Supervised Classification Cheat Sheet"
      description="A comprehensive guide to supervised learning classification algorithms, techniques, evaluation metrics, and implementations."
      sections={classificationSections}
    />
  );
};

export default ClassificationCheatSheet;