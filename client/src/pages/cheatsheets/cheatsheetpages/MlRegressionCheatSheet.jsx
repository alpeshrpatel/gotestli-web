import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const regressionSections = [
  {
    heading: "What is Regression?",
    content: `Regression is a supervised learning technique in machine learning that predicts continuous output values based on input features. Unlike classification which predicts discrete categories, regression estimates a target variable that can take any real value within a range.<br/><br/>Regression is fundamental to many machine learning applications including price prediction, demand forecasting, financial analysis, scientific research, resource optimization, and predictive maintenance.`,
  },
  {
    heading: "Regression vs. Related Tasks",
    content: `**Regression vs. Classification:**<br/>
• **Regression**: Predicts continuous values (e.g., house prices, temperature)<br/>
• **Classification**: Predicts discrete categories or classes (e.g., spam/not spam)<br/><br/>

**Regression vs. Time Series Forecasting:**<br/>
• **Regression**: Typically focuses on relationships between variables at a point in time<br/>
• **Time Series Forecasting**: Specifically predicts future values based on past values with temporal dependencies<br/><br/>

**Regression vs. Clustering:**<br/>
• **Regression**: Supervised learning with labeled data predicting a target value<br/>
• **Clustering**: Unsupervised learning that groups similar data points without labeled targets`,
  },
  {
    heading: "Types of Regression Models",
    content: `**Linear Regression:**<br/>
• Establishes a linear relationship between input features and target variable<br/>
• Simple linear regression: One input feature<br/>
• Multiple linear regression: Multiple input features<br/><br/>

**Polynomial Regression:**<br/>
• Extends linear regression by including polynomial terms of input features<br/>
• Can capture non-linear relationships with higher-order terms<br/><br/>

**Ridge Regression (L2 Regularization):**<br/>
• Adds a penalty term proportional to the square of feature weights<br/>
• Reduces overfitting by shrinking coefficients<br/><br/>

**Lasso Regression (L1 Regularization):**<br/>
• Adds a penalty term proportional to the absolute value of weights<br/>
• Performs feature selection by driving some coefficients to zero<br/><br/>

**Elastic Net:**<br/>
• Combines both L1 and L2 regularization penalties<br/>
• Balances feature selection and coefficient shrinkage<br/><br/>

**Decision Tree Regression:**<br/>
• Non-parametric model using tree-like structure<br/>
• Splits data based on feature thresholds to minimize error<br/><br/>

**Random Forest Regression:**<br/>
• Ensemble of decision trees with bagging<br/>
• Reduces variance and improves generalization<br/><br/>

**Gradient Boosting Regression:**<br/>
• Sequential ensemble method building trees to correct errors of previous ones<br/>
• Variants: XGBoost, LightGBM, CatBoost<br/><br/>

**Support Vector Regression (SVR):**<br/>
• Extension of SVM for regression problems<br/>
• Finds a tube that contains most data points while minimizing error<br/><br/>

**Neural Network Regression:**<br/>
• Multi-layer perceptrons applied to regression tasks<br/>
• Can model complex non-linear relationships`,
  },
  {
    heading: "Linear Regression Fundamentals",
    content: `**Model Formulation:**<br/>
• Simple Linear: y = β₀ + β₁x + ε<br/>
• Multiple Linear: y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε<br/>
Where:<br/>
  - y is the target variable<br/>
  - β₀ is the intercept<br/>
  - βᵢ are the coefficients<br/>
  - xᵢ are the input features<br/>
  - ε is the error term<br/><br/>

**Cost Function (Mean Squared Error):**<br/>
• MSE = (1/n) ∑(yᵢ - ŷᵢ)²<br/>
• Objective: Find coefficients that minimize MSE<br/><br/>

**Estimation Methods:**<br/>
• **Ordinary Least Squares (OLS)**: Analytical solution minimizing squared errors<br/>
• **Gradient Descent**: Iterative optimization algorithm<br/><br/>

**Assumptions of Linear Regression:**<br/>
• Linearity: Linear relationship between features and target<br/>
• Independence: Observations are independent<br/>
• Homoscedasticity: Constant variance of errors<br/>
• Normality: Errors follow normal distribution<br/>
• No multicollinearity: Input features are not highly correlated`,
  },
  {
    heading: "Feature Engineering for Regression",
    content: `**Feature Scaling:**<br/>
• **Standardization**: z = (x - μ) / σ<br/>
• **Min-Max Scaling**: x_scaled = (x - min) / (max - min)<br/><br/>

**Handling Non-linearity:**<br/>
• Polynomial features: x, x², x³, etc.<br/>
• Log transformation: log(x)<br/>
• Power transformations: x^c, Box-Cox, Yeo-Johnson<br/><br/>

**Handling Categorical Variables:**<br/>
• One-hot encoding: Convert categories to binary features<br/>
• Label encoding: For ordinal categories<br/>
• Target encoding: Replace category with mean of target value<br/><br/>

**Feature Interactions:**<br/>
• Creating interaction terms: x₁ × x₂<br/>
• Identify synergistic relationships between features<br/><br/>

**Feature Selection:**<br/>
• Filter methods: Correlation, mutual information<br/>
• Wrapper methods: Recursive feature elimination (RFE)<br/>
• Embedded methods: Lasso, decision trees<br/><br/>

**Handling Missing Values:**<br/>
• Imputation strategies: mean, median, mode<br/>
• Advanced imputation: KNN, regression, MICE<br/><br/>

**Handling Outliers:**<br/>
• Detection: Z-score, IQR, isolation forest<br/>
• Treatment: Winsorization, transformation, removal`,
  },
  {
    heading: "Evaluation Metrics for Regression",
    content: `**Mean Squared Error (MSE):**<br/>
• MSE = (1/n) ∑(yᵢ - ŷᵢ)²<br/>
• Heavily penalizes large errors<br/><br/>

**Root Mean Squared Error (RMSE):**<br/>
• RMSE = √MSE<br/>
• Same units as the target variable<br/><br/>

**Mean Absolute Error (MAE):**<br/>
• MAE = (1/n) ∑|yᵢ - ŷᵢ|<br/>
• More robust to outliers than MSE<br/><br/>

**Mean Absolute Percentage Error (MAPE):**<br/>
• MAPE = (100%/n) ∑|yᵢ - ŷᵢ|/|yᵢ|<br/>
• Scale-independent but problematic when y values are close to zero<br/><br/>

**R² (Coefficient of Determination):**<br/>
• R² = 1 - SSres/SStot<br/>
• Represents proportion of variance explained by the model<br/>
• Range: [0, 1] with higher values indicating better fit<br/>
• Can be negative for poorly fit models<br/><br/>

**Adjusted R²:**<br/>
• Adjusts R² for the number of predictors<br/>
• Penalizes complex models to prevent overfitting<br/><br/>

**Huber Loss:**<br/>
• Combines MSE for small errors and MAE for large errors<br/>
• More robust to outliers`,
  },
  {
    heading: "Code Example: Linear Regression with Scikit-learn",
    code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.pipeline import Pipeline

# Load dataset (example with Boston housing data)
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing()
X = pd.DataFrame(housing.data, columns=housing.feature_names)
y = housing.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Create a pipeline with preprocessing and model
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('regressor', LinearRegression())
])

