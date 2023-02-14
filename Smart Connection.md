Workshop:
Plant specific 3d photogrammetry via cakeras 39cm appart, in this case cucumber

NN:
Detect nodes, a place where a branch splits off from trunk or specific points on leaves

Used gradient descend for learning. 
Algo uses score metrics: True detections, precision and missed detection.

2D image detections are turned into 3d by translating image and than clustering.
This process actualli gives the plant-internal position instead of the outside position.

##3D_Version
Point cloud get's segmented
Stems get extracted
Stems are replaced by 3d shapes/mesh

#3dsensing
3ways: 

Shape from silouette, generates a point cloud of edges that gets 3d rasterised with a boolean of occupied or not and colorized.

Can also be done using laser with a sonar like setup which generates a point cloud with all surfaces.

multiview stereography:
uses: Edisoft? 
Standard photogrametry setup

##Data processing
map to 2d and do it multiple times
or direct 3d

First method:
Uses camera to segment plant first, pixels get labeled air, leaves, stem.
Pictures than get rotated and using clustering to figure lut which points overlap than averaged to relabel.

Second method:
2D images contain spatial ordering 2d nn's can exploit that. 3d can't work that way because of output should be independent of point input ordering.

Layered model based on single point processing:
first few layers to "get" the image than a max pooling to get a transform vector that is then re-used on the image to translate and scale it and thus get the rotation.


Rotation is then a global feature.
This is then used in fully connected layer to figure out if the point in question is a leaf or trunk e.t.c.

That then gets used for labeling of points called features

They have a nn extension that considers the cloud on different levels/resolutions.

That output is then used to label the original point cloud.

Limitations:
Nn had uniform input count but laser scanners output or camera varies.
Downsampling/averaging the points works but loses a lot of information

Splitting them up into cuboids works.

There where some  problems with labeling and with more info in the form of ir "colors" improves performance but including useless info reduces it.



IoU is inverse delta between subjective labeling and thus low IoU means low confidence.


Possible improvements:
Class-dependent sampling:
Re-process points of a specifc class in a specific cuboid and use that as training data. Improves parts of plant that have low occurrence 



Problem:
Pointcloud labeling is time-consuming so dataset is really small.
Causes overfitting and thus poor generalisation.

Solutions:
Downsampeling, Slightly randomly shift data around a bit, Scale Rotate and Translate the plant, Only show specific parts, change the brightness.

All these solutions can be done both locally and over the whole pointcloud.

There are some problems with measurement differences:
Camera, time of day e.t.c.
Creating a different dataset.
But a more varied dataset creates a better/more pratical model in the end.

Improvements can also be made by finding an unlabeled dataset, labeling the most uncertain images and then re-training the model.

Actual conclusion:
3D systems exist in many forms
3D is better at seperating plant parts than 2D
PN++ can be thought  to seperate plant parts



Presentation general conclusion:
Explanation order doesn't feel logical but that might be a culture difference or too in-depth or wrong target audience. Extra text because I keep noticing it.

