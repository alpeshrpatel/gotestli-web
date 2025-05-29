import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const objectDetectionSections = [
  {
    heading: "What is Object Detection?",
    content: `Object detection is a computer vision task that involves both localizing and classifying objects within an image. Unlike image classification which assigns a label to the entire image, object detection identifies multiple objects, their classes, and their locations (typically as bounding boxes).<br/><br/>Object detection is fundamental to many advanced computer vision applications including autonomous driving, surveillance systems, medical imaging, retail analytics, and augmented reality.`,
  },
  {
    heading: "Object Detection vs. Related Tasks",
    content: `**Object Detection vs. Image Classification:**<br/>
• **Image Classification**: Assigns a single label to the entire image<br/>
• **Object Detection**: Locates and classifies multiple objects in an image using bounding boxes<br/><br/>

**Object Detection vs. Semantic Segmentation:**<br/>
• **Object Detection**: Provides rectangular bounding boxes around objects<br/>
• **Semantic Segmentation**: Classifies each pixel in the image, but doesn't separate object instances<br/><br/>

**Object Detection vs. Instance Segmentation:**<br/>
• **Object Detection**: Identifies objects with bounding boxes<br/>
• **Instance Segmentation**: Provides pixel-precise masks for each object instance`,
  },
  {
    heading: "Evolution of Object Detection",
    content: `**Traditional Methods (Pre-Deep Learning):**<br/>
• **Viola-Jones (2001)**: Haar features + AdaBoost, used for face detection<br/>
• **HOG + SVM (2005)**: Histogram of Oriented Gradients with SVM classifier<br/>
• **DPM (2008)**: Deformable Parts Model, modeling objects as collections of parts<br/><br/>

**First Generation Deep Learning (2014-2016):**<br/>
• **R-CNN (2014)**: Region proposals + CNN classification<br/>
• **SPP-Net (2014)**: Spatial pyramid pooling for handling different image sizes<br/>
• **Fast R-CNN (2015)**: Single feature extraction + ROI pooling<br/>
• **Faster R-CNN (2015)**: Introduced Region Proposal Network (RPN)<br/>
• **YOLO v1 (2016)**: First major one-stage detector, real-time performance<br/>
• **SSD (2016)**: Single Shot MultiBox Detector using multi-scale feature maps<br/><br/>

**Modern Architectures (2017-Present):**<br/>
• **RetinaNet (2017)**: Introduced Focal Loss to handle class imbalance<br/>
• **Mask R-CNN (2017)**: Extended Faster R-CNN for instance segmentation<br/>
• **YOLO v3/v4/v5/v8 (2018-2023)**: Significant improvements in speed and accuracy<br/>
• **EfficientDet (2020)**: Efficient architecture with compound scaling<br/>
• **DETR (2020)**: Detection Transformer, first end-to-end transformer-based detector<br/>
• **Swin Transformer (2021)**: Hierarchical vision transformer for detection<br/>
• **YOLOv8 (2023)**: Ultralytics implementation with strong performance`,
  },
  {
    heading: "Two-Stage vs. One-Stage Detectors",
    content: `**Two-Stage Detectors:**<br/>
• **Process**: First generate region proposals, then classify each proposal<br/>
• **Examples**: R-CNN, Fast R-CNN, Faster R-CNN, Mask R-CNN<br/>
• **Pros**: Generally higher accuracy, better for complex scenes<br/>
• **Cons**: Slower inference, more complex architecture<br/><br/>

**One-Stage Detectors:**<br/>
• **Process**: Predict classes and bounding boxes in a single network pass<br/>
• **Examples**: YOLO, SSD, RetinaNet, EfficientDet<br/>
• **Pros**: Faster inference (often real-time), simpler architecture<br/>
• **Cons**: Traditionally lower accuracy (gap has narrowed in recent years)<br/><br/>

**Current Trends:**<br/>
• One-stage detectors dominate practical applications due to speed/accuracy trade-off<br/>
• Transformer-based architectures like DETR blur the lines between one/two-stage approaches`,
  },
  {
    heading: "Key Components of Object Detection",
    content: `**Backbone Network:**<br/>
• Extracts features from input images (e.g., ResNet, EfficientNet, Vision Transformer)<br/>
• Pretrained on large datasets like ImageNet<br/><br/>

**Feature Pyramid Network (FPN):**<br/>
• Creates multi-scale feature representations<br/>
• Helps detect objects at different sizes<br/><br/>

**Anchor Boxes:**<br/>
• Predefined boxes of different aspect ratios and scales<br/>
• Serve as reference for predictions<br/><br/>

**Region Proposal Network (RPN):**<br/>
• In two-stage detectors, generates potential object locations<br/><br/>

**Detection Head:**<br/>
• Final layers that predict class probabilities and bounding box refinements<br/><br/>

**Non-Maximum Suppression (NMS):**<br/>
• Post-processing technique to remove duplicate detections`,
  },
  {
    heading: "Bounding Box Representations",
    content: `**Center-Width-Height Format:**<br/>
• (cx, cy, w, h): Center coordinates, width, and height<br/>
• Often used in YOLO<br/><br/>

**Corner Format:**<br/>
• (x1, y1, x2, y2): Top-left and bottom-right coordinates<br/>
• Common in R-CNN family<br/><br/>

**Normalized Coordinates:**<br/>
• Coordinates divided by image dimensions (range [0,1])<br/>
• Less sensitive to image resolution<br/><br/>

**Anchor Box Offsets:**<br/>
• (tx, ty, tw, th): Offsets relative to anchor boxes<br/>
• Used during training in many frameworks`,
  },
  {
    heading: "Evaluation Metrics",
    content: `**Intersection over Union (IoU):**<br/>
• Measures overlap between predicted and ground truth boxes<br/>
• IoU = Area of Intersection / Area of Union<br/>
• Threshold (e.g., IoU > 0.5) determines true/false positives<br/><br/>

**Precision and Recall:**<br/>
• **Precision**: TP / (TP + FP) - Accuracy of positive predictions<br/>
• **Recall**: TP / (TP + FN) - Proportion of actual positives identified<br/><br/>

**Average Precision (AP):**<br/>
• Area under the precision-recall curve for a specific class<br/><br/>

**Mean Average Precision (mAP):**<br/>
• Mean of APs across all classes<br/>
• Often calculated at different IoU thresholds<br/><br/>

**COCO Metrics:**<br/>
• **mAP@[.5:.95]**: Average mAP over IoU thresholds from 0.5 to 0.95<br/>
• **AP50**: mAP at IoU threshold of 0.5 (PASCAL VOC metric)<br/>
• **AP75**: mAP at IoU threshold of 0.75<br/>
• **APs/APm/APl**: AP for small/medium/large objects`,
  },
  {
    heading: "Code Example: Object Detection with YOLOv8",
    code: `# Install ultralytics package
# pip install ultralytics

from ultralytics import YOLO
import cv2
import numpy as np

# Load a pretrained YOLOv8 model
model = YOLO('yolov8n.pt')  # 'n' for nano size (also s, m, l, x available)

# Run inference on an image
image_path = 'test_image.jpg'
results = model(image_path)

# Process results
img = cv2.imread(image_path)
for result in results:
    boxes = result.boxes.cpu().numpy()
    
    for box in boxes:
        # Get coordinates
        x1, y1, x2, y2 = box.xyxy[0].astype(int)
        
        # Get class and confidence
        class_id = int(box.cls[0])
        conf = float(box.conf[0])
        class_name = result.names[class_id]
        
        # Draw bounding box
        color = (0, 255, 0)  # Green color
        cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
        
        # Add label
        label = f"{class_name}: {conf:.2f}"
        cv2.putText(img, label, (x1, y1 - 10), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

# Display or save the result
cv2.imwrite('result.jpg', img)
cv2.imshow('Object Detection Result', img)
cv2.waitKey(0)
cv2.destroyAllWindows()`
  },
  {
    heading: "Code Example: Object Detection with TensorFlow",
    code: `# Requires TensorFlow 2.x and TensorFlow Hub
import tensorflow as tf
import tensorflow_hub as hub
import cv2
import numpy as np

# Load a pre-trained model from TensorFlow Hub
detector = hub.load("https://tfhub.dev/tensorflow/faster_rcnn/resnet50_v1_640x640/1")

def detect_objects(image_path):
    # Read and prepare image
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    input_img = tf.convert_to_tensor(img_rgb)[tf.newaxis, ...]
    
    # Run inference
    results = detector(input_img)
    
    # Process results
    result = {key: value.numpy() for key, value in results.items()}
    boxes = result["detection_boxes"][0]
    scores = result["detection_scores"][0]
    classes = result["detection_classes"][0].astype(np.int32)
    
    # Get image dimensions
    height, width, _ = img.shape
    
    # COCO class names
    class_names = {
        1: 'person', 2: 'bicycle', 3: 'car', # and so on...
        # Add more classes as needed
    }
    
    # Draw detections
    for i in range(min(100, boxes.shape[0])):
        if scores[i] >= 0.5:  # Confidence threshold
            # Get coordinates
            y1, x1, y2, x2 = boxes[i]
            x1, x2 = int(x1 * width), int(x2 * width)
            y1, y2 = int(y1 * height), int(y2 * height)
            
            # Draw bounding box
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            
            # Add label
            class_id = classes[i]
            if class_id in class_names:
                label = f"{class_names[class_id]}: {scores[i]:.2f}"
            else:
                label = f"Class {class_id}: {scores[i]:.2f}"
                
            cv2.putText(img, label, (x1, y1 - 10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    return img

# Use the function
result_img = detect_objects('test_image.jpg')
cv2.imwrite('result.jpg', result_img)`
  },
  {
    heading: "Code Example: PyTorch with Torchvision",
    code: `import torch
import torchvision
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.transforms import functional as F
from PIL import Image, ImageDraw, ImageFont
import numpy as np

# Load pre-trained model
model = fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

# Move model to GPU if available
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

# COCO dataset class names
COCO_CLASSES = [
    '__background__', 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus',
    'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'N/A', 'stop sign',
    'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'N/A', 'backpack', 'umbrella', 'N/A', 'N/A',
    'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball',
    'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket',
    'bottle', 'N/A', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl',
    'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza',
    'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'N/A', 'dining table',
    'N/A', 'N/A', 'toilet', 'N/A', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 
    'cell phone', 'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'N/A',
    'book', 'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'
]

def detect_objects(image_path, threshold=0.7):
    # Load image
    image = Image.open(image_path).convert("RGB")
    
    # Transform image for model
    transform = F.to_tensor(image)
    input_img = transform.unsqueeze(0).to(device)
    
    # Run inference
    with torch.no_grad():
        prediction = model(input_img)
    
    # Process results
    result_img = image.copy()
    draw = ImageDraw.Draw(result_img)
    
    for idx, score in enumerate(prediction[0]['scores']):
        if score > threshold:
            # Get bounding box coordinates
            box = prediction[0]['boxes'][idx].cpu().numpy()
            x1, y1, x2, y2 = box.astype(int)
            
            # Get class label
            label_id = prediction[0]['labels'][idx].cpu().item()
            label = COCO_CLASSES[label_id]
            
            # Draw bounding box
            draw.rectangle([(x1, y1), (x2, y2)], outline="green", width=3)
            
            # Add label
            draw.text((x1, y1-15), f"{label}: {score:.2f}", fill="green")
    
    return result_img

# Use the function
result_img = detect_objects('test_image.jpg')
result_img.save('result.jpg')`
  },
  {
    heading: "Training Data Preparation",
    content: `**Common Annotation Formats:**<br/>
• **PASCAL VOC**: XML files with bounding box coordinates<br/>
• **COCO**: JSON format with annotations for detection, segmentation, keypoints<br/>
• **YOLO**: Text files with normalized coordinates (class, x, y, w, h)<br/><br/>

**Data Collection Best Practices:**<br/>
• Diverse images covering different environments, lighting, angles<br/>
• Balance between classes to avoid bias<br/>
• Include challenging cases: occlusion, unusual viewpoints<br/>
• Consistent annotation guidelines<br/><br/>

**Data Augmentation for Object Detection:**<br/>
• **Geometric**: Flipping, rotation, scaling, cropping<br/>
• **Photometric**: Brightness, contrast, saturation, hue<br/>
• **Object-centric**: Random erasing, mixup, mosaic augmentation<br/>
• **Special considerations**: Preserve object visibility, adapt bounding boxes`,
  },
  {
    heading: "Popular Object Detection Datasets",
    content: `• **COCO (Common Objects in Context)**: 330K images, 80 classes, 1.5M object instances<br/>
• **PASCAL VOC**: 11K images, 20 classes, 27K object annotations<br/>
• **Open Images**: 9M images, 600 classes, 16M bounding boxes<br/>
• **KITTI**: Autonomous driving dataset with 7K training images<br/>
• **BDD100K**: 100K videos and 10 tasks for autonomous driving<br/>
• **Cityscapes**: Urban street scenes with 5K annotated images<br/>
• **Waymo Open Dataset**: Autonomous driving dataset with 1K segments<br/>
• **Objects365**: 365 categories with 600K images<br/>
• **LVIS (Large Vocabulary Instance Segmentation)**: 1.2M instances, 1K+ categories<br/>
• **CrowdHuman**: 15K images with 340K human instances focused on crowded scenes`,
  },
  {
    heading: "Advanced Techniques for Object Detection",
    content: `**Anchor-Free Detection:**<br/>
• **CornerNet/CenterNet**: Detect objects as paired keypoints or center points<br/>
• **FCOS**: Fully Convolutional One-Stage detector without anchor boxes<br/><br/>

**Real-Time Optimization Techniques:**<br/>
• **Model Pruning**: Remove redundant connections/filters<br/>
• **Quantization**: Convert 32-bit floating point to lower precision<br/>
• **Knowledge Distillation**: Train smaller models using larger ones<br/>
• **TensorRT/ONNX**: Optimize models for specific hardware<br/><br/>

**Handling Small Objects:**<br/>
• Higher resolution input images<br/>
• Feature Pyramid Networks (FPN)<br/>
• Dense connections between feature levels<br/><br/>

**Handling Occlusion:**<br/>
• Part-based detection<br/>
• Training with occluded examples<br/>
• Deformable convolutions<br/><br/>

**Domain Adaptation:**<br/>
• Adapt models trained on one domain to another<br/>
• Techniques: adversarial training, self-training, consistency regularization`,
  },
  {
    heading: "Common Challenges & Solutions",
    content: `**Scale Variation:**<br/>
• **Challenge**: Objects appear at different sizes<br/>
• **Solution**: Multi-scale feature pyramids (FPN), multi-scale training/testing<br/><br/>

**Class Imbalance:**<br/>
• **Challenge**: Background vs. foreground samples imbalance<br/>
• **Solution**: Focal Loss, OHEM (Online Hard Example Mining), sampling strategies<br/><br/>

**Overlapping Objects:**<br/>
• **Challenge**: Objects occluding each other<br/>
• **Solution**: Better NMS algorithms (Soft-NMS, NMS with IoU prediction)<br/><br/>

**Tiny Objects:**<br/>
• **Challenge**: Very small objects are hard to detect<br/>
• **Solution**: Higher resolution, specialized training, feature enhancement<br/><br/>

**Efficient Inference:**<br/>
• **Challenge**: Real-time performance requirements<br/>
• **Solution**: Model compression, hardware acceleration, lightweight architectures`,
  },
  {
    heading: "Recent Advances in Object Detection",
    content: `• **Transformer-based Detectors**: DETR, Swin Transformer, ViTDet<br/>
• **End-to-End Detection**: Removing post-processing like NMS<br/>
• **Query-based Detection**: Object queries for direct set prediction<br/>
• **Open-Vocabulary Detection**: Detecting objects beyond training classes<br/>
• **Foundation Models**: Using large pre-trained models like CLIP for detection<br/>
• **Self-supervised Learning**: Contrastive learning and masked image modeling<br/>
• **Federated Learning**: Training across distributed devices without data sharing<br/>
• **3D Object Detection**: Extending to 3D with point clouds, LiDAR, depth information<br/>
• **Video Object Detection**: Leveraging temporal information across frames<br/>
• **Multi-modal Detection**: Combining images with text, audio, or other sensors`,
  },
  {
    heading: "Deployment Considerations",
    content: `**Hardware Options:**<br/>
• **GPUs**: NVIDIA (high performance), AMD (cost-effective)<br/>
• **Edge Devices**: NVIDIA Jetson, Google Coral, Intel NCS<br/>
• **Mobile**: On-device inference with CoreML (iOS), TFLite (Android)<br/><br/>

**Optimization Libraries:**<br/>
• **TensorRT**: NVIDIA's platform for high-performance inference<br/>
• **ONNX Runtime**: Cross-platform inference acceleration<br/>
• **OpenVINO**: Intel's toolkit for edge deployment<br/>
• **CoreML/Metal**: iOS optimization<br/><br/>

**Deployment Architectures:**<br/>
• **Cloud-based**: Process on powerful servers, higher latency<br/>
• **Edge Computing**: Process close to data source, reduced latency<br/>
• **On-device**: Process directly on end-device, privacy, no internet dependency<br/>
• **Hybrid**: Split processing between device and cloud<br/><br/>

**Real-world Considerations:**<br/>
• Latency vs. accuracy trade-offs<br/>
• Memory constraints<br/>
• Power consumption<br/>
• Cost of deployment and maintenance<br/>
• Privacy and security concerns`
  }
];

const CvObjectDetectCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Computer Vision: Object Detection Cheat Sheet"
      description="A comprehensive guide to object detection concepts, algorithms, techniques, and implementations in computer vision."
      sections={objectDetectionSections}
      cheatsheetId={12}
    />
  );
};

export default CvObjectDetectCheatSheet;