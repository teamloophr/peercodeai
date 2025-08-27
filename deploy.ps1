# Deploy PeerCode AI Website to S3
# PowerShell Script for Windows

param(
    [Parameter(Mandatory=$true)]
    [string]$BucketName,
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1"
)

Write-Host "🚀 Starting deployment to S3..." -ForegroundColor Green

# Check if AWS CLI is installed
try {
    aws --version | Out-Null
    Write-Host "✅ AWS CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI not found. Please install it first." -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build completed" -ForegroundColor Green

# Check if bucket exists, if not create it
Write-Host "🔍 Checking if bucket exists..." -ForegroundColor Yellow
$bucketExists = aws s3 ls "s3://$BucketName" 2>$null
if (-not $bucketExists) {
    Write-Host "📦 Creating bucket: $BucketName" -ForegroundColor Yellow
    aws s3 mb "s3://$BucketName" --region $Region
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to create bucket!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Bucket created" -ForegroundColor Green
} else {
    Write-Host "✅ Bucket already exists" -ForegroundColor Green
}

# Configure bucket for static website hosting
Write-Host "🌐 Configuring bucket for static website hosting..." -ForegroundColor Yellow
aws s3 website "s3://$BucketName" --index-document index.html --error-document index.html
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to configure website hosting!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Website hosting configured" -ForegroundColor Green

# Set bucket policy for public read access
Write-Host "🔓 Setting bucket policy..." -ForegroundColor Yellow
$policy = Get-Content "bucket-policy.json" -Raw | ForEach-Object { $_ -replace "your-bucket-name", $BucketName }
$policy | aws s3api put-bucket-policy --bucket $BucketName --policy stdin
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to set bucket policy!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Bucket policy set" -ForegroundColor Green

# Enable CORS
Write-Host "🌍 Enabling CORS..." -ForegroundColor Yellow
aws s3api put-bucket-cors --bucket $BucketName --cors-configuration file://cors.json
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to enable CORS!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ CORS enabled" -ForegroundColor Green

# Deploy website files
Write-Host "📤 Deploying website files..." -ForegroundColor Yellow
aws s3 sync dist/ "s3://$BucketName" --delete
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Website deployed successfully!" -ForegroundColor Green

# Display website URL
$websiteUrl = "http://$BucketName.s3-website-$Region.amazonaws.com"
Write-Host ""
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host "🌐 Your website is now available at:" -ForegroundColor Cyan
Write-Host "   $websiteUrl" -ForegroundColor White
Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Test your website at the URL above" -ForegroundColor White
Write-Host "   2. Consider setting up CloudFront for HTTPS and better performance" -ForegroundColor White
Write-Host "   3. Configure your custom domain if you have one" -ForegroundColor White
