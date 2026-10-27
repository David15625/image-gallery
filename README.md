# Simple Image Gallery (Railway)

A minimal Node.js + HTML image upload site.

## Deploy to Railway

1. Create a GitHub repository and upload all files in this folder to the repository root.
2. In Railway, create a project and deploy from that GitHub repository.
3. In the Railway service settings, generate a public domain.
4. Add a Railway Volume to the service and set its mount path to `/data`.
5. Add this service variable:
   `UPLOAD_DIR=/data/uploads`
6. Redeploy if Railway does not redeploy automatically.

The app uses Railway's `PORT` environment variable automatically.

## Endpoints

- `/` — upload page
- `/gallery` — swipeable gallery
- `/api/images` — JSON list of images
- `/uploads/<filename>` — individual image

## Limits

- Maximum 20 images per upload request.
- Maximum 10 MB per image.
- Only files whose upload MIME type is `image/*` are accepted. This is a minimal check, not production-grade file validation.
- Anyone who can access the public site can upload images and view the gallery. Add authentication and stricter validation before sharing publicly.
- Persistent storage and hosting are subject to Railway's current free-plan limits and pricing.