# Train the model
pipeline.fit(X_train, y_train)

# Make predictions
y_pred = pipeline.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse:.4f}")
print(f"Root Mean Squared Error: {rmse:.4f}")
print(f"R² Score: {r2:.4f}")

# Get model coefficients
coefficients = pd.DataFrame(
    pipeline.named_steps['regressor'].coef_,
    index=X.columns,
    columns=['Coefficient']
)
print("\nModel Coefficients:")
print(coefficients)

# Plot actual vs predicted values
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.5)
plt.plot([y.min(), y.max()], [y.min(), y.max()], 'r--')
plt.xlabel('Actual')
plt.ylabel('Predicted')
plt.title('Actual vs Predicted Values')
plt.tight_layout()
plt.show()`
  },
  {
    heading: "Code Example: Ridge and Lasso Regression",
    code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import Ridge, Lasso
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.pipeline import Pipeline

# Load dataset
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing()
X = pd.DataFrame(housing.data, columns=housing.feature_names)
y = housing.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Ridge Regression with hyperparameter tuning
ridge_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('ridge', Ridge(random_state=42))
])

ridge_params = {'ridge__alpha': [0.01, 0.1, 1.0, 10.0, 100.0]}
ridge_grid = GridSearchCV(ridge_pipeline, ridge_params, cv=5, scoring='neg_mean_squared_error')
ridge_grid.fit(X_train, y_train)

# Lasso Regression with hyperparameter tuning
lasso_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('lasso', Lasso(random_state=42, max_iter=10000))
])

lasso_params = {'lasso__alpha': [0.001, 0.01, 0.1, 1.0, 10.0]}
lasso_grid = GridSearchCV(lasso_pipeline, lasso_params, cv=5, scoring='neg_mean_squared_error')
lasso_grid.fit(X_train, y_train)

# Print best parameters
print(f"Best Ridge alpha: {ridge_grid.best_params_['ridge__alpha']}")
print(f"Best Lasso alpha: {lasso_grid.best_params_['lasso__alpha']}")

# Make predictions with best models
ridge_pred = ridge_grid.predict(X_test)
lasso_pred = lasso_grid.predict(X_test)

# Evaluate models
models = {
    'Ridge': (ridge_grid, ridge_pred),
    'Lasso': (lasso_grid, lasso_pred)
}

for name, (model, preds) in models.items():
    mse = mean_squared_error(y_test, preds)
    r2 = r2_score(y_test, preds)
    print(f"\n{name} Results:")
    print(f"MSE: {mse:.4f}")
    print(f"RMSE: {np.sqrt(mse):.4f}")
    print(f"R²: {r2:.4f}")

# Get coefficients from best models
ridge_coef = ridge_grid.best_estimator_.named_steps['ridge'].coef_
lasso_coef = lasso_grid.best_estimator_.named_steps['lasso'].coef_

# Compare coefficients
coef_df = pd.DataFrame({
    'Feature': X.columns,
    'Ridge Coefficients': ridge_coef,
    'Lasso Coefficients': lasso_coef
})

print("\nModel Coefficients:")
print(coef_df)

# Plot coefficient comparison
plt.figure(figsize=(12, 8))
plt.plot(range(len(ridge_coef)), ridge_coef, 'o-', label='Ridge')
plt.plot(range(len(lasso_coef)), lasso_coef, 's-', label='Lasso')
plt.xticks(range(len(X.columns)), X.columns, rotation=90)
plt.xlabel('Features')
plt.ylabel('Coefficient Value')
plt.title('Ridge vs Lasso Coefficients')
plt.legend()
plt.tight_layout()
plt.show()`
  },
  {
    heading: "Code Example: Tree-Based Regression",
    code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score
import seaborn as sns

# Load dataset
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing()
X = pd.DataFrame(housing.data, columns=housing.feature_names)
y = housing.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Create models
models = {
    'Decision Tree': DecisionTreeRegressor(max_depth=10, random_state=42),
    'Random Forest': RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42),
    'Gradient Boosting': GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, 
                                                max_depth=5, random_state=42)
}

