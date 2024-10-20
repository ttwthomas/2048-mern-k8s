FROM ubuntu:latest

# Copy the project files to the container
COPY . /home/ubuntu/2048-mern

RUN cp -r client/public client/build

# Set the working directory to the server folder
WORKDIR server

# Update package list and install npm
RUN apt-get update && apt-get install -y --no-install-recommends npm && npm install && rm -rf /var/lib/apt/lists/*


# Set the command to start the server
CMD ["npm", "run", "start"]