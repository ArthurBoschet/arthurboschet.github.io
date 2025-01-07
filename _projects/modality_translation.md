---
layout: page
title: Unpaired Medical Image Translation
description: Medical image translation with adversarial diffusion models for pseudo labeling
img: assets/img/modality_translation_thumbnail.png
importance: 0
category: work
---

Presented at the MICCAI 2024 workshop on deep generative models, our paper <a href="https://link.springer.com/chapter/10.1007/978-3-031-72744-3_6">Unpaired Modality Translation for Pseudo Labeling of Histology Images</a>  was developed during a research internship with <a href="https://mila.quebec/fr/annuaire/julien-cohen-adad">Julien Cohen-Adad</a> at the <a href="https://neuro.polymtl.ca/">NeuroPoly Lab</a> from October 2023 to April 2024. This paper addresses the critical challenge of data scarcity in medical segmentation tasks, which is especially acute in histology imaging where researchers often have annotated data in one modality but lack it in another that is of interest. Our approach introduces a novel way to generate annotations in the target modality using existing labeled data, thus bridging this gap.

### Methods

Our methodology leverages the adversarial diffusion model, SynDiff, for unsupervised image translation, enabling the generation of pseudo labels without prior annotations in the target domain. We propose two pseudo labeling strategies to facilitate this translation:
1. **Tutorship**: This strategy involves training a proxy segmentation model on synthetic data derived from translating labeled images from one modality (e.g. TEM) to an unlabeled target modality (e.g. SEM).
2. **Adaptation**: This strategy converts unlabeled images to match the labeled data distribution, thereby enabling segmentation with a pre-trained model.

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% responsive_image path: assets/img/adaptation_tutorship.png title: "example image" class: "img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Overview of the two pseudo labeling strategies using TEM as the labeled dataset and SEM as the unlabeled data. (Top) The Tutorship strategy involves generating a synthetic dataset by translating labeled TEM images and training a proxy segmentation model on this synthetic data. (Bottom) The Adaptation strategy converts unlabeled SEM images to match the TEM data distribution, enabling segmentation with a pre- trained model.
</div>

These strategies were rigorously tested across three distinct image domains that varied significantly in similarity to the labeled data, evaluating their adaptability and effectiveness under various conditions.

### Results

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% responsive_image path: assets/img/results_translation.png title: "example image" class: "img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (Top) Image translation examples. (Bottom) Unsupervised translation recon- struction losses: Structural Similarity Index Measure (SSIM), Peak Signal-to-Noise Ratio (PSNR) and L1. The error bars represent the standard deviations among the validation images.
</div>

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% responsive_image path: assets/img/result_segmentation_modality.png title: "example image" class: "img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pseudo labeling results. (Top) Original and translated image alongside the pre-trained model prediction and pseudo labels. (Bottom) Dice scores under 5-fold cross-validation.
</div>

Our findings, as detailed in the paper, underscore the potential of our methods to significantly alleviate the issue of data scarcity in medical image segmentation:
- **SEM Dataset**: The tutorship strategy achieved a mean Dice score of 0.736, demonstrating its efficacy in generating useful pseudo labels for SEM images, which are typically difficult to annotate due to their unique properties.
- **Performance Across Domains**: While the adaptation strategy is more suited to settings with minimal domain shifts, the tutorship approach excels in more challenging environments, making it a robust solution for significant modality differences.

This project not only provides a viable solution to the lack of annotated medical imaging data in different modalities but also paves the way for more effective and efficient medical research and diagnostics by leveraging existing annotations more broadly.

For more details, check out the <a href="https://www.arxiv.org/abs/2412.02858">paper</a> and the code in our <a href="https://github.com/axondeepseg/AxonDeepSynth"> repository </a>.