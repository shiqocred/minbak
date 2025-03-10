# Gunakan Ubuntu 24 sebagai base image
FROM ubuntu:24.04

# Set environment variables
ENV NODE_ENV=production

# Install dependencies
RUN apt-get update && apt-get install -y curl git unzip \
    && curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.20" \
    && apt-get clean

# Tambahkan Bun ke PATH
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Set working directory
WORKDIR /app

# Salin file proyek
COPY . .

# Install dependencies dengan Bun
RUN bun install --production

# Build aplikasi jika perlu
RUN bun run build

# Jalankan aplikasi
CMD ["bun", "run", "start"]
