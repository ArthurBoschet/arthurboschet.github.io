---
layout: page
title: Retinal Image Generation
description: Synthetic retinal image generation via latent diffusion models
img: assets/img/hyperspectral_thumbnail.png
importance: -1
category: work
---

During my internship at Optina Diagnostics, I focused on generating synthetic hyperspectral retinal images to enhance a self-supervised learning (SSL) framework aimed at improving the classification of amyloid-β—an important biomarker for Alzheimer’s disease. Crucially, these synthetic images were unlabeled and therefore served exclusively for pretraining in the SSL pipeline, where they could help the model learn robust feature representations without relying on labeled datasets.

### Technical Overview

This project harnessed Latent Diffusion Models (LDMs) adapted from the [Medical Diffusion](https://github.com/FirasGit/medicaldiffusion) work by Khader et al. The initial setup generated 224×224-pixel images across 16 spectral bands. Constrained by available computational resources, these lower-resolution images allowed rapid experimentation on various architectures. Subsequently, the approach was scaled to 672×672-pixel images while retaining 16 spectral bands, to refine the model’s performance at higher resolutions.

### Methodology

#### Image Generation
The LDM framework underpins the image generation process. First, an autoencoder—specifically, a Vector Quantized Generative Adversarial Network (VQ-GAN)—compresses the input images into a latent space and then reconstructs them back to the original dimensions. A diffusion model operates within this latent representation, after which the decoder transforms the latent vectors back into full-resolution images. In earlier trials, VQ-VAEs were evaluated, but VQ-GAN demonstrated superior preservation of structural details and image fidelity.

To speed up training convergence, K-Means clustering was employed at the start of each epoch to initialize the VQ-GAN’s codebook. By using cluster centroids derived from the training data, this initialization process helped the codebook adapt more efficiently to the data’s latent distribution.

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% responsive_image path: assets/img/architecture_LDM.png title: "example image" class: "img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Architecture of the LDM used for generating synthetic hyperspectral images.
</div>

#### Quality and Diversity Assessment
Multiple metrics were employed to confirm the usability and uniqueness of the generated images:
- **Spatial Quality**: A specialized hyperspectral Fréchet Inception Distance (FID) score measured the distance between real and generated image feature distributions.
- **Spectral Quality**: Kullback-Leibler divergence was evaluated for key ocular structures (e.g., veins, arteries, ONH) to ensure accurate spectral reproduction.
- **Image Diversity**: Multi-Scale Structural Similarity (MS-SSIM) gauged the perceptual variability among generated images.
- **Authenticity**: Nearest-neighbor analysis in the training set verified that the synthetic images remained distinct from real training samples, preventing duplication while preserving realism.

### Results

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% responsive_image path: assets/img/224x224x16_results_LDM.png title: "example image" class: "img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Results of the LDM experiments for 224×224×16 resolution, performed on an NVIDIA A40 GPU. This resolution was selected to facilitate faster training and thorough experimentation.
</div>

Preliminary experiments at 224×224×16 resolution involved testing multiple configurations of the autoencoder and diffusion components. The figure above displays five plots tracking Hyperspectral FID, the absolute difference between validation and synthetic MS-SSIM, and Spectral KL-Divergence (covering veins, arteries, and the ONH), all measured against sampling speed on an NVIDIA A40 GPU. I utilized a VQ-GAN with a1024-vector codebook, alongside a three-level Diffusion U-Net. The configurations explored various latent space compression factors (16, 8, 4), latent channels (8, 32, 256), and base channels (128, 256, 512) in the diffusion network. A Pareto front highlighted a trade-off between sampling speed and both spectral and spatial quality. Although models using 512 base channels in a U-Net with a compression factor of 8 achieved higher quality, additional gains were modest and diminished sampling efficiency. Furthermore, these high-capacity settings showed superior diversity, and changes to the codebook dimension yielded minimal impact. An optimal balance for upscaling emerged from a configuration featuring a compression factor of 8, 8 latent channels, and a 512-channel U-Net.

Following these experiments, the model was scaled to a resolution of 672×672×16. The figure below displays representative synthetic images across eight wavelengths (900 nm, 815 nm, 730 nm, 640 nm, 555 nm, and 465 nm), showcasing realism almost indistinguishable from real images.

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% responsive_image path: assets/img/synthetic_hyperspectral.png title: "example image" class: "img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example of synthetic hyperspectral images generated by the optimal model at 672×672×16 resolution.
</div>

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% responsive_image path: assets/img/hyperspectral_image_eg.gif title: "example image" class: "img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example of a synthetic hyperspectral image generated by the optimal model at 672×672×16 resolution.
</div>

### Impact and Future Work

This initiative broadens Optina’s ability to utilize unlabeled synthetic data for self-supervised learning. Although the direct effect on amyloid-β classification is still under investigation, the high fidelity of the synthetic images presents promising avenues for enhancing classification pipelines. Going forward, these synthetic images will be integrated into Optina’s operational SSL workflows, providing additional unlabeled data for representation learning and potentially boosting downstream model accuracy for amyloid-β detection.

For a deeper dive into the technical details and findings, please consult the associated internship <a href="https://arthurboschet.github.io/assets/pdf/Generating_Hyperspectral_Retinal_Images_with_Latent_Diffusion_Models_FINAL.pdf">technical report</a>.
