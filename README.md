# AIRealNet Demo

<div align="center">

![AIRealNet Banner](https://img.shields.io/badge/AIRealNet-v1.0-blueviolet?style=for-the-badge)
[![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Model-yellow?style=for-the-badge)](https://huggingface.co/XenArcAI/AIRealNet)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**Next-Generation Image Authenticity Analysis**

[View on Hugging Face](https://huggingface.co/XenArcAI/AIRealNet) • [Official GitHub](https://github.com/XenArcAI/AIRealNet)

</div>

---

## 📋 Overview

**AIRealNet** is a state-of-the-art deep learning model designed to detect AI-generated imagery with high precision. This repository contains a demonstration application that showcases the capabilities of the AIRealNet model through a modern, user-friendly web interface.

The application consists of:
- **Backend**: A Flask-based API serving the AIRealNet model (powered by Transformers & PyTorch).
- **Frontend**: A sleek, cyberpunk-inspired web interface for easy interaction.

## ✨ Features

- **Real-time Analysis**: Instantly analyze images via URL.
- **Visual Confidence Scores**: Dynamic progress bars showing the model's confidence for each class.
- **Modern UI**: A responsive, dark-themed interface with glassmorphism and smooth animations.
- **Easy Deployment**: Simple setup with a unified launcher script.

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/XenArcAI/AIRealNet.git
   cd AIRealNet
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Usage

To start both the backend API and the frontend interface, simply run the provided shell script:

```bash
chmod +x run_app.sh
./run_app.sh
```

Alternatively, you can run the services manually:

**Backend (Port 5000):**
```bash
python3 main.py
```

**Frontend (Port 3000):**
```bash
python3 frontend/server.py
```

Access the application at `http://localhost:3000`.

## 🤖 Model Information

The core of this application is the **AIRealNet** model, developed by **XenArcAI**.

- **Hugging Face Hub**: [XenArcAI/AIRealNet](https://huggingface.co/XenArcAI/AIRealNet)

## 🤝 Contributing

This is a demo repository. so you can report issues and suggest features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Developed with ❤️ by XenArcAI
</div>
