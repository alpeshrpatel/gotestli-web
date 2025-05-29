import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';




const cvSections = [
  {
    heading: "What is Image Classification?",
    content: `Image classification is a fundamental computer vision task that involves assigning a label or category to an entire input image. It answers the question "What is in this image?" by outputting the most probable class or classes from a predefined set of categories.<br/><br/>Image classification forms the foundation for many advanced computer vision tasks and has applications in medical imaging, autonomous vehicles, facial recognition, product identification, and content moderation.`,
  },
  {
    heading: "Traditional Methods vs Deep Learning",
    content: `**Traditional Machine Learning Approaches:**<br/>
• **Feature Extraction**: SIFT (Scale-Invariant Feature Transform), HOG (Histogram of Oriented Gradients), SURF (Speeded-Up Robust Features)<br/>
• **Classical Algorithms**: Support Vector Machines (SVM), Random Forests, k-Nearest Neighbors (k-NN)<br/>
• **Limitations**: Require hand-crafted features, struggle with complex images, less scalable<br/><br/>

**Deep Learning Approaches:**<br/>
• **End-to-End Learning**: Automatically learn hierarchical features from raw pixels<br/>
• **Convolutional Neural Networks (CNNs)**: Specialized neural networks designed for image processing<br/>
• **Advantages**: Superior accuracy, ability to generalize, transfer learning capabilities<br/>
• **Challenges**: Require large datasets, computationally intensive, less interpretable`,
  },
  {
    heading: "Popular CNN Architectures",
    content: `• **LeNet-5 (1998)**: Pioneer CNN architecture, 7 layers including 2 convolutional layers<br/>
• **AlexNet (2012)**: ILSVRC winner, 8 layers, ReLU activation, first to use GPU training<br/>
• **VGG-16/19 (2014)**: Very deep networks using small 3×3 filters, 16/19 layers<br/>
• **GoogLeNet/Inception (2014)**: Used inception modules, reduced parameters with 1×1 convolutions<br/>
• **ResNet (2015)**: Introduced skip connections to solve vanishing gradient problem in deep networks<br/>
• **DenseNet (2017)**: Each layer connects to every other layer in feed-forward fashion<br/>
• **MobileNet (2017)**: Lightweight architecture for mobile and embedded devices using depthwise separable convolutions<br/>
• **EfficientNet (2019)**: Balanced network depth, width, and resolution using compound scaling<br/>
• **Vision Transformer (ViT) (2020)**: Adapts transformer architecture from NLP to image classification`,
  },
  {
    heading: "Image Preprocessing Techniques",
    content: `**Basic Preprocessing:**<br/>
• **Resizing**: Standardize input dimensions (e.g., 224×224, 299×299, 256×256)<br/>
• **Normalization**: Scale pixel values (typically to range [0,1] or [-1,1])<br/>
• **Channel Standardization**: Mean subtraction, division by standard deviation<br/><br/>

**Data Augmentation:**<br/>
• **Geometric Transformations**: Rotation, flipping, scaling, cropping, translation<br/>
• **Color Adjustments**: Brightness, contrast, saturation, hue shifts<br/>
• **Noise Addition**: Gaussian, salt-and-pepper noise<br/>
• **Advanced Techniques**: Random erasing, mixup, CutMix, AugMix<br/><br/>

**Common Standardizations:**<br/>
• **ImageNet Mean/Std**: RGB means=[0.485, 0.456, 0.406], stds=[0.229, 0.224, 0.225]<br/>
• **Inception Preprocessing**: Rescale to [-1,1]<br/>
• **COCO**: RGB means=[0.471, 0.448, 0.408]`,
  },
  {
    heading: "Code Example: Image Classification with PyTorch",
    code: `import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
from torchvision.models import resnet50, ResNet50_Weights

# Define transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Load dataset (example with CIFAR-10)
trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=32, shuffle=True, num_workers=2)

# Load pre-trained model
model = resnet50(weights=ResNet50_Weights.DEFAULT)
num_classes = 10
model.fc = nn.Linear(model.fc.in_features, num_classes)  # Replace final layer

# Define loss function and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)

# Training loop
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model.to(device)

for epoch in range(5):  # 5 epochs for example
    running_loss = 0.0
    for i, data in enumerate(trainloader, 0):
        inputs, labels = data[0].to(device), data[1].to(device)
        
        # Zero the parameter gradients
        optimizer.zero_grad()
        
        # Forward + backward + optimize
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        
    print(f'Epoch {epoch + 1}, Loss: {running_loss / len(trainloader):.3f}')`
  },
  {
    heading: "Code Example: Transfer Learning with TensorFlow/Keras",
    code: `import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Image data generators with augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

validation_datagen = ImageDataGenerator(rescale=1./255)

# Load data from directories
train_generator = train_datagen.flow_from_directory(
    'train_dir',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

validation_generator = validation_datagen.flow_from_directory(
    'validation_dir',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

# Create base model
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Freeze base model
for layer in base_model.layers:
    layer.trainable = False

# Add custom layers
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
predictions = Dense(train_generator.num_classes, activation='softmax')(x)

# Create final model
model = Model(inputs=base_model.input, outputs=predictions)

# Compile model
model.compile(
    optimizer=Adam(learning_rate=0.0001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train model
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // train_generator.batch_size,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // validation_generator.batch_size,
    epochs=10
)`
  },
  {
    heading: "Evaluation Metrics",
    content: `• **Accuracy**: Proportion of correctly classified images (most common but can be misleading for imbalanced datasets)<br/>
• **Precision**: TP / (TP + FP) - Measures exactness, higher precision means less false positives<br/>
• **Recall**: TP / (TP + FN) - Measures completeness, higher recall means less false negatives<br/>
• **F1 Score**: 2 * (Precision * Recall) / (Precision + Recall) - Harmonic mean of precision and recall<br/>
• **Confusion Matrix**: Table showing predicted vs actual classes<br/>
• **Top-1 Accuracy**: Proportion where the highest probability prediction matches the ground truth<br/>
• **Top-5 Accuracy**: Proportion where the ground truth is among the top 5 highest probability predictions<br/>
• **AUC-ROC**: Area Under the Receiver Operating Characteristic curve (for binary classification)<br/>
• **Mean Average Precision (mAP)**: Mean of average precision scores for each class (common in object detection)<br/>
• **Cohen's Kappa**: Measures agreement between predicted and actual classifications, accounting for chance`,
  },
  {
    heading: "Common Challenges & Solutions",
    content: `**Challenges:**<br/>
• **Limited Training Data**: Small datasets lead to overfitting<br/>
• **Class Imbalance**: Uneven distribution of examples across classes<br/>
• **Overfitting**: Model performs well on training data but poorly on unseen data<br/>
• **Translation/Scale/Viewpoint Variance**: Objects appear differently based on perspective<br/>
• **Lighting/Background Variations**: Changes in illumination or context<br/><br/>

**Solutions:**<br/>
• **Transfer Learning**: Use pre-trained models on large datasets (like ImageNet)<br/>
• **Data Augmentation**: Artificially increase dataset size through transformations<br/>
• **Regularization**: Dropout, L1/L2 regularization, early stopping<br/>
• **Class Weighting**: Assign higher importance to underrepresented classes<br/>
• **Ensemble Methods**: Combine predictions from multiple models<br/>
• **Few-Shot Learning**: Learning from very few examples per class<br/>
• **Self-Supervised Learning**: Leverage unlabeled data through pretext tasks`,
  },
  {
    heading: "Fine-Tuning Best Practices",
    content: `• **Feature Extraction**: Keep pre-trained weights frozen, only train new classification layers<br/>
• **Progressive Unfreezing**: Gradually unfreeze layers from top (task-specific) to bottom (general features)<br/>
• **Differential Learning Rates**: Use lower learning rates for early layers, higher for later layers<br/>
• **Decay Schedule**: Implement learning rate decay over time<br/>
• **Layer-wise Pre-training**: Pre-train one layer at a time<br/>
• **Batch Normalization**: Consider freezing batch normalization statistics when fine-tuning<br/>
• **Low Learning Rate**: Start with a learning rate 10-100x smaller than from-scratch training<br/>
• **Validation-based Model Selection**: Choose best checkpoint based on validation performance`,
  },
  {
    heading: "Popular Datasets",
    content: `• **ImageNet**: ~14M images across 21K categories (1.2M images, 1K classes in ILSVRC subset)<br/>
• **CIFAR-10/100**: 60K small images (32×32) in 10 or 100 classes<br/>
• **MNIST**: 70K handwritten digits (28×28)<br/>
• **Fashion-MNIST**: 70K fashion items (28×28), drop-in replacement for MNIST<br/>
• **Caltech-101/256**: ~9K/30K images across 101/256 categories<br/>
• **PASCAL VOC**: ~10K images with 20 object categories<br/>
• **MS COCO**: ~330K images with 80 object categories (also used for segmentation/detection)<br/>
• **CUB-200**: 6K images of 200 bird species (fine-grained classification)<br/>
• **STL-10**: 13K images (96×96) across 10 classes with additional unlabeled data<br/>
• **Places365**: Scene recognition dataset with 1.8M images across 365 scene categories`,
  },
  {
    heading: "Recent Advances",
    content: `• **Self-Supervised Learning**: Contrastive learning approaches like SimCLR, MoCo, BYOL<br/>
• **Vision Transformers (ViT)**: Transformer architectures adapted from NLP<br/>
• **MLP-Mixer**: All-MLP architecture for image classification<br/>
• **Data-Efficient Methods**: Few-shot learning, meta-learning<br/>
• **Knowledge Distillation**: Compressing large models into smaller ones<br/>
• **Neural Architecture Search (NAS)**: Automatically discovering optimal architectures<br/>
• **Explainable AI**: Methods to interpret and understand CNN decisions (Grad-CAM, Integrated Gradients)<br/>
• **Foundation Models**: Very large models pre-trained on diverse data (CLIP, DALL-E)<br/>
• **Semi-Supervised Learning**: Leveraging both labeled and unlabeled data<br/>
• **Robust Learning**: Adversarial training to improve model robustness`
  }
];

const CvImageClassCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Computer Vision: Image Classification Cheat Sheet"
      description="A comprehensive guide to image classification concepts, techniques, and best practices in computer vision."
      sections={cvSections}
      cheatsheetId={11}
    />
  );
};

export default CvImageClassCheatSheet;