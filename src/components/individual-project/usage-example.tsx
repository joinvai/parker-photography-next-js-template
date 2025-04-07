'use client';

import IndividualProjectImage from './individual-project-image';

// This is just a demonstration component to show how IndividualProjectImage can be used
export default function IndividualProjectImageExample() {
  // Sample project data for demonstration
  const projectData = {
    id: 'example-project',
    name: 'EXAMPLE PROJECT',
    year: '2024',
    photos: [
      '/projects/example/photo1.jpg',
      '/projects/example/photo2.jpg',
      '/projects/example/photo3.jpg',
      '/projects/example/photo4.jpg',
      '/projects/example/photo5.jpg',
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-8">Individual Project Image Component Usage</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Example 1: Standard image */}
        <div>
          <IndividualProjectImage
            src={projectData.photos[0]}
            alt={`${projectData.name} image 1`}
            projectName={projectData.name}
            projectYear={projectData.year}
            projectId={projectData.id}
            allImages={projectData.photos}
            imageIndex={0}
            priority={true}
            isAboveFold={true}
            showCaption={true}
            data-testid="example-image-1"
          />
        </div>
        
        {/* Example 2: Different aspect ratio */}
        <div>
          <IndividualProjectImage
            src={projectData.photos[1]} 
            alt={`${projectData.name} image 2`}
            projectName={projectData.name}
            projectYear={projectData.year}
            projectId={projectData.id}
            allImages={projectData.photos}
            imageIndex={1}
            aspectRatio="aspect-square"
            showCaption={true}
            data-testid="example-image-2"
          />
        </div>
        
        {/* Example 3: Portrait aspect ratio */}
        <div>
          <IndividualProjectImage
            src={projectData.photos[2]}
            alt={`${projectData.name} image 3`}
            projectName={projectData.name}
            projectYear={projectData.year}
            projectId={projectData.id}
            allImages={projectData.photos}
            imageIndex={2}
            aspectRatio="aspect-[3/4]"
            showCaption={true}
            data-testid="example-image-3"
          />
        </div>
        
        {/* Example 4: Wide aspect ratio spanning two columns */}
        <div className="sm:col-span-2">
          <IndividualProjectImage
            src={projectData.photos[3]}
            alt={`${projectData.name} image 4`}
            projectName={projectData.name}
            projectYear={projectData.year}
            projectId={projectData.id}
            allImages={projectData.photos}
            imageIndex={3}
            aspectRatio="aspect-[21/9]"
            data-testid="example-image-4"
          />
        </div>
        
        {/* Example 5: Video aspect ratio */}
        <div>
          <IndividualProjectImage
            src={projectData.photos[4]}
            alt={`${projectData.name} image 5`}
            projectName={projectData.name}
            projectYear={projectData.year}
            projectId={projectData.id}
            allImages={projectData.photos}
            imageIndex={4}
            aspectRatio="aspect-video"
            data-testid="example-image-5"
          />
        </div>
      </div>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Implementation Notes</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Each image can be configured with different aspect ratios</li>
          <li>Priority loading is available for above-fold images</li>
          <li>Clicking any image opens a lightbox gallery with all project images</li>
          <li>Responsive sizing ensures proper display on all devices</li>
          <li>Animation effects enhance user experience</li>
          <li>Accessibility features are built-in</li>
        </ul>
      </div>
    </div>
  );
} 