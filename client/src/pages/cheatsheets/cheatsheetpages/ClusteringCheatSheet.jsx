import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const clusteringSections = [
  {
    heading: "What is Clustering?",
    content: `Clustering is an unsupervised learning technique that groups similar data points together based on their intrinsic characteristics or similarities, without using labeled data. The goal is to discover natural groupings or patterns in data.<br/><br/>Clustering has numerous applications including customer segmentation, anomaly detection, document organization, image segmentation, recommendation systems, and exploratory data analysis.`,
  },
  {
    heading: "Clustering vs. Other ML Tasks",
    content: `**Clustering vs. Classification:**<br/>
• **Clustering**: Unsupervised (no labels), discovers natural groupings<br/>
• **Classification**: Supervised, assigns predefined labels<br/><br/>

**Clustering vs. Dimensionality Reduction:**<br/>
• **Clustering**: Groups similar instances, preserves original dimensions<br/>
• **Dimensionality Reduction**: Reduces feature space, preserves relationships<br/><br/>

**Hard vs. Soft Clustering:**<br/>
• **Hard Clustering**: Each point belongs to exactly one cluster<br/>
• **Soft/Fuzzy Clustering**: Points have probabilities/degrees of belonging to multiple clusters`,
  },
  {
    heading: "Popular Clustering Algorithms",
    content: `**K-Means:**<br/>
• Partitions data into k clusters based on centroid distance<br/>
• Efficient, simple, widely used<br/>
• Struggles with non-spherical clusters and outliers<br/><br/>

**Hierarchical Clustering:**<br/>
• Builds nested clusters (dendrogram)<br/>
• **Agglomerative**: Bottom-up approach<br/>
• **Divisive**: Top-down approach<br/>
• No need to specify clusters in advance<br/><br/>

**DBSCAN:**<br/>
• Density-Based Spatial Clustering of Applications with Noise<br/>
• Finds arbitrarily shaped clusters and handles noise<br/>
• Does not require specifying number of clusters<br/><br/>

**Mean Shift:**<br/>
• Non-parametric approach that finds dense regions<br/>
• Automatically determines number of clusters<br/>
• Computationally intensive<br/><br/>

**Gaussian Mixture Models (GMM):**<br/>
• Probabilistic model using Gaussian distributions<br/>
• Soft clustering with probability assignments<br/>
• Flexible cluster shapes (covariance matrices)<br/><br/>

**OPTICS:**<br/>
• Ordering Points To Identify Clustering Structure<br/>
• Extension of DBSCAN for variable density clusters<br/>
• Creates reachability plot for hierarchy analysis<br/><br/>

**Affinity Propagation:**<br/>
• Finds exemplars (representative points) via message passing<br/>
• Does not require number of clusters beforehand<br/>
• Computationally intensive for large datasets`,
  },
  {
    heading: "Evaluation Metrics",
    content: `**Internal Evaluation (No Ground Truth):**<br/>
• **Silhouette Coefficient**: Measures cohesion and separation (-1 to 1, higher is better)<br/>
• **Davies-Bouldin Index**: Ratio of within-cluster to between-cluster distances (lower is better)<br/>
• **Calinski-Harabasz Index**: Ratio of between to within-cluster dispersion (higher is better)<br/>
• **Inertia**: Sum of squared distances to centroids (lower is better, used in K-means)<br/><br/>

**External Evaluation (With Ground Truth):**<br/>
• **Adjusted Rand Index (ARI)**: Measures similarity between two clusterings (-1 to 1)<br/>
• **Normalized Mutual Information (NMI)**: Information shared between true and predicted labels (0 to 1)<br/>
• **Homogeneity, Completeness, V-measure**: Different aspects of clustering quality<br/>
• **Fowlkes-Mallows Index**: Geometric mean of precision and recall<br/><br/>

**Visualization Techniques:**<br/>
• Dimensionality reduction (PCA, t-SNE, UMAP) + scatter plot<br/>
• Dendrograms for hierarchical clustering<br/>
• Silhouette plots<br/>
• Heatmaps of distance matrices`,
  },
  {
    heading: "Feature Engineering for Clustering",
    content: `**Preprocessing Steps:**<br/>
• **Scaling**: StandardScaler, MinMaxScaler, RobustScaler<br/>
• **Outlier Detection**: May remove or treat separately<br/>
• **Missing Value Imputation**: KNN imputer, iterative imputer<br/><br/>

**Dimensionality Reduction:**<br/>
• **PCA**: Linear dimensionality reduction<br/>
• **t-SNE**: Nonlinear technique, preserves local structure<br/>
• **UMAP**: Balances local and global structure<br/>
• Often applied before clustering for better results<br/><br/>

**Distance Metrics:**<br/>
• **Euclidean**: Standard distance, sensitive to scale<br/>
• **Manhattan**: Sum of absolute differences, robust to outliers<br/>
• **Cosine**: Angle between vectors, good for text/sparse data<br/>
• **Mahalanobis**: Accounts for correlations between features<br/>
• **Jaccard**: For binary/categorical data<br/><br/>

**Feature Selection:**<br/>
• Remove irrelevant features<br/>
• Use domain knowledge to select meaningful features<br/>
• Feature importance from supervised models as guidance`,
  },
  {
    heading: "Code Example: K-Means Clustering",
    code: `# K-Means clustering with scikit-learn
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA

# Load data
data = pd.read_csv('your_dataset.csv')
X = data.select_dtypes(include=['float64', 'int64'])

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Find optimal number of clusters using the elbow method
inertia = []
silhouette_scores = []
k_range = range(2, 11)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_scaled)
    inertia.append(kmeans.inertia_)
    
    # Calculate silhouette score
    if k > 1:  # Silhouette score requires at least 2 clusters
        labels = kmeans.labels_
        silhouette_scores.append(silhouette_score(X_scaled, labels))

# Plot elbow curve
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(k_range, inertia, 'o-')
plt.xlabel('Number of clusters (k)')
plt.ylabel('Inertia')
plt.title('Elbow Method')
plt.grid(True)

# Plot silhouette scores
plt.subplot(1, 2, 2)
plt.plot(k_range[1:], silhouette_scores, 'o-')
plt.xlabel('Number of clusters (k)')
plt.ylabel('Silhouette Score')
plt.title('Silhouette Method')
plt.grid(True)
plt.tight_layout()
plt.show()

# Choose optimal k (let's say k=3 for this example)
optimal_k = 3
kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
cluster_labels = kmeans.fit_predict(X_scaled)

# Add cluster labels to original data
data['Cluster'] = cluster_labels

# Visualize results with PCA (if more than 2 dimensions)
if X.shape[1] > 2:
    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(X_scaled)
    
    plt.figure(figsize=(10, 8))
    for cluster in range(optimal_k):
        plt.scatter(
            X_pca[cluster_labels == cluster, 0],
            X_pca[cluster_labels == cluster, 1],
            label=f'Cluster {cluster}'
        )
    plt.scatter(
        pca.transform(kmeans.cluster_centers_)[:, 0],
        pca.transform(kmeans.cluster_centers_)[:, 1],
        s=300, c='black', marker='X', label='Centroids'
    )
    plt.title('Clusters after PCA')
    plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.2%} variance)')
    plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.2%} variance)')
    plt.legend()
    plt.grid(True)
    plt.show()

# Analyze cluster characteristics
cluster_summary = data.groupby('Cluster').mean()
print(cluster_summary)
`
  },
  {
    heading: "Code Example: Hierarchical Clustering",
    code: `# Hierarchical clustering with scipy and scikit-learn
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from scipy.cluster.hierarchy import dendrogram, linkage
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score

# Load data
data = pd.read_csv('your_dataset.csv')
X = data.select_dtypes(include=['float64', 'int64'])

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Plot dendrogram to find optimal number of clusters
plt.figure(figsize=(12, 8))
linkage_matrix = linkage(X_scaled, method='ward')
dendrogram(linkage_matrix)
plt.title('Hierarchical Clustering Dendrogram')
plt.xlabel('Sample index')
plt.ylabel('Distance')
plt.axhline(y=6, color='r', linestyle='--')  # Example threshold for cutting the tree
plt.show()

# Choose optimal number of clusters based on dendrogram (e.g., 4)
n_clusters = 4
clustering = AgglomerativeClustering(
    n_clusters=n_clusters,
    affinity='euclidean',
    linkage='ward'
)
cluster_labels = clustering.fit_predict(X_scaled)

# Add cluster labels to original data
data['Cluster'] = cluster_labels

# Calculate silhouette score
silhouette_avg = silhouette_score(X_scaled, cluster_labels)
print(f"Silhouette Score: {silhouette_avg:.3f}")

# Visualize the clusters with PCA (if more than 2 dimensions)
if X.shape[1] > 2:
    from sklearn.decomposition import PCA
    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(X_scaled)
    
    plt.figure(figsize=(10, 8))
    for cluster in range(n_clusters):
        plt.scatter(
            X_pca[cluster_labels == cluster, 0],
            X_pca[cluster_labels == cluster, 1],
            label=f'Cluster {cluster}'
        )
    plt.title('Hierarchical Clustering Result after PCA')
    plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.2%} variance)')
    plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.2%} variance)')
    plt.legend()
    plt.grid(True)
    plt.show()

# Analyze cluster characteristics
cluster_summary = data.groupby('Cluster').mean()
print(cluster_summary)

# For each cluster, find the most representative samples (closest to cluster centroid)
from sklearn.metrics import pairwise_distances

# Calculate cluster centroids
centroids = np.zeros((n_clusters, X_scaled.shape[1]))
for i in range(n_clusters):
    centroids[i] = X_scaled[cluster_labels == i].mean(axis=0)

# For each cluster, find the sample closest to its centroid
representative_samples = []
for i in range(n_clusters):
    cluster_samples = X_scaled[cluster_labels == i]
    distances = pairwise_distances(cluster_samples, [centroids[i]])
    representative_idx = np.argmin(distances)
    original_idx = np.where(cluster_labels == i)[0][representative_idx]
    representative_samples.append(original_idx)

print("Representative sample indices for each cluster:", representative_samples)
`
  },
  {
    heading: "Code Example: DBSCAN",
    code: `# DBSCAN clustering
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics import silhouette_score

# Load data
data = pd.read_csv('your_dataset.csv')
X = data.select_dtypes(include=['float64', 'int64'])

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Find optimal epsilon (eps) parameter using k-distance graph
k = 5  # number of neighbors to consider
neigh = NearestNeighbors(n_neighbors=k)
neigh.fit(X_scaled)
distances, indices = neigh.kneighbors(X_scaled)

# Sort distances to find the "elbow"
distances = np.sort(distances[:, k-1])

# Plot k-distance graph
plt.figure(figsize=(10, 6))
plt.plot(distances)
plt.xlabel('Points sorted by distance')
plt.ylabel(f'Distance to {k}th nearest neighbor')
plt.title('K-distance Graph for DBSCAN eps Parameter Selection')
plt.grid(True)
plt.show()

# Choose eps based on the "elbow" in the plot (example value)
eps = 0.5  # This should be identified from the k-distance plot
min_samples = 5  # Minimum points to form a dense region

# Apply DBSCAN
dbscan = DBSCAN(eps=eps, min_samples=min_samples)
cluster_labels = dbscan.fit_predict(X_scaled)

# Add cluster labels to original data
data['Cluster'] = cluster_labels

# Count number of clusters and noise points
n_clusters = len(set(cluster_labels)) - (1 if -1 in cluster_labels else 0)
n_noise = list(cluster_labels).count(-1)
print(f'Number of clusters: {n_clusters}')
print(f'Number of noise points: {n_noise} ({n_noise/len(X_scaled):.2%})')

# Calculate silhouette score if more than one cluster and no all points are noise
if n_clusters > 1 and n_noise < len(X_scaled):
    # Get indices of non-noise points
    mask = cluster_labels != -1
    silhouette_avg = silhouette_score(X_scaled[mask], cluster_labels[mask])
    print(f"Silhouette Score (excluding noise): {silhouette_avg:.3f}")

# Visualize results with PCA (if more than 2 dimensions)
if X.shape[1] > 2:
    from sklearn.decomposition import PCA
    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(X_scaled)
    
    plt.figure(figsize=(10, 8))
    
    # Plot noise points in gray
    noise_mask = (cluster_labels == -1)
    plt.scatter(
        X_pca[noise_mask, 0],
        X_pca[noise_mask, 1],
        color='gray',
        alpha=0.5,
        label='Noise'
    )
    
    # Plot clusters
    for cluster in set(cluster_labels):
        if cluster != -1:  # Skip noise
            mask = (cluster_labels == cluster)
            plt.scatter(
                X_pca[mask, 0],
                X_pca[mask, 1],
                label=f'Cluster {cluster}'
            )
    
    plt.title('DBSCAN Clustering Result after PCA')
    plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.2%} variance)')
    plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.2%} variance)')
    plt.legend()
    plt.grid(True)
    plt.show()

# Analyze cluster characteristics (excluding noise)
valid_clusters = data[data['Cluster'] != -1]
if not valid_clusters.empty:
    cluster_summary = valid_clusters.groupby('Cluster').mean()
    cluster_sizes = valid_clusters.groupby('Cluster').size()
    print("Cluster sizes:")
    print(cluster_sizes)
    print("\nCluster means:")
    print(cluster_summary)
`
  },
  {
    heading: "Determining Optimal Number of Clusters",
    content: `**Visual Methods:**<br/>
• **Elbow Method**: Plot inertia/distortion vs. number of clusters<br/>
• **Dendrogram**: Tree diagram for hierarchical clustering<br/>
• **Silhouette Visualizations**: Plot silhouette coefficients<br/><br/>

**Statistical Methods:**<br/>
• **Silhouette Score**: Measure of cluster cohesion and separation<br/>
• **Gap Statistic**: Compares within-cluster dispersion to reference distribution<br/>
• **BIC/AIC**: Information criteria for probabilistic models (e.g., GMM)<br/>
• **Davies-Bouldin Index**: Ratio of within-cluster to between-cluster distances<br/><br/>

**Domain Knowledge:**<br/>
• Business requirements or constraints<br/>
• Prior understanding of natural groupings<br/>
• Interpretability and actionability of clusters<br/><br/>

**Stability-based Methods:**<br/>
• Consensus clustering<br/>
• Bootstrap resampling<br/>
• Cluster stability analysis`,
  },
  {
    heading: "Handling High-Dimensional Data",
    content: `**Curse of Dimensionality Challenges:**<br/>
• Distance measures become less meaningful<br/>
• Sparsity increases exponentially<br/>
• Computational complexity grows<br/><br/>

**Dimensionality Reduction Techniques:**<br/>
• **PCA**: Linear projection preserving variance<br/>
• **t-SNE**: Nonlinear technique for visualization<br/>
• **UMAP**: Manifold learning with better global structure<br/>
• **Autoencoder**: Neural network-based dimensionality reduction<br/><br/>

**Subspace Clustering:**<br/>
• **CLIQUE**: Grid-based subspace clustering<br/>
• **SUBCLU**: Density-based subspace clustering<br/>
• **PROCLUS**: Projected clustering<br/><br/>

**Feature Selection:**<br/>
• Filter methods based on variance or correlation<br/>
• Wrapper methods<br/>
• Embedded methods`,
  },
  {
    heading: "Common Applications and Use Cases",
    content: `**Customer Segmentation:**<br/>
• Group customers by purchasing behavior<br/>
• Identify high-value customer segments<br/>
• Personalize marketing strategies<br/><br/>

**Anomaly/Outlier Detection:**<br/>
• Identify unusual patterns in data<br/>
• Fraud detection in financial transactions<br/>
• Network intrusion detection<br/><br/>

**Image Segmentation:**<br/>
• Medical image analysis<br/>
• Object detection in computer vision<br/>
• Satellite image processing<br/><br/>

**Document Clustering:**<br/>
• Organize text documents by topic<br/>
• Improve search result grouping<br/>
• Content recommendation systems<br/><br/>

**Genetics and Bioinformatics:**<br/>
• Gene expression analysis<br/>
• Protein sequence clustering<br/>
• Disease subtype identification<br/><br/>

**Time Series Analysis:**<br/>
• Identify similar temporal patterns<br/>
• Detect regime changes<br/>
• Group similar time series for forecasting`,
  },
  {
    heading: "Advanced Clustering Techniques",
    content: `**Spectral Clustering:**<br/>
• Uses eigenvalues of similarity matrix<br/>
• Effective for complex, non-convex clusters<br/>
• Computationally intensive for large datasets<br/><br/>

**Self-Organizing Maps (SOM):**<br/>
• Neural network-based clustering<br/>
• Preserves topological properties<br/>
• Useful for visualizing high-dimensional data<br/><br/>

**Biclustering:**<br/>
• Simultaneously clusters rows and columns<br/>
• Used in gene expression analysis<br/>
• Identifies submatrices with similar patterns<br/><br/>

**Ensemble Clustering:**<br/>
• Combines multiple clustering results<br/>
• Improves stability and robustness<br/>
• Methods: consensus functions, graph-based approaches<br/><br/>

**Deep Clustering:**<br/>
• Uses deep neural networks<br/>
• Joint feature learning and clustering<br/>
• Examples: DEC (Deep Embedded Clustering), DCN (Deep Clustering Network)<br/><br/>

**Online Clustering:**<br/>
• Processes data in streams<br/>
• Updates clusters incrementally<br/>
• Examples: Online K-means, BIRCH, CluStream`,
  },
  {
    heading: "Real-world Challenges and Best Practices",
    content: `**Challenges:**<br/>
• Determining the right number of clusters<br/>
• Interpreting and validating cluster results<br/>
• Scaling to large datasets<br/>
• Handling mixed data types<br/>
• Dealing with noise and outliers<br/><br/>

**Best Practices:**<br/>
• **Data Preparation**: Proper scaling, outlier handling<br/>
• **Algorithm Selection**: Based on data characteristics and goals<br/>
• **Validation**: Use multiple evaluation metrics<br/>
• **Visualization**: Always visualize results for interpretation<br/>
• **Post-processing**: Profile clusters to derive actionable insights<br/>
• **Ensemble Approaches**: Combine multiple clustering results<br/><br/>

**Interpretation and Communication:**<br/>
• Give clusters meaningful names based on characteristics<br/>
• Create simple visualizations for stakeholders<br/>
• Quantify business impact of cluster insights<br/>
• Connect clustering results to actionable decisions`,
  },
  {
    heading: "Popular Clustering Packages and Tools",
    content: `**Python Libraries:**<br/>
• **scikit-learn**: KMeans, DBSCAN, Hierarchical Clustering<br/>
• **SciPy**: Hierarchical clustering and dendrograms<br/>
• **HDBSCAN**: Enhanced density-based clustering<br/>
• **pyclustering**: Wide variety of algorithms<br/>
• **PyCaret**: Simplified workflow for clustering<br/><br/>

**R Packages:**<br/>
• **cluster**: PAM, CLARA, DIANA algorithms<br/>
• **factoextra**: Visualization of clustering results<br/>
• **dbscan**: DBSCAN and OPTICS implementation<br/>
• **mclust**: Gaussian Mixture Models<br/><br/>

**Specialized Tools:**<br/>
• **ELKI**: Java framework with many clustering algorithms<br/>
• **Weka**: GUI tool for clustering<br/>
• **Orange**: Visual programming for data analysis<br/>
• **TensorFlow/PyTorch**: For deep clustering approaches`,
  }
];

const ClusteringCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Machine Learning: Unsupervised Clustering Cheat Sheet"
      description="A comprehensive guide to clustering algorithms, techniques, evaluation metrics, and implementations in unsupervised learning."
      sections={clusteringSections}
    />
  );
};

export default ClusteringCheatSheet;