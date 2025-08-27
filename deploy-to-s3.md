# Deploy PeerCode AI Website to S3

## Prerequisites
1. AWS CLI installed and configured
2. S3 bucket created for hosting
3. Bucket configured for static website hosting

## Step 1: Create S3 Bucket (if not exists)
```bash
aws s3 mb s3://your-bucket-name --region us-east-1
```

## Step 2: Configure S3 Bucket for Static Website Hosting
```bash
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

## Step 3: Set Bucket Policy for Public Read Access
Create a file called `bucket-policy.json`:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://bucket-policy.json
```

## Step 4: Deploy Website Files
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

## Step 5: Enable CORS (if needed)
Create a file called `cors.json`:
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

Apply CORS:
```bash
aws s3api put-bucket-cors --bucket your-bucket-name --cors-configuration file://cors.json
```

## Step 6: Access Your Website
Your website will be available at:
```
http://your-bucket-name.s3-website-us-east-1.amazonaws.com
```

## Alternative: Deploy with CloudFront (Recommended)
For better performance and HTTPS support:

1. Create CloudFront distribution
2. Set origin to your S3 bucket
3. Set default root object to `index.html`
4. Configure error pages to redirect to `index.html` (for SPA routing)

## Quick Deploy Script
Create a file called `deploy.sh`:
```bash
#!/bin/bash
BUCKET_NAME="your-bucket-name"
REGION="us-east-1"

echo "Building project..."
npm run build

echo "Deploying to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

echo "Website deployed to: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
```

Make it executable and run:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Notes
- Replace `your-bucket-name` with your actual bucket name
- The `--delete` flag removes files from S3 that don't exist in your dist folder
- Consider setting up CloudFront for better performance and HTTPS
- Remember to update your domain DNS if you're using a custom domain
