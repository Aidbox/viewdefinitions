FROM postgres:16

RUN apt-get update && apt-get install -y wget make gcc ruby sudo

RUN wget https://eradman.com/ephemeralpg/code/ephemeralpg-3.3.tar.gz
RUN tar xvfz ephemeralpg-3.3.tar.gz
COPY ./docker/test-db/getsocket.c ephemeralpg-3.3/getsocket.c
RUN cd ephemeralpg-3.3 && make install

COPY ./docker/test-db/create-db.sh ./
RUN chmod +x ./create-db.sh