# Train and evaluate models
results = {}

for name, model in models.items():
    # Train
    model.fit(X_train, y_train)
    
    # Predict
    y_pred = model.predict(X_test)
    
    # Evaluate
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)
    
    # Cross-validation score
    cv_scores = cross_val_score(model, X, y, cv=5, scoring='neg_mean_squared_error')
    cv_rmse = np.sqrt(-cv_scores.mean())
    
    # Store results
    results[name] = {
        'MSE': mse,
        'RMSE': rmse,
        'R²': r2,
        'CV RMSE': cv_rmse
    }

# Display results
results_df = pd.DataFrame(results).T
print(results_df)

# Feature importance (Random Forest)
rf_model = models['Random Forest']
importances = rf_model.feature_importances_
indices = np.argsort(importances)[::-1]

plt.figure(figsize=(10, 6))
plt.title('Feature Importances (Random Forest)')
plt.bar(range(X.shape[1]), importances[indices], align='center')
plt.xticks(range(X.shape[1]), [X.columns[i] for i in indices], rotation=90)
plt.tight_layout()
plt.show()

# Actual vs Predicted plot for best model
best_model_name = results_df['R²'].idxmax()
best_model = models[best_model_name]
best_pred = best_model.predict(X_test)

plt.figure(figsize=(10, 6))
plt.scatter(y_test, best_pred, alpha=0.5)
plt.plot([y.min(), y.max()], [y.min(), y.max()], 'r--')
plt.xlabel('Actual')
plt.ylabel('Predicted')
plt.title(f'Actual vs Predicted Values ({best_model_name})')
plt.tight_layout()
plt.show()`
  },
  {
    heading: "Cross-Validation and Hyperparameter Tuning",
    content: `**Cross-Validation Techniques:**<br/>
