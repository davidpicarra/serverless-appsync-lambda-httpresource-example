FROM node:10.16.3
LABEL maintainer="David Picarra <daviddcp@gmail.com>"

RUN apt-get update && \
  apt-get install -y --no-install-recommends lsof zip python3 default-jre

ADD package.json yarn.lock /root/app/
RUN cd /root/app/ && yarn
WORKDIR /root/app/

COPY . /root/app

CMD ["bash"]
