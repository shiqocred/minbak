# Gunakan Ubuntu 24 sebagai base image
FROM ubuntu:24.04

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies
RUN apt-get update && apt-get install -y curl git unzip \
    && curl -fsSL https://bun.sh/install | bash \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Tambahkan Bun ke PATH
ENV PATH="/root/.bun/bin:$PATH"

# Tentukan working directory
WORKDIR /app

# Copy file package.json dan bun.lockb terlebih dahulu
COPY package.json bun.lockb ./

# Install dependencies dengan Bun
RUN bun install --frozen-lockfile

# Copy seluruh project ke dalam container
COPY . .

# Build proyek Next.js
RUN bun x playwright install-deps && bun run build

# Expose port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["bun", "run", "start"]
