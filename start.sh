#!/bin/sh

# Jalankan bun start di foreground
bun run start &

# Jalankan playwright install di background
bun x playwright install &

# Tunggu semua proses selesai
wait
