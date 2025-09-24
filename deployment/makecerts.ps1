# Ensure the certs directory exists
if (-not (Test-Path "certs")) {
    New-Item -ItemType Directory -Path "certs" | Out-Null
}

# Generate a self-signed certificate and private key
openssl req -x509 -nodes -newkey rsa:2048 -days 365 `
    -keyout certs/selfsigned.key `
    -out certs/selfsigned.crt `
    -subj "/CN=localhost"

# Concatenate the certificate and key into a PEM file
Get-Content certs/selfsigned.crt, certs/selfsigned.key | Set-Content certs/selfsigned.pem
