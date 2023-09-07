# FROM  ghcr.io/puppeteer/puppeteer:20.9.0

# # RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
# # RUN apt-get install -y nodejs

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# WORKDIR /usr/src/app

# FROM node:slim
# # We don't need the standalone Chromium
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# FROM ghcr.io/puppeteer/puppeteer:19.7.2

# # Install Google Chrome Stable and fonts
# # Note: this installs the necessary libs to make the browser work with Puppeteer.
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true\
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# # RUN apt-get update && apt-get install gnupg wget -y && \
# #     wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
# #     sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
# #     apt-get update && \
# #     apt-get install google-chrome-stable -y --no-install-recommends && \
# #     rm -rf /var/lib/apt/lists/*

# COPY package*.json ./
# RUN npm ci
# # RUN npm install
# # RUN npm install -g nodemon
# COPY . .
# Use an official Node.js runtime as the base image
FROM node:14

# Set a working directory
WORKDIR /app

# Install nodemon globally
RUN npm install -g nodemon

# Install Puppeteer and its dependencies
RUN apt-get update && apt-get install -y \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    ttf-freefont \
    fonts-liberation \
    xdg-utils

# Install Puppeteer
RUN npm install puppeteer

# Copy your application files to the container
COPY . .

# Start your application
CMD ["npm", "start"]
# CMD ["node","index.js"]


