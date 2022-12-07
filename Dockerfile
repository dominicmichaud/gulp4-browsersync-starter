FROM node:16.15.0

# Create app directory
WORKDIR /app

#RUN apt-get update && apt-get install -y vim

RUN npm init -y && npm install --global gulp-cli

# Container Global dependency
#RUN 

RUN npm install --save-dev gulp sass gulp-sass gulp-postcss gulp-autoprefixer gulp-webp gulp-rename gulp-terser browser-sync cssnano postcss

# Bundle app source
COPY . .

CMD ["gulp"]