/**
 * S3 Bucket Configuration
 * Base URL for VoiceUp Athletics image assets
 *
 * IMPORTANT: To make images publicly accessible, you need to:
 * 1. Turn OFF "Block all public access" in S3 bucket settings
 * 2. Add a bucket policy to allow public read access
 *
 * See S3-IMAGES-GUIDE.md for detailed instructions
 */

export const S3_CONFIG = {
  baseUrl: 'https://voice-up-athletics.s3.us-east-2.amazonaws.com',
  imagesPath: '/Images'
} as const;

/**
 * Helper function to generate S3 image URLs
 * @param imageName - Name of the image file (e.g., 'Capture2.PNG')
 * @returns Full S3 URL
 */
export function getS3ImageUrl(imageName: string): string {
  return `${S3_CONFIG.baseUrl}${S3_CONFIG.imagesPath}/${imageName}`;
}

/**
 * Image assets mapping
 * Maps logical names to actual S3 file names
 *
 * IMPORTANT: File names are case-sensitive in S3
 * Update these mappings to match your exact S3 file names
 */
export const IMAGES = {
  // Hero section
  hero: getS3ImageUrl('mental-health-image.jpg'), // Update this with your actual hero image name

  // How It Works section - Update these with your actual file names from S3
  loginImage: getS3ImageUrl('Login-image.jpg'),
  dashboardCapture: getS3ImageUrl('Capture.PNG'),
  supportRequestCapture: getS3ImageUrl('Capture2.PNG'),
  resourcesCapture: getS3ImageUrl('Capture3.PNG'),
  chatImage: getS3ImageUrl('chat-image.png'),
  escalationImage: getS3ImageUrl('image3.jpg'),
} as const;
