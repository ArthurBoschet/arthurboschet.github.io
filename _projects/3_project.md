---
layout: page
title: SpotiBCI
description: Mind-control media player
img: assets/img/spotipy.png
importance: 2
category: fun
---

SpotiBCI was a course project for BIEN 462: Engineering Principles in Physiological Systems. My classmate and I designed a system for controlling Spotify playback (next/previous/pause) using motor imagery and jaw clenches detected from EEG. This type of technology is highly relevant for individuals with ALS or locked-in syndome who are unable to interact with media in standard ways.

To change the song, the user can imagine moving their left or right hand. This produces an acute desychronization of electrical oscillations in the alpha frequency band (8-13 Hz). This is called an event-related desynchronization (ERD). We visualized this effect using motor imagery data from the 4th Berlin BCI Competition (Dataset 2b) on an ideal subject. This is a normalized time-frequency decomposition using Morlet wavelets.

As such, to recognize this event, we trained a convolutional neural network (CNN) on time-frequency images, similar to the one shown above. Using leave-one-subject-out cross-validation, we reached a validation accuracy of 0.655 +/- 0.122 across all subjectes, reaching as high as 0.881 on an individual, held-out subject.

To make the system more usable, we used jaw clenches as a control signal. If the user wants to change the song, they would clench their jaw. Subsequently, if they keep their jaw clenched, then this toggles pause/play. Otherwise, the system will go to the next or previous song depending on the output of the CNN.

To recognize jaw clenches, we recorded a toy dataset using the OpenBCI Cyton.

We recorded 100 jaw clenches and 100 resting segments, and fed alpha, theta, and beta bandpower into a logistic regression classifier. This reached a 10-fold cross-validation accuracy of 0.9850 +/- 0.0014.

These models were then integrated with a real-time data stream from the Cyton via LSL, and with the Spotify API for playback control. A demo can be seen here.

For more details, check out the project report.

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% responsive_image path: assets/img/time-f.png title: "example image" class: "img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>