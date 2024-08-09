FROM nginx:alpine

# Copy the built files from the previous stage
COPY ./dist /usr/share/nginx/html
COPY ./images /usr/share/nginx/html/images
COPY ./midi /usr/share/nginx/html/midi
COPY ./sounds /usr/share/nginx/html/sounds
COPY ./Enjine /usr/share/nginx/html/Enjine
COPY ./code /usr/share/nginx/html/code

# Copy nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Command to start nginx when container runs
CMD ["nginx", "-g", "daemon off;"]