• **K-Fold CV**: Split data into k folds, train on k-1 folds, test on remaining fold<br/>
• **Leave-One-Out CV**: Special case of K-fold with k = n samples<br/>
• **Time Series CV**: Respects temporal ordering for time series data<br/><br/>

**Hyperparameter Tuning Methods:**<br/>
• **Grid Search**: Exhaustive search over parameter grid<br/>
• **Random Search**: Random sampling from parameter distributions<br/>
• **Bayesian Optimization**: Sequential strategy using information from previous trials<br/>
• **Genetic Algorithms**: Evolutionary approach for parameter optimization<br/><br/>

**Common Hyperparameters to Tune:**<br/>
• **Linear Models**: Regularization strength (alpha), tolerance<br/>
• **Decision Trees**: Max depth, min samples split, min samples leaf<br/>
• **Random Forest**: Number of trees, max features, max depth<br/>
• **Gradient Boosting**: Learning rate, number of trees, tree depth, subsample rate<br/>
• **SVR**: Kernel type, C, epsilon, gamma<br/>
• **Neural Networks**: Learning rate, layer architecture, activation functions`,
  },
  {
    heading: "Code Example: Hyperparameter Tuning",
    code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from scipy.stats import uniform, randint

# Load dataset
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing()
X = pd.DataFrame(housing.data, columns=housing.feature_names)
y = housing.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Create pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('gbr', GradientBoostingRegressor(random_state=42))
])

# Define parameter distributions for randomized search
param_distributions = {
    'gbr__n_estimators': randint(50, 300),
    'gbr__learning_rate': uniform(0.01, 0.2),
    'gbr__max_depth': randint(3, 10),
    'gbr__min_samples_split': randint(2, 20),
    'gbr__min_samples_leaf': randint(1, 10),
    'gbr__subsample': uniform(0.7, 0.3),
    'gbr__max_features': ['sqrt', 'log2', None]
}

# Randomized search with cross-validation
random_search = RandomizedSearchCV(
    pipeline,
    param_distributions=param_distributions,
    n_iter=50,
    cv=5,
    scoring='neg_mean_squared_error',
    n_jobs=-1,
    verbose=1,
    random_state=42
)

# Fit the random search
random_search.fit(X_train, y_train)

# Best parameters and score
print("Best Parameters:")
for param, value in random_search.best_params_.items():
    print(f"{param}: {value}")

best_score = np.sqrt(-random_search.best_score_)
print(f"\nBest CV RMSE: {best_score:.4f}")

# Evaluate on test set
best_model = random_search.best_estimator_
test_score = np.sqrt(mean_squared_error(y_test, best_model.predict(X_test)))
print(f"Test RMSE: {test_score:.4f}")

# Feature importance from the best model
feature_importance = best_model.named_steps['gbr'].feature_importances_
feature_names = X.columns

# Sort features by importance
sorted_idx = np.argsort(feature_importance)[::-1]
sorted_features = [feature_names[i] for i in sorted_idx]
sorted_importance = [feature_importance[i] for i in sorted_idx]

# Create a DataFrame for better visualization
importance_df = pd.DataFrame({
    'Feature': sorted_features,
    'Importance': sorted_importance
})

print("\nFeature Importance:")
print(importance_df.head(10))

# Plot feature importance
plt.figure(figsize=(12, 6))
plt.barh(range(len(sorted_importance)), sorted_importance, align='center')
plt.yticks(range(len(sorted_importance)), sorted_features)
plt.xlabel('Importance')
plt.title('Feature Importance (Best GBR Model)')
plt.tight_layout()
plt.show()`
  },
  {
    heading: "Advanced Regression Techniques",
    content: `**Ensemble Methods:**<br/>
• **Stacking**: Combine predictions from multiple models using meta-learner<br/>
• **Blending**: Similar to stacking but uses a hold-out set for meta-model<br/>
• **Voting Regressor**: Average predictions from multiple regression models<br/><br/>

**Advanced Tree-Based Methods:**<br/>
• **LightGBM**: Gradient boosting framework using histogram-based algorithms<br/>
• **XGBoost**: Optimized gradient boosting with regularization and parallel processing<br/>
• **CatBoost**: Boosting algorithm with better handling of categorical features<br/><br/>

**Neural Network Approaches:**<br/>
• **Deep Neural Networks**: Multiple hidden layers for complex function approximation<br/>
• **Convolutional Neural Networks**: For structured data like images or time series<br/>
• **Recurrent Neural Networks**: For sequential data with temporal dependencies<br/><br/>

**Other Advanced Methods:**<br/>
• **Gaussian Process Regression**: Probabilistic approach providing uncertainty estimates<br/>
• **Quantile Regression**: Predicts different quantiles of the target distribution<br/>
• **Isotonic Regression**: Monotonic regression with minimal assumptions<br/>
• **Bayesian Regression**: Incorporates prior beliefs and provides posterior distributions`,
  },
  {
    heading: "Handling Imbalanced Data in Regression",
    content: `**Challenges with Skewed Target Distributions:**<br/>
• Models may bias toward the majority distribution<br/>
• Rare but important cases might be poorly predicted<br/><br/>

**Techniques for Handling Imbalanced Regression:**<br/>
• **Target Transformation**: Log transform, Box-Cox, quantile transform<br/>
• **Weighted Regression**: Assign higher weights to underrepresented ranges<br/>
• **Stratified Sampling**: Ensure representation across target value ranges<br/>
• **SMOTE for Regression**: Generate synthetic samples for rare target ranges<br/>
• **Custom Loss Functions**: Adjust loss to penalize errors in underrepresented ranges<br/><br/>

**Evaluation for Imbalanced Regression:**<br/>
• Use metrics less sensitive to scale (e.g., MAPE, weighted MSE)<br/>
• Evaluate performance across different target value ranges<br/>
• Consider domain-specific error costs`,
  },
  {
    heading: "Model Interpretability for Regression",
    content: `**Feature Importance:**<br/>
• **Linear Models**: Coefficient magnitude (standardized features)<br/>
• **Tree Models**: Feature importance based on impurity reduction<br/>
• **Permutation Importance**: Drop in performance when feature values are shuffled<br/><br/>

**Partial Dependence Plots (PDP):**<br/>
• Shows marginal effect of feature on target<br/>
• Helps understand non-linear relationships<br/><br/>

**SHAP (SHapley Additive exPlanations):**<br/>
• Game-theoretic approach to feature attribution<br/>
• Local and global interpretability<br/>
• Shows both direction and magnitude of feature impact<br/><br/>

**LIME (Local Interpretable Model-agnostic Explanations):**<br/>
• Generates local linear approximation around prediction<br/>
• Explains individual predictions<br/><br/>

**Regression Diagnostics:**<br/>
• Residual plots to identify patterns and outliers<br/>
• QQ plots to check error distribution<br/>
• Leverage and influence analysis`,
  },
  {
    heading: "Code Example: Model Interpretation with SHAP",
    code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import shap
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

# Load dataset
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing()
X = pd.DataFrame(housing.data, columns=housing.feature_names)
y = housing.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
X_train_scaled_df = pd.DataFrame(X_train_scaled, columns=X.columns)

# Train a model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Create a SHAP explainer
explainer = shap.TreeExplainer(model)

# Calculate SHAP values for a sample of test data
sample_size = min(500, X_test_scaled.shape[0])
sample_indices = np.random.choice(X_test_scaled.shape[0], sample_size, replace=False)
X_sample = X_test_scaled[sample_indices]
X_sample_df = pd.DataFrame(X_sample, columns=X.columns)

# Calculate SHAP values
shap_values = explainer.shap_values(X_sample)

# Summary plot
plt.figure(figsize=(10, 8))
shap.summary_plot(shap_values, X_sample_df)
plt.tight_layout()

# Dependence plots for most important features
most_important_features = np.argsort(np.abs(shap_values).mean(axis=0))[-3:]
for feature_idx in most_important_features:
    feature_name = X.columns[feature_idx]
    plt.figure(figsize=(10, 6))
    shap.dependence_plot(feature_name, shap_values, X_sample_df)
    plt.tight_layout()

# Force plot for individual predictions
sample_idx = 0  # First sample in the test set
plt.figure(figsize=(15, 3))
shap.force_plot(explainer.expected_value, 
               shap_values[sample_idx, :], 
               X_sample_df.iloc[sample_idx, :],
               matplotlib=True)
plt.tight_layout()

# Waterfall plot for individual prediction
plt.figure(figsize=(10, 8))
shap.plots._waterfall.waterfall_legacy(explainer.expected_value, 
                                      shap_values[sample_idx, :], 
                                      X_sample_df.iloc[sample_idx, :],
                                      show=True)
plt.tight_layout()

plt.show()`
  },
  {
    heading: "Real-World Applications of Regression",
    content: `**Finance:**<br/>
• Stock price prediction<br/>
• Risk assessment<br/>
• Loan default prediction<br/>
• Portfolio optimization<br/><br/>

**Real Estate:**<br/>
• House price prediction<br/>
• Rental rate estimation<br/>
• Property valuation<br/><br/>

**Healthcare:**<br/>
• Patient length-of-stay prediction<br/>
• Drug dosage optimization<br/>
• Disease progression modeling<br/>
• Healthcare cost prediction<br/><br/>

**E-commerce:**<br/>
• Sales forecasting<br/>
• Customer lifetime value prediction<br/>
• Inventory optimization<br/>
• Price elasticity modeling<br/><br/>

**Manufacturing:**<br/>
• Predictive maintenance<br/>
• Quality control<br/>
• Yield optimization<br/>
• Resource utilization<br/><br/>

**Energy:**<br/>
• Load forecasting<br/>
• Renewable energy output prediction<br/>
• Energy consumption modeling<br/><br/>

**Transportation:**<br/>
• Trip duration estimation<br/>
• Traffic flow prediction<br/>
• Fuel consumption optimization`,
  },
  {
    heading: "Best Practices and Common Pitfalls",
    content: `**Best Practices:**<br/>
• Understand your data before modeling<br/>
• Check feature distributions and correlations<br/>
• Handle outliers and missing data appropriately<br/>
• Validate assumptions for parametric models<br/>
• Use cross-validation for reliable performance estimates<br/>
• Start with simple models before complex ones<br/>
• Regularize models to prevent overfitting<br/>
• Interpret models and validate with domain knowledge<br/><br/>

**Common Pitfalls:**<br/>
• **Data Leakage**: Information from validation/test set affects model training<br/>
• **Multicollinearity**: Highly correlated features causing unstable estimates<br/>
• **Overfitting**: Model performs well on training data but fails on new data<br/>
• **Underfitting**: Model too simple to capture important patterns<br/>
• **Target Leakage**: Using features unavailable at prediction time<br/>
• **Selection Bias**: Training data not representative of actual application<br/>
• **Ignoring Feature Scaling**: Affects models sensitive to feature scales<br/>
• **Incorrect Hyperparameter Tuning**: Poor search strategy or validation process`,
  },
  {
    heading: "Recent Advances in Regression",
    content: `• **Automated Machine Learning (AutoML)**: Automatic feature engineering and model selection<br/>
• **Neural Architecture Search**: Finding optimal neural network architectures<br/>
• **Transfer Learning**: Using pre-trained models for regression tasks<br/>
• **Deep Learning Regression**: Advanced architectures for complex regression problems<br/>
• **Explainable AI (XAI)**: Enhancing interpretability of complex models<br/>
• **Federated Learning**: Collaborative model training without sharing raw data<br/>
• **Meta-Learning**: Learning to learn from multiple regression tasks<br/>
• **Reinforcement Learning for Regression**: Using RL techniques for continuous output prediction<br/>
• **Graph Neural Networks**: Leveraging graph structures for regression tasks<br/>
• **Neural ODEs**: Continuous-time models for regression tasks<br/>
• **Bayesian Neural Networks**: Uncertainty quantification in regression predictions<br/>
• **Self-supervised Learning**: Leveraging unlabeled data for regression tasks<br/>
• **Generative Models**: Using generative approaches for regression tasks<br/>
• **Federated Regression**: Collaborative regression without sharing data<br/>
• **Neural Architecture Search for Regression**: Automated search for optimal architectures<br/> `
  }
];

const MlRegressionCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Machine Learning Regression Cheat Sheet"
      description="A comprehensive guide to regression techniques in machine learning."
      sections={regressionSections}
      cheatsheetId={20}
    />
  );
};

export default MlRegressionCheatSheet;