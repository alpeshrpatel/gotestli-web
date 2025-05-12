import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const dimensionalityReductionSections = [
  {
    heading: "What is Dimensionality Reduction?",
    content: `Dimensionality reduction is an unsupervised learning technique that transforms high-dimensional data into a lower-dimensional representation while preserving important structures or information. It addresses the "curse of dimensionality" and helps with visualization, computational efficiency, and model performance.<br/><br/>Applications include data visualization, feature extraction, noise reduction, improved machine learning performance, and as a preprocessing step for other algorithms.`,
  },
  {
    heading: "Dimensionality Reduction vs. Other ML Tasks",
    content: `**Dimensionality Reduction vs. Feature Selection:**<br/>
• **Dimensionality Reduction**: Creates new features as combinations of original features<br/>
• **Feature Selection**: Selects a subset of original features without transformation<br/><br/>

**Dimensionality Reduction vs. Clustering:**<br/>
• **Dimensionality Reduction**: Transforms data to lower dimensions, preserving relationships<br/>
• **Clustering**: Groups similar instances together, preserves original dimensions<br/><br/>

**Linear vs. Nonlinear Dimensionality Reduction:**<br/>
• **Linear**: Assumes linear relationships between features (PCA, LDA)<br/>
• **Nonlinear**: Captures complex, nonlinear relationships (t-SNE, UMAP, Autoencoders)`,
  },
  {
    heading: "Popular Dimensionality Reduction Techniques",
    content: `**Principal Component Analysis (PCA):**<br/>
• Linear technique that finds orthogonal directions of maximum variance<br/>
• Fast, simple, widely used<br/>
• Preserves global structure but may miss local patterns<br/><br/>

**t-Distributed Stochastic Neighbor Embedding (t-SNE):**<br/>
• Nonlinear technique focusing on preserving local similarities<br/>
• Excellent for visualization in 2D/3D<br/>
• Not suitable for dimensionality reduction when d > 3<br/>
• Computationally intensive for large datasets<br/><br/>

**Uniform Manifold Approximation and Projection (UMAP):**<br/>
• Balance between preserving local and global structure<br/>
• Faster than t-SNE with comparable quality<br/>
• More theoretically grounded than t-SNE<br/><br/>

**Linear Discriminant Analysis (LDA):**<br/>
• Supervised technique maximizing class separability<br/>
• Finds dimensions that best discriminate between classes<br/>
• Limited to c-1 dimensions (c = number of classes)<br/><br/>

**Kernel PCA:**<br/>
• Nonlinear extension of PCA using kernel trick<br/>
• Can capture nonlinear patterns<br/>
• Kernel selection impacts results<br/><br/>

**Autoencoders:**<br/>
• Neural network approach with encoder and decoder<br/>
• Can learn complex nonlinear transformations<br/>
• Variational Autoencoders add probabilistic components<br/><br/>

**Multidimensional Scaling (MDS):**<br/>
• Preserves pairwise distances between points<br/>
• Classical MDS is equivalent to PCA<br/>
• Nonmetric MDS preserves order of distances<br/><br/>

**Isomap:**<br/>
• Extends MDS by using geodesic distances on manifold<br/>
• Preserves global geometry of nonlinear manifolds<br/>
• Sensitive to neighborhood selection<br/><br/>

**Locally Linear Embedding (LLE):**<br/>
• Preserves local neighborhood relationships<br/>
• Reconstructs each point from weighted neighbors<br/>
• Good for data on a single manifold`,
  },
  {
    heading: "Evaluation Metrics",
    content: `**Reconstruction Error:**<br/>
• Measures how well original data can be reconstructed<br/>
• Lower is better<br/>
• Used for methods like PCA and autoencoders<br/><br/>

**Explained Variance Ratio:**<br/>
• Proportion of variance explained by each component<br/>
• Sum should approach 1.0 for good representation<br/>
• Common for PCA and similar methods<br/><br/>

**Trustworthiness and Continuity:**<br/>
• Measure preservation of local neighborhoods<br/>
• Higher is better (range: 0 to 1)<br/>
• Used for nonlinear methods like t-SNE, UMAP<br/><br/>

**Silhouette Score with Downstream Clustering:**<br/>
• Measures cluster separation in reduced space<br/>
• Higher is better (-1 to 1)<br/><br/>

**Classification/Regression Performance:**<br/>
• Build ML models on reduced data and evaluate performance<br/>
• Compare with models using original data<br/><br/>

**Shepard Diagram:**<br/>
• Scatter plot of original vs. preserved distances<br/>
• Points should lie close to y=x line<br/><br/>

**Stress (for MDS):**<br/>
• Measures distortion in pairwise distances<br/>
• Lower is better<br/><br/>

**KL Divergence (for t-SNE):**<br/>
• Measures similarity between probability distributions<br/>
• Lower is better`,
  },
  {
    heading: "Preparing Data for Dimensionality Reduction",
    content: `**Preprocessing Steps:**<br/>
• **Scaling**: StandardScaler, MinMaxScaler essential for distance-based methods<br/>
• **Missing Value Imputation**: KNN imputer, iterative imputer<br/>
• **Outlier Treatment**: Remove or transform outliers<br/><br/>

**Feature Selection First?**<br/>
• Consider removing clearly irrelevant features<br/>
• Remove highly correlated features<br/>
• Use domain knowledge to guide initial filtering<br/><br/>

**Distance Metrics:**<br/>
• **Euclidean**: Standard distance for most methods<br/>
• **Cosine**: For text data or when direction matters more than magnitude<br/>
• **Manhattan**: Less sensitive to outliers<br/>
• **Mahalanobis**: Accounts for feature correlations<br/><br/>

**Curse of Dimensionality Issues:**<br/>
• Distance metrics become less discriminative<br/>
• Data becomes sparse<br/>
• More data needed as dimensions increase<br/>
• Overfitting becomes more likely`,
  },
  {
    heading: "Code Example: PCA",
    code: `# Principal Component Analysis (PCA)
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.pipeline import Pipeline

# Load data
data = pd.read_csv('your_dataset.csv')
X = data.select_dtypes(include=['float64', 'int64'])

# Create a pipeline with scaling and PCA
pca_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA())
])

# Fit the pipeline to the data
X_pca_all = pca_pipeline.fit_transform(X)

# Get the explained variance ratios
pca = pca_pipeline.named_steps['pca']
explained_variance = pca.explained_variance_ratio_

# Plot explained variance
plt.figure(figsize=(10, 6))
plt.bar(range(1, len(explained_variance) + 1), explained_variance)
plt.plot(range(1, len(explained_variance) + 1), 
         np.cumsum(explained_variance), 'r-o')
plt.xlabel('Principal Components')
plt.ylabel('Explained Variance Ratio')
plt.title('Explained Variance by Components')
plt.xticks(range(1, len(explained_variance) + 1))
plt.grid(True)
plt.show()

# Determine optimal number of components (e.g., 95% variance)
cumulative_variance = np.cumsum(explained_variance)
n_components = np.argmax(cumulative_variance >= 0.95) + 1
print(f"Number of components for 95% variance: {n_components}")

# Create a new PCA with the optimal number of components
pca_optimal = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA(n_components=n_components))
])

# Apply the optimal PCA
X_pca = pca_optimal.fit_transform(X)

# Get feature loadings (component coefficients)
loadings = pca_optimal.named_steps['pca'].components_
feature_names = X.columns

# Create a loadings DataFrame for easier interpretation
loadings_df = pd.DataFrame(
    loadings.T,
    columns=[f'PC{i+1}' for i in range(n_components)],
    index=feature_names
)
print("Feature loadings:")
print(loadings_df)

# Visualize first two components if available
if n_components >= 2:
    plt.figure(figsize=(10, 8))
    plt.scatter(X_pca[:, 0], X_pca[:, 1], alpha=0.5)
    plt.xlabel(f'PC1 ({explained_variance[0]:.2%} variance)')
    plt.ylabel(f'PC2 ({explained_variance[1]:.2%} variance)')
    plt.title('PCA: First Two Principal Components')
    plt.grid(True)
    
    # If we have categorical target variable, use it for coloring
    if 'target' in data.columns:
        target = data['target']
        plt.figure(figsize=(10, 8))
        for category in target.unique():
            mask = (target == category)
            plt.scatter(
                X_pca[mask, 0], 
                X_pca[mask, 1],
                alpha=0.7,
                label=f'Class {category}'
            )
        plt.xlabel(f'PC1 ({explained_variance[0]:.2%} variance)')
        plt.ylabel(f'PC2 ({explained_variance[1]:.2%} variance)')
        plt.title('PCA by Target Class')
        plt.legend()
        plt.grid(True)
    
    plt.show()

# Biplot (for showing feature directions)
def biplot(score, coeff, labels=None):
    plt.figure(figsize=(12, 10))
    xs = score[:, 0]
    ys = score[:, 1]
    
    # Plot data points
    plt.scatter(xs, ys, alpha=0.3)
    
    # Plot feature vectors
    for i, (feature, v) in enumerate(zip(feature_names, coeff.T)):
        plt.arrow(0, 0, v[0]*8, v[1]*8, head_width=0.2, head_length=0.2, color='red')
        plt.text(v[0]*8.5, v[1]*8.5, feature, color='red')
    
    plt.xlabel(f'PC1 ({explained_variance[0]:.2%} variance)')
    plt.ylabel(f'PC2 ({explained_variance[1]:.2%} variance)')
    plt.title('PCA Biplot')
    plt.grid(True)
    plt.axhline(y=0, color='k', linestyle='-', alpha=0.3)
    plt.axvline(x=0, color='k', linestyle='-', alpha=0.3)
    plt.show()

if n_components >= 2:
    biplot(X_pca[:, :2], loadings[:2, :])

# Reconstruct original data from PCA (to evaluate reconstruction error)
X_reconstructed = pca_optimal.inverse_transform(X_pca)
X_original = pca_pipeline.named_steps['scaler'].transform(X)

# Calculate reconstruction error
reconstruction_error = np.mean((X_original - X_reconstructed)**2)
print(f"Mean squared reconstruction error: {reconstruction_error:.6f}")
`
  },
  {
    heading: "Code Example: t-SNE",
    code: `# t-distributed Stochastic Neighbor Embedding (t-SNE)
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import time
from sklearn.preprocessing import StandardScaler
from sklearn.manifold import TSNE
from sklearn.pipeline import Pipeline
from sklearn.metrics import silhouette_score
from sklearn.cluster import KMeans

# Load data
data = pd.read_csv('your_dataset.csv')
X = data.select_dtypes(include=['float64', 'int64'])

# Scale the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Function to run t-SNE with different perplexities
def run_tsne_multiple_perplexities(X, perplexities=[5, 30, 50, 100]):
    results = {}
    for perp in perplexities:
        print(f"Running t-SNE with perplexity={perp}...")
        start_time = time.time()
        tsne = TSNE(
            n_components=2,
            perplexity=perp,
            n_iter=1000,
            random_state=42,
            init='pca'  # Initialize with PCA for more stability
        )
        X_tsne = tsne.fit_transform(X)
        elapsed_time = time.time() - start_time
        print(f"Completed in {elapsed_time:.2f} seconds")
        results[perp] = X_tsne
    return results

# Run t-SNE with different perplexity values
tsne_results = run_tsne_multiple_perplexities(X_scaled)

# Visualize results
fig, axes = plt.subplots(2, 2, figsize=(15, 12))
axes = axes.flatten()

for i, (perp, X_tsne) in enumerate(tsne_results.items()):
    ax = axes[i]
    ax.scatter(X_tsne[:, 0], X_tsne[:, 1], alpha=0.5)
    ax.set_title(f't-SNE with Perplexity={perp}')
    ax.set_xlabel('t-SNE Dimension 1')
    ax.set_ylabel('t-SNE Dimension 2')
    ax.grid(True)
    
    # If we have categorical target, use it for coloring
    if 'target' in data.columns:
        target = data['target']
        fig_target, ax_target = plt.subplots(figsize=(10, 8))
        for category in target.unique():
            mask = (target == category)
            ax_target.scatter(
                X_tsne[mask, 0], 
                X_tsne[mask, 1],
                alpha=0.7,
                label=f'Class {category}'
            )
        ax_target.set_title(f't-SNE by Target Class (Perplexity={perp})')
        ax_target.set_xlabel('t-SNE Dimension 1')
        ax_target.set_ylabel('t-SNE Dimension 2')
        ax_target.legend()
        ax_target.grid(True)
        plt.tight_layout()
        plt.show()

plt.tight_layout()
plt.show()

# Choose the best perplexity based on clustering performance
# (optional, if we're using t-SNE for clustering)
if len(data) >= 30:  # Only if we have enough data
    silhouette_scores = {}
    for perp, X_tsne in tsne_results.items():
        # Try different numbers of clusters
        best_score = -1
        best_k = 2
        for k in range(2, min(11, len(data) // 5)):  # Try k=2 to k=10 or less
            kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
            labels = kmeans.fit_predict(X_tsne)
            score = silhouette_score(X_tsne, labels)
            if score > best_score:
                best_score = score
                best_k = k
        silhouette_scores[perp] = (best_score, best_k)
    
    # Print results
    print("\nSilhouette Scores for different perplexities:")
    for perp, (score, k) in silhouette_scores.items():
        print(f"Perplexity={perp}: Score={score:.4f} with {k} clusters")
    
    # Get best perplexity
    best_perp = max(silhouette_scores, key=lambda x: silhouette_scores[x][0])
    print(f"\nBest perplexity value: {best_perp} with score {silhouette_scores[best_perp][0]:.4f}")
    
    # Final t-SNE with best perplexity
    best_tsne = tsne_results[best_perp]
    best_k = silhouette_scores[best_perp][1]
    
    # Cluster and visualize
    kmeans = KMeans(n_clusters=best_k, random_state=42, n_init=10)
    cluster_labels = kmeans.fit_predict(best_tsne)
    
    plt.figure(figsize=(10, 8))
    for cluster in range(best_k):
        mask = (cluster_labels == cluster)
        plt.scatter(
            best_tsne[mask, 0],
            best_tsne[mask, 1],
            alpha=0.7,
            label=f'Cluster {cluster}'
        )
    plt.title(f't-SNE Clustering with {best_k} clusters (Perplexity={best_perp})')
    plt.xlabel('t-SNE Dimension 1')
    plt.ylabel('t-SNE Dimension 2')
    plt.legend()
    plt.grid(True)
    plt.show()
`
  },
  {
    heading: "Code Example: UMAP",
    code: `# Uniform Manifold Approximation and Projection (UMAP)
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import time
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import umap  # pip install umap-learn

# Load data
data = pd.read_csv('your_dataset.csv')
X = data.select_dtypes(include=['float64', 'int64'])

# Scale the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Function to run UMAP with different parameter combinations
def run_umap_grid_search(X, n_neighbors_list=[15, 30, 50], 
                        min_dist_list=[0.1, 0.5, 1.0]):
    results = {}
    
    for n_neighbors in n_neighbors_list:
        for min_dist in min_dist_list:
            print(f"Running UMAP with n_neighbors={n_neighbors}, min_dist={min_dist}...")
            start_time = time.time()
            
            reducer = umap.UMAP(
                n_components=2,
                n_neighbors=n_neighbors,
                min_dist=min_dist,
                random_state=42
            )
            
            X_umap = reducer.fit_transform(X)
            elapsed_time = time.time() - start_time
            print(f"Completed in {elapsed_time:.2f} seconds")
            
            results[(n_neighbors, min_dist)] = X_umap
    
    return results

# Run UMAP with different parameter combinations
umap_results = run_umap_grid_search(
    X_scaled, 
    n_neighbors_list=[15, 30, 50], 
    min_dist_list=[0.1, 0.5]
)

# Visualize a subset of results
fig, axes = plt.subplots(3, 2, figsize=(15, 18))
axes = axes.flatten()

for i, ((n_neighbors, min_dist), X_umap) in enumerate(list(umap_results.items())[:6]):
    ax = axes[i]
    ax.scatter(X_umap[:, 0], X_umap[:, 1], alpha=0.5)
    ax.set_title(f'UMAP with n_neighbors={n_neighbors}, min_dist={min_dist}')
    ax.set_xlabel('UMAP Dimension 1')
    ax.set_ylabel('UMAP Dimension 2')
    ax.grid(True)
    
    # If we have categorical target, use it for coloring in a separate plot
    if 'target' in data.columns:
        target = data['target']
        fig_target, ax_target = plt.subplots(figsize=(10, 8))
        for category in target.unique():
            mask = (target == category)
            ax_target.scatter(
                X_umap[mask, 0], 
                X_umap[mask, 1],
                alpha=0.7,
                label=f'Class {category}'
            )
        ax_target.set_title(f'UMAP by Target Class (n_neigh={n_neighbors}, min_dist={min_dist})')
        ax_target.set_xlabel('UMAP Dimension 1')
        ax_target.set_ylabel('UMAP Dimension 2')
        ax_target.legend()
        ax_target.grid(True)
        plt.tight_layout()
        plt.show()

plt.tight_layout()
plt.show()

# Choose the best parameters based on clustering performance
# (optional, if we're using UMAP for clustering)
if len(data) >= 30:  # Only if we have enough data
    silhouette_scores = {}
    for params, X_umap in umap_results.items():
        # Try different numbers of clusters
        best_score = -1
        best_k = 2
        for k in range(2, min(11, len(data) // 5)):  # Try k=2 to k=10 or less
            kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
            labels = kmeans.fit_predict(X_umap)
            score = silhouette_score(X_umap, labels)
            if score > best_score:
                best_score = score
                best_k = k
        silhouette_scores[params] = (best_score, best_k)
    
    # Print results
    print("\nSilhouette Scores for different UMAP parameters:")
    for (n_neighbors, min_dist), (score, k) in silhouette_scores.items():
        print(f"n_neighbors={n_neighbors}, min_dist={min_dist}: Score={score:.4f} with {k} clusters")
    
    # Get best parameters
    best_params = max(silhouette_scores, key=lambda x: silhouette_scores[x][0])
    best_n_neighbors, best_min_dist = best_params
    print(f"\nBest parameters: n_neighbors={best_n_neighbors}, min_dist={best_min_dist}")
    print(f"Best score: {silhouette_scores[best_params][0]:.4f}")
    
    # Final UMAP with best parameters
    best_umap = umap_results[best_params]
    best_k = silhouette_scores[best_params][1]
    
    # Cluster and visualize
    kmeans = KMeans(n_clusters=best_k, random_state=42, n_init=10)
    cluster_labels = kmeans.fit_predict(best_umap)
    
    plt.figure(figsize=(10, 8))
    for cluster in range(best_k):
        mask = (cluster_labels == cluster)
        plt.scatter(
            best_umap[mask, 0],
            best_umap[mask, 1],
            alpha=0.7,
            label=f'Cluster {cluster}'
        )
    plt.title(f'UMAP Clustering with {best_k} clusters (n_neigh={best_n_neighbors}, min_dist={best_min_dist})')
    plt.xlabel('UMAP Dimension 1')
    plt.ylabel('UMAP Dimension 2')
    plt.legend()
    plt.grid(True)
    plt.show()
`
  },
  {
    heading: "Code Example: Autoencoder",
    code: `# Autoencoder for dimensionality reduction
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping

# Load data
data = pd.read_csv('your_dataset.csv')
X = data.select_dtypes(include=['float64', 'int64'])

# Scale the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split data
X_train, X_test = train_test_split(X_scaled, test_size=0.2, random_state=42)

# Set dimensions
input_dim = X_train.shape[1]
encoding_dim = 2  # For visualization, use 2 dimensions
hidden_dim1 = 64
hidden_dim2 = 32

# Encoder
input_layer = Input(shape=(input_dim,))
encoder = Dense(hidden_dim1, activation='relu')(input_layer)
encoder = Dropout(0.2)(encoder)
encoder = Dense(hidden_dim2, activation='relu')(encoder)
encoder = Dropout(0.2)(encoder)
encoder_output = Dense(encoding_dim, activation='linear')(encoder)

# Decoder
decoder = Dense(hidden_dim2, activation='relu')(encoder_output)
decoder = Dropout(0.2)(decoder)
decoder = Dense(hidden_dim1, activation='relu')(decoder)
decoder = Dropout(0.2)(decoder)
decoder_output = Dense(input_dim, activation='linear')(decoder)

# Autoencoder model
autoencoder = Model(inputs=input_layer, outputs=decoder_output)
encoder_model = Model(inputs=input_layer, outputs=encoder_output)

# Compile model
autoencoder.compile(optimizer=Adam(0.001), loss='mse')

# Print model summary
autoencoder.summary()

# Train with early stopping
early_stop = EarlyStopping(monitor='val_loss', patience=20, restore_best_weights=True)
history = autoencoder.fit(
    X_train, X_train,
    epochs=200,
    batch_size=32,
    shuffle=True,
    validation_data=(X_test, X_test),
    callbacks=[early_stop]
)

# Plot training history
plt.figure(figsize=(10, 6))
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Autoencoder Training History')
plt.xlabel('Epochs')
plt.ylabel('Loss (MSE)')
plt.legend()
plt.grid(True)
plt.show()

# Encode the data (dimensionality reduction)
X_encoded = encoder_model.predict(X_scaled)

# Calculate reconstruction error
X_decoded = autoencoder.predict(X_scaled)
reconstruction_error = np.mean(np.square(X_scaled - X_decoded))
print(f"Mean squared reconstruction error: {reconstruction_error:.6f}")

# Visualize the encoded 2D space
plt.figure(figsize=(10, 8))
plt.scatter(X_encoded[:, 0], X_encoded[:, 1], alpha=0.5)
plt.title('Data in Autoencoder Latent Space')
plt.xlabel('Latent Dimension 1')
plt.ylabel('Latent Dimension 2')
plt.grid(True)

# If we have categorical target, use it for coloring
if 'target' in data.columns:
    target = data['target']
    plt.figure(figsize=(10, 8))
    for category in target.unique():
        mask = (target == category)
        plt.scatter(
            X_encoded[mask, 0], 
            X_encoded[mask, 1],
            alpha=0.7,
            label=f'Class {category}'
        )
    plt.title('Autoencoder Latent Space by Target Class')
    plt.xlabel('Latent Dimension 1')
    plt.ylabel('Latent Dimension 2')
    plt.legend()
    plt.grid(True)

plt.show()

# Analyze encoded data
# Find the most representative examples for each dimension
for dim in range(encoding_dim):
    print(f"\nAnalyzing dimension {dim+1}:")
    # Find examples that have high and low values in this dimension
    top_indices = np.argsort(X_encoded[:, dim])[-5:]  # Top 5 high values
    bottom_indices = np.argsort(X_encoded[:, dim])[:5]  # Top 5 low values
    
    # Display original feature values for these examples
    print("High values in this dimension:")
    high_examples = X[top_indices]
    print(pd.DataFrame(high_examples, columns=X.columns).mean())
    
    print("\nLow values in this dimension:")
    low_examples = X[bottom_indices]
    print(pd.DataFrame(low_examples, columns=X.columns).mean())

# Try a more complex autoencoder if needed (variational autoencoder)
# This is a simplified example - for a full VAE implementation, 
# you would need to add the KL divergence loss term
`
  },
  {
    heading: "Selecting the Right Technique",
    content: `**When to Use Linear Methods (PCA, LDA, FA):**<br/>
• Linear relationships between features are expected<br/>
• Global structure preservation is important<br/>
• Need for computational efficiency<br/>
• Interpretability of components is desired<br/>
• Data doesn't lie on a complex manifold<br/><br/>

**When to Use Nonlinear Methods (t-SNE, UMAP, Autoencoders):**<br/>
• Data lies on a nonlinear manifold<br/>
• Local structure preservation is crucial<br/>
• Complex patterns or clusters need to be revealed<br/>
• Computational resources are available<br/>
• Visualization is the primary goal<br/><br/>

**Decision Framework:**<br/>
• **For exploratory visualization**: t-SNE or UMAP<br/>
• **For efficient data compression**: PCA or Autoencoders<br/>
• **For supervised dimension reduction**: LDA<br/>
• **For nonlinear data with global structure**: Isomap or UMAP<br/>
• **For complex feature extraction**: Autoencoders or kernel methods<br/><br/>

**Trade-offs to Consider:**<br/>
• Computational complexity vs. capturing nonlinear patterns<br/>
• Local vs. global structure preservation<br/>
• Interpretability vs. representational power<br/>
• Deterministic vs. stochastic results`,
  },
  {
    heading: "Parameter Tuning Tips",
    content: `**PCA:**<br/>
• **n_components**: Use explained variance ratio (e.g., 95% threshold)<br/>
• **svd_solver**: 'auto' or 'full' for smaller datasets, 'randomized' for larger ones<br/><br/>

**t-SNE:**<br/>
• **perplexity**: Try values between 5-50, typically 30 works well<br/>
• **n_iter**: 1000+ for convergence (2000-5000 for complex data)<br/>
• **early_exaggeration**: 12.0 default, higher values (20-100) for better cluster separation<br/>
• **learning_rate**: Default 200, try 10-1000 depending on dataset<br/>
• **init**: Use 'pca' for more stability and reproducibility<br/><br/>

**UMAP:**<br/>
• **n_neighbors**: Controls local vs global structure (2-100, smaller for local patterns)<br/>
• **min_dist**: Minimum distance between points (0.0-1.0, smaller for tighter clusters)<br/>
• **metric**: Choose based on data type (euclidean, cosine, etc.)<br/>
• **n_components**: Typically 2-3 for visualization, can be higher<br/><br/>

**Autoencoders:**<br/>
• **Encoding dimensions**: Start small and increase if needed<br/>
• **Layer sizes**: Typically decreasing/increasing symmetrically<br/>
• **Activation functions**: ReLU for hidden layers, linear for output<br/>
• **Learning rate**: Start with 0.001 and adjust<br/>
• **Regularization**: L1 for sparse representations, L2 for smoothing<br/><br/>

**General Tips:**<br/>
• Run algorithms multiple times with different random initializations<br/>
• Use ensemble methods for more stable results<br/>
• Validate with downstream task performance<br/>
• Combine linear and nonlinear methods (e.g., PCA then t-SNE)
• Use domain knowledge to guide parameter selection<br/><br/>`
  }
];

const DimensionalityReductionCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Machine Learning: Supervised Classification Cheat Sheet"
      description="A comprehensive guide to supervised learning classification algorithms, techniques, evaluation metrics, and implementations."
      sections={dimensionalityReductionSections}
    />
  );
};

export default DimensionalityReductionCheatSheet;