# pnpm
![alt text](image.png)

# fastAPI
![](fastapi.png)

# deploy docker compose 
1. without nginx
2. nginx available
3. with nginx

## Deployment methods

This project supports three different deployment methods using Docker Compose:

1. **Nginx direct deployment**:
   - Use the `docker-compose-nginx-direct.yml` file to deploy the project with Nginx as a reverse proxy.
   - Command: `docker-compose -f docker/docker-compose-nginx-direct.yml up --build`

2. **Mounting an existing Nginx**:
   - Use the `docker-compose-existing-nginx.yml` file to deploy the project with an existing Nginx instance.
   - Command: `docker-compose -f docker/docker-compose-existing-nginx.yml up --build`

3. **Without Nginx**:
   - Use the `docker-compose-no-nginx.yml` file to deploy the project without Nginx.
   - Command: `docker-compose -f docker/docker-compose-no-nginx.yml up --build`
