FROM  ghcr.io/puppeteer/puppeteer:20.9.0

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app



COPY package*.json ./
RUN npm ci
RUN npm install
RUN npm install -g nodemon
COPY . .
CMD ["npx","nodemon","index.js"]