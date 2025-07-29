# Secure Container Demo App

A simple Node.js app to demonstrate container security pipeline, including:
- Docker image build
- Vulnerability scanning (Trivy)
- Push to AWS ECR
- CI/CD automation

## Run Locally

```bash
docker build -t secure-demo .
docker run -p 3000:3000 secure-demo
