// Sample test file for IndividualProjectImage component
// This is not a full test suite but shows how the component could be tested

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IndividualProjectImage from './individual-project-image';

// Mock the dynamic import of the lightbox
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = ({ open, onClose }) => 
    open ? <div data-testid="mock-lightbox">Mock Lightbox <button onClick={onClose}>Close</button></div> : null;
  return DynamicComponent;
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} src={props.src || ''} style={{ objectFit: props.objectFit }} />;
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('IndividualProjectImage', () => {
  const mockProps = {
    src: '/test/image.jpg',
    alt: 'Test Image',
    projectName: 'TEST PROJECT',
    projectYear: '2024',
    projectId: 'test-project',
    allImages: ['/test/image.jpg', '/test/image2.jpg'],
    imageIndex: 0,
    priority: true,
    isAboveFold: true,
    'data-testid': 'test-image',
  };

  it('renders the component with correct props', () => {
    render(<IndividualProjectImage {...mockProps} />);
    
    // Check if the image is rendered with correct alt text
    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
    
    // Check if the button has correct aria-label
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'View TEST PROJECT (2024) image 1 in lightbox');
  });

  it('opens the lightbox when clicked', () => {
    render(<IndividualProjectImage {...mockProps} />);
    
    // Click the image to open lightbox
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check if lightbox is opened
    const lightbox = screen.getByTestId('mock-lightbox');
    expect(lightbox).toBeInTheDocument();
  });

  it('shows caption when showCaption is true', () => {
    render(<IndividualProjectImage {...mockProps} showCaption={true} />);
    
    // Check if caption is displayed
    const imageNumber = screen.getByText('Image 1');
    const projectName = screen.getByText('TEST PROJECT');
    
    expect(imageNumber).toBeInTheDocument();
    expect(projectName).toBeInTheDocument();
  });

  it('does not show caption when showCaption is false', () => {
    render(<IndividualProjectImage {...mockProps} showCaption={false} />);
    
    // Caption should not be displayed
    const imageNumber = screen.queryByText('Image 1');
    expect(imageNumber).not.toBeInTheDocument();
  });
}); 