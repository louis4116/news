FROM  ghcr.io/puppeteer/puppeteer:20.9.0
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app



COPY package*.json ./
RUN npm ci
COPY . .
RUN npm install
RUN npm install -g nodemon

CMD ["npx","nodemon","index.js"]