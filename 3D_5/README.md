The goal here was to develop a procudure that can develop a beautiful, complex scene
using simple rules. This meant going with self-similar geometry.

Inspired by the demo Heaven 7 by Exceed (https://www.youtube.com/watch?v=rNqpD3Mg9hY). 
That demo was written about 16 years ago, is 64kb or fewer in size, and is written in assembly without OpenGL. 

I wanted to create something similar to the structure scene at 1:40. 
The demo creates a sphere, then adds smaller ones touching its surface at all 6 faces of a bounding box,
and does the same for those; in total 3 levels of heirarchy.

That's what was started with, and the parameters were modified until I was satisfied with the results. 

Eventually, it came to be the two-child, 5-level sphere structure it is now. It was still a little uninteresting at this point,
so the glow was added. Each sphere would emit light when its parent is not, and the color would completely synchronize 
every second time all spheres are in line. The camera will slowly rotate in an eliptical orbit, or if clicked the user can perform 
a gentle circling motion to move the camera.


