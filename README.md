## TECH HR

This project is a Human Resource Management System for an IT company, enabling managers, employees, and HR administrators to efficiently handle tasks, profiles, accounts, payroll, and training.

### Prerequisites

- Docker installed on your machine
- Node JS installed on your machine


### Running the Database with Docker Compose

1. **Clone the repository**:
    ```sh
    https://github.com/Chouikhi-abdallah/HRM-System-ISIMG.git
    ```

2. **Navigate to the directory containing the `compose.yml` file**:
    ```sh
    cd RM-System-ISIMG/backend
    ```

3. **Start the Docker containers**:
    ```sh
    docker-compose up -d
    ```

    This command will start the database container in detached mode.

4. **Verify that the containers are running**:
    ```sh
    docker-compose ps
    ```

    You should see a list of running containers which are: adminer,postgres

5. **Access the database**:
    - You can connect to the database using a database client (e.g., pgAdmin for PostgreSQL,Datagrip ...) with the connection details specified in the `docker-compose.yml` file.
    - Or for the adminer localhost in the port specified in the compose.yaml file

### Stopping the Database

To stop the running containers, use the following command:
```sh
docker-compose down
