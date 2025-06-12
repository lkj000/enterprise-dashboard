# Ubuntu Base image with nodejs18.x
FROM escoacrprod01.azurecr.io/esco/ubuntu22/nodejs:18.x
#FROM node
USER root
# Installing required packages
RUN apt-get update && apt-get install -y \
    curl \
    git \
    vim \
    && rm -rf /var/lib/apt/lists/*
# RUN apt-get install -y jq netcat dnsutils
# Adding application specific group and user
RUN groupadd -g 1999 esgh-grp && useradd -r -u 1999 -g esgh-grp esgh

RUN mkdir -p /home/esgh
# Creating application directory and switching
WORKDIR /app

RUN chmod 777 /app && chown esgh:esgh-grp /app

# RUN chown esgh:esgh-grp /app

COPY --chown=esgh:esgh-grp . /app/

ENV NODE_OPTIONS=--max_old_space_size=6144
#Removing node_modules
# RUN npm install --force
RUN npm install && npm install -g serve && npm run build
# RUN npm run build
# RUN npm run build --if-present

# RUN ls -al

# RUN chown esgh:esgh-grp /app -R
# RUN chown -R esgh:esgh-grp /app/
# RUN chown esgh:esgh-grp /app -R && chown esgh:esgh-grp /app -R && chmod a+rwx /app/node_modules
RUN chown esgh:esgh-grp /app -R && chmod a+rwx /app/node_modules && chmod a+rwx /app/start.sh
# RUN chown esgh:esgh-grp /home/ -R
RUN chown esgh:esgh-grp /home/esgh -R && chown esgh:esgh-grp /home/esgh/ -R
# RUN chgrp -R 1999 /app && chmod -R g+rwX /app

# RUN ls -al

RUN chmod 777 /app/src/data && chown esgh:esgh-grp /app/src/data && chmod 777 /app/src/data-json && chown esgh:esgh-grp /app/src/data-json
# RUN chmod 777 /app/src/data-json && chown esgh:esgh-grp /app/src/data-json
RUN rm -rf /app/src/data/*.js && rm -rf /app/src/data-json/*.json && rm -rf /app/public/data-json/*.json


EXPOSE 3000

# Switching user to application user from root
USER esgh 

# Running the application
# CMD [ "npm", "start"]
# CMD [ "serve", "-s", "build"]
CMD ["bash", "/app/start.sh"]
