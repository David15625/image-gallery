# Simple Image Gallery 

A minimal Node.js + HTML image upload site.

## Endpoints

- `/` — upload page
- `/gallery` — swipeable gallery
- `/api/images` — JSON list of images
- `/uploads/<filename>` — individual image

## Limits

- Maximum 20 images per upload request.
- Maximum 10 MB per image.
- Only files whose upload MIME type is `image/*` are accepted. This is a minimal check.
- Anyone who can access the public site can upload images and view the gallery. Add authentication and stricter validation before sharing publicly.
