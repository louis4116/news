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
# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install Nodemon globally
RUN npm install -g nodemon

# Install Puppeteer as a project dependency (you can also use yarn if preferred)
RUN npm install puppeteer
COPY package*.json ./
# Copy your application code into the container
COPY . .

# Specify the default command to run your application
CMD [ "npm", "start" ]
# CMD ["node","index.js"]


