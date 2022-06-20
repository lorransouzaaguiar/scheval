FROM node:lts-slim
RUN apt-get update \ 
    && apt-get install git -y \
    && apt-get clean 
RUN yarn global add commitizen prettier@2.2.1
RUN yarn global bin \
    && yarn config set prefix ~/.yarn \
    && export PATH="$PATH:`yarn global bin`" \
    && bash -l
WORKDIR /scheval
COPY . .
USER node
EXPOSE 8080
CMD ["node"]