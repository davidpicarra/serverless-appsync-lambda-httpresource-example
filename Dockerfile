FROM node:10.19.0
LABEL maintainer="David Picarra <daviddcp@gmail.com>"

RUN apt-get update && \
  apt-get install -y --no-install-recommends lsof zip python3 default-jre-headless

ADD package.json yarn.lock /root/app/
RUN cd /root/app/ && yarn
WORKDIR /root/app/

COPY . /root/app

CMD ["bash"]
