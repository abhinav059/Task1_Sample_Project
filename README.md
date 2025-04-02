Simple node.js app that servers "hello world"

---


# Task1 Sample Project

Git repository setup,**Branching**, **Merging**, and **Conflict Resolution**.
###  1: Clone the Repository

```bash
git clone https://github.com/abhinav059/Task1_Sample_Project.git
```
This will download the project files and the entire repository history.

###  2: Navigate to the Project Folder

```bash
cd Task1_Sample_Project
```

### 3:verify that everything is set up correctly by running:

```
git status
```


### Check Out the Branches
To see all available branches, run:

```bash
git branch -a
```

### Branching and Merging

```bash
git checkout -b feature
```

This will create a new branch named `feature` and switch you to it.

### Make Changes to the Code

After switching to the feature branch, make your changes in the project files and you can stage the changes:

```bash
git add .
git commit -m "Added new feature"
```

### Push the Feature Branch to GitHub

```bash
git push origin feature
```

###  Merge the Feature Branch into the Main Branch

1. Switch back to the `main` branch:

   ```bash
   git checkout main
   ```

2. Pull the latest changes from the remote `main` branch to make sure your local `main` is up-to-date:

   ```bash
   git pull origin main
   ```

3. Merge the `feature` branch into `main`:

   ```bash
   git merge feature
   ```

   If there are any conflicts, Git will notify you, and you can resolve them by editing the conflicted files.

4. After resolving any conflicts and committing the resolved files, push the merged changes to GitHub:

   ```bash
   git push origin main
   ```
![](https://github.com/abhinav059/Screenshots/blob/main/task1(1).png)




## Merge Conflict Resolution


### Step 1: Conflict

When Git cannot merge the branches automatically, 

You will need to manually resolve the conflict in the affected files.
![](https://github.com/abhinav059/Screenshots/blob/main/Task1(2).png)

### Step 2: Edit the Conflicted Files

Open the files that have conflicts. Git will mark the areas with conflicts like this:

```plaintext
<<<<<<< HEAD
Your code on the main branch
=======
Your code from the feature branch
>>>>>>> feature
```

You need to decide which code to keep (either from `main` or `feature`), or you can combine them manually.

Stage the Resolved Files

Once you've resolved the conflicts, stage the resolved files:

```bash
git add .
```

### Step 4: Complete the Merge

After staging the resolved files, complete the merge by committing the changes:

```bash
git commit -m "Resolved merge conflict between main and feature"
```

### Step 5: Push the Changes

```bash
git push origin main
```
---


# TASK 2 Continuous Integration (CI) with GitHub Actions
## DEMO0 VIDEO link - https://drive.google.com/file/d/1ZKG8clXGRiHy5U18Ov7FGXdSqiZTvh6z/view?usp=drive_link
## Overview
The CI pipeline is designed to automate testing for a sample application, ensuring code quality and reliability with every push to the repository.

## Setting Up GitHub Actions

1. **Create the required directory structure:**
   - Inside repository, create a folder named `.github/workflows/`.
   - This folder will contain YAML (`.yml`) files that define your CI workflows.

2. **Add a CI workflow file:**
   - Create a file named `ci.yml` inside `.github/workflows/`.
   - This file contains the instructions for automating testing.

## CI Workflow Configuration
The CI workflow is defined in the `.github/workflows/ci.yml` file. 
1. **Checkout Code** – Pulls the latest changes from the repository.
2. **Set Up Environment** – Configures runtime environment (e.g., Python, Node.js, etc.).
3. **Install Dependencies** – Installs required dependencies for the application.
4. **Run Tests** – Executes the test script to validate the application.

## Running the CI Pipeline

Once configured, the CI pipeline runs automatically:
1. Push new changes to the repository.
![](https://github.com/abhinav059/Screenshots/blob/main/task2(1).png)

3. Open a pull request (PR) to the `main` branch.
![](https://github.com/abhinav059/Screenshots/blob/main/task2(2).png)
5. GitHub Actions will trigger the workflow and execute tests.
6. The test results will be displayed in the **Actions** tab on GitHub.


# TASK 3 DOCKER Basics
## DEMO VIDEO link - https://drive.google.com/file/d/1rHmetRFgVHYogp_2WkPIwYKMaCCFCi35/view?usp=sharing

The application runs inside a Docker container and is accessible via `http://localhost:3000`.

## Getting Started

To set up and run the application, navigate to the `Docker_Task` folder within this repository and follow the steps below.

### Prerequisites
- Install DOCKER on your system.

## Steps to Run the Application

### 1. Navigate to the Project Directory
```bash
cd Docker_Task
```

### 2. Build the Docker Image
```bash
docker build -t docker-node-app .
```

### 3. Run the Docker Container
```bash
docker run -p 3000:3000 docker-node-app
```

The application will now be accessible at:
```
http://localhost:3000
```

## Managing Docker Images and Containers

### List Running Containers
```bash
docker ps
```

### List All Containers (Including Stopped Ones)
```bash
docker ps -a
```

### Stop a Running Container
```bash
docker stop <conid>
```

### Remove a Container
```bash
docker rm <conid>
```

### Remove the Docker Image
```bash
docker rmi docker-node-app
```
- Ensure port 3000 is available before running the container.
- Modify the `Dockerfile` or `server.js` if needed before rebuilding the image.
- Run `docker images` to view all images stored on your system.

# TASK 4 AWS CloudFormation Infrastructure as Code (IaC):

## DEMO VIDEO LINK - https://drive.google.com/file/d/1qAOdlkyNk1jC1cs_TJgZc0M92brB3gKO/view?usp=drive_link

cloudFormation template to provision a simple infrastructure on AWS. The template defines a security group and an EC2 instance, enabling SSH and HTTP access.

## CloudFormation Template
The CloudFormation code is provided in the `infrastructure.yml` file, which automates the deployment of:
- A Security Group allowing SSH (port 22) and HTTP (port 80) access.
- An EC2 instance with `t2.micro` type, associated with the security group.

### CloudFormation Code (`infrastructure.yml`)
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Simple CloudFormation template to launch an EC2 instance with a Security Group.

Resources:
  # Security Group to Allow SSH and HTTP Access
  SimpleSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow SSH and HTTP
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0   #  SSH from anywhere 
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0   # HTTP access from anywhere

  # EC2 Instance with Security Group
  SimpleEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-004b2d9f56fc12712  
      InstanceType: t2.micro
      KeyName: Mykey  
      SecurityGroups:
        - !Ref SimpleSecurityGroup
      Tags:
        - Key: Name
          Value: SimpleEC2Instance

Outputs:
  InstancePublicIP:
    Description: Public IP address of the EC2 instance
    Value: !GetAtt SimpleEC2Instance.PublicIp
```

## Deployment Steps (AWS Console)
1. **Login to AWS Management Console**
2. **Navigate to CloudFormation**
   - Open the AWS CloudFormation service.
   - Click on **Create stack** and select **With new resources (standard)**.
3. **Upload the CloudFormation Template**
   - Select **Upload a template file**.
   - Choose the `infrastructure.yml` file and click **Next**.
4. **Specify Stack Details**
   - Enter a **Stack name** (e.g., `MyEC2Stack`).
   - Provide required parameters (e.g., Key Pair Name).
   - Click **Next**.
5. **Configure Stack Options**
6. **Review and Create**
7. **Monitor Deployment**
   - Wait for the stack status to change to `CREATE_COMPLETE`.
   - Navigate to the **Outputs** tab to find the public IP of the EC2 instance.
8. **Access the EC2 Instance**
9. **Delete the Stack (Cleanup)**


Here's a well-detailed README to explain how you can set up logging and monitoring for an application using CloudWatch for logging and Grafana for monitoring:

---

# TASK 5 Monitoring and Logging S
## DEMO VIDEO LINK - https://drive.google.com/file/d/1B6EXccutGxwr6c3ilrY6bBPN35IIvT_Y/view?usp=sharing
 **Amazon CloudWatch** and **Grafana**.

- **Logging**: Amazon CloudWatch is used to collect and store logs from the application. CloudWatch allows us to track the application logs and provides insight into its behavior.
- **Monitoring**: Grafana is integrated with CloudWatch to monitor metrics and visualize them in a more user-friendly way.

### Prerequisites
1. **AWS Account**: 
2. **EC2 Instance**: A running EC2 instance with your application installed.
3. **Grafana**: Grafana will be used to visualize CloudWatch metrics. 


### 1. Set Up Amazon CloudWatch for Logging

#### a. Install and Configure CloudWatch Agent on EC2

1. **Connect to EC2**:
   ```bash
   ssh -i "path-to-your-key.pem" ec2-user@<your-ec2-public-ip>
   ```

2. **Install CloudWatch Agent**:
   First, update your system and install CloudWatch Agent:
   ```bash
   sudo yum update -y
   sudo yum install amazon-cloudwatch-agent -y
   ```

3. **Create the CloudWatch Agent Configuration File**:
   - You need to create a configuration file for the CloudWatch agent to define which log files you want to monitor. 
   - Example configuration file (located at `/opt/aws/amazon-cloudwatch-agent/bin/config.json`):
   - This configuration specifies that any logs under `/var/log/myapp/*.log` will be pushed to the CloudWatch Logs group `myapp-logs`.

4. **Start CloudWatch Agent**:
   ```bash
   sudo amazon-cloudwatch-agent-ctl -a start -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json -s
   ```

#### b. Verify CloudWatch Logs
After starting the agent, 
1. Navigate to the **CloudWatch Console**.
2. In the **Logs** section, check for the `myapp-logs` group.
3. Inside this log group, you will find log streams for each EC2 instance.


#### b. Install Grafana

1. **Install Grafana** on your EC2 instance:
   ```bash
   sudo yum install -y https://dl.grafana.com/oss/release/grafana-8.5.5-1.x86_64.rpm
   ```

2. **Start Grafana**:
   ```bash
   sudo systemctl start grafana-server
   sudo systemctl enable grafana-server
   ```

3. **Access Grafana**:
   - Grafana runs by default on port `3000`.
   - Open your browser and visit `http://<ec2-ip>:3000`.
   - The default username and password are `admin`/`admin`. You will be prompted to change the password on the first login.

#### c. Set Up CloudWatch as a Data Source in Grafana

1. In Grafana, click on the **gear icon** (settings) on the left-hand menu.
2. Click **Data Sources**, then **Add Data Source**.
3. Select **CloudWatch** from the list of available sources.
4. Configure the **Access Key ID** and **Secret Access Key** that have permissions to read CloudWatch metrics.
5. Click **Save & Test** to verify the connection.

#### d. Create Dashboards in Grafana

1. After adding CloudWatch as a data source, go to **Create** > **Dashboard**.
2. Click **Add Query** and select **CloudWatch** as the data source.
3. Choose the metrics you want to visualize. For example, you can choose metrics like **CPU Utilization**, **Memory Usage**, and **Disk I/O**.
4. Customize the visualization type (e.g., Graph, Gauge, Table) and save your dashboard.

---

### 3. Monitor and Visualize Logs and Metrics in Grafana

- With CloudWatch logs and metrics integrated into Grafana, you can now:
  - View metrics such as CPU usage, memory usage, and network traffic.
  - Monitor logs for errors and anomalies that might indicate issues in your application.

# TASK 6 Continuous Deployment (CD) and Rollback
## DEMO VIDEO LINK - https://drive.google.com/file/d/1HfOv1U8s7132FS1e7ED8JZ1cTgXa6_lz/view?usp=sharing
 The deployment process automatically deploys the application to an EC2 instance when changes are pushed to the `main` branch and successfully pass the CI workflow. If deployment fails, an automatic rollback is triggered.

## Setup and Configuration

### Prerequisites
1. **GitHub Repository** - 
2. **EC2 Instance** - 
3. **SSH Access** - Add an SSH key as a GitHub secret for authentication.
4. **Node.js and PM2 Installed** - The instance should have Node.js and PM2 installed.

### GitHub Secrets Configuration

Set upp GitHub secrets in your repository:
- `SSH_PRIVATE_KEY`: The private key for SSH access to your EC2 instance.
- `EC2_HOST`: Public IP of your EC2 instance.
- `EC2_USER`: SSH username (e.g., `ec2-user`).

### GitHub Actions Workflow File (`.github/workflows/cd.yml`)

```yaml
name: Continuous Deployment

on:
  workflow_run:
    workflows: ["Continuous Integration (Testing and Load Test)"]
    types:
      - completed

jobs:
  deploy:
    runs-on: ubuntu-latest

    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup SSH
        run: |
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > private_key.pem
          chmod 600 private_key.pem

      - name: Deploy to EC2
        run: |
          ssh -o StrictHostKeyChecking=no -i private_key.pem ec2-user@${{ secrets.EC2_HOST }} << 'EOF'
            cd Task1_Sample_Project || git clone https://github.com/abhinav059/Task1_Sample_Project.git && cd Task1_Sample_Project
            git pull origin main
            npm install
            pm2 restart index.js || pm2 start index.js
            echo "Deployment Successful!"
          EOF
```

1. **Triggers after CI workflow completion** - Deployment occurs only if tests pass.
2. **Checks out the latest code** from the GitHub repository.
3. **Connects to the EC2 instance** securely using SSH.
4. **Updates the application** by pulling the latest code from GitHub.
5. **Installs dependencies and restarts the server** using `pm2`.

---
## Rollback Strategy

```yaml
  rollback:
    runs-on: ubuntu-latest
    if: ${{ failure() }}

    steps:
      - name: Setup SSH
        run: |
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > private_key.pem
          chmod 600 private_key.pem

      - name: Rollback on Failure
        run: |
          ssh -o StrictHostKeyChecking=no -i private_key.pem ec2-user@${{ secrets.EC2_HOST }} << 'EOF'
            echo "Deployment Failed. Rolling back..."
            cd Task1_Sample_Project
            git reset --hard HEAD~1
            npm install
            pm2 restart index.js
            echo "Rollback Completed!"
          EOF
```
1. If deployment fails, the workflow is triggered automatically.
2. It logs into the EC2 instance and resets the code to the previous commit.
3. Dependencies are reinstalled, and the application restarts.
4. Confirms rollback completion in logs.

   
# TASK 7 Configuration Management:

To automate the setup of a server environment using **Ansible**,

### ** Install Ansible on Your Control Machine**
If Ansible is not installed, install it using:
```bash
sudo apt update && sudo apt install -y ansible  # For Ubuntu/Debian
sudo yum install -y ansible  # For RHEL/CentOS
```

### ** Define the Inventory File (`inventory.ini`)**  
Create an inventory file specifying the target server(s):

```ini
[webserver]
15.207.98.242 ansible_user=ec2-user ansible_ssh_private_key_file=~/path/to/private_key.pem
```

> Replace `15.207.98.242` with your **EC2 instance's public IP** and update the private key path.

---

### ** Write an Ansible Playbook (`setup_server.yml`)**  
This playbook:
 **Updates the system**  
**Installs necessary packages (Node.js, Git, PM2, and CloudWatch Agent)**  
 **Clones a project from GitHub**  
 **Starts the application with PM2**  

```yaml
---
- name: Setup Web Server
  hosts: webserver
  become: yes  # Run tasks as sudo
  tasks:

    - name: Update system packages
      yum:
        name: "*"
        state: latest

    - name: Install required packages
      yum:
        name:
          - git
          - nodejs
          - amazon-cloudwatch-agent
        state: present

    - name: Clone the Git repository
      git:
        repo: "https://github.com/abhinav059/Task1_Sample_Project.git"
        dest: "/home/ec2-user/Task1_Sample_Project"
        version: main
        update: yes

    - name: Install NPM dependencies
      command: npm install
      args:
        chdir: /home/ec2-user/Task1_Sample_Project

    - name: Start application with PM2
      command: pm2 start index.js
      args:
        chdir: /home/ec2-user/Task1_Sample_Project

    - name: Enable CloudWatch Agent
      command: sudo amazon-cloudwatch-agent-ctl -a start -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json -s
```

---

### **4️ Run the Playbook**
Execute the playbook using:
```bash
ansible-playbook -i inventory.ini setup_server.yml
```

---

### What Does This Do?**
**Connects to the EC2 instance**  
*Updates the OS and installs necessary tools**  
**Clones the project from GitHub**  
 **Installs dependencies using `npm install`**  
**Starts the app using `pm2`**  
 **Starts CloudWatch Agent for monitoring**  

---


# TASK 8 Cloud Services Exploration:
## DEMO VIDEO LINK - https://drive.google.com/file/d/1PpLMpzXJc9BYCQrZYe_XsBFmZWO3GgXA/view?usp=sharing
### LAMBDA
![](https://github.com/abhinav059/Screenshots/blob/main/LAMBDA.png)
### RDS
![](https://github.com/abhinav059/Screenshots/blob/main/RDS.png)
### S3
![](https://github.com/abhinav059/Screenshots/blob/main/S3.png)


# TASK 9 NETWORKING VPC
## DEMO VIDEO LINK - https://drive.google.com/file/d/1c-cXuOIFDaoFoMvJOEou_IhSWh67qtwL/view?usp=sharing

A **Virtual Private Cloud (VPC)** allows you to create a logically isolated network within AWS. This guide covers setting up a VPC with subnets, route tables, and security groups to control network access for cloud-hosted applications.
![](https://github.com/abhinav059/Screenshots/blob/main/9.png)

---

## Architecture Structure

```
AWS VPC
│
├── Public Subnet (For Internet-facing resources)
│   ├── EC2 Instance (Public IP assigned)
│   ├── Internet Gateway (Allows external traffic)
│   ├── Route Table (Routes traffic via Internet Gateway)
│
├── Private Subnet (Internal resources like databases)
│   ├── RDS Database Instance
│   ├── No Public IP (Accessed via Bastion Host or VPN)
│   ├── NAT Gateway (Allows outbound internet access)
│
├── Security Groups
│   ├── Web SG (Allows HTTP/HTTPS traffic)
│   ├── DB SG (Restricts access to only internal apps)
│
├── Route Tables
│   ├── Public Route Table (Directs traffic to Internet Gateway)
│   ├── Private Route Table (Routes traffic via NAT Gateway)
```

---

## Steps to Set Up VPC on AWS

### 1. Create a VPC
- Open **AWS Management Console** → **VPC Service**.
- Click **Create VPC** → Give it a name → Set an IPv4 CIDR block
### 2. Create Subnets
- Navigate to **Subnets** → **Create subnet**.
- Select the VPC you created.
- Create:
  - **Public Subnet** 
  - **Private Subnet** 

### 3. Configure Route Tables
- Go to **Route Tables** → Create a new route table for the VPC.
- Associate:
  - **Public Route Table** → Add route to **Internet Gateway**.
  - **Private Route Table** → Add route to **NAT Gateway**.

### 4. Set Up Internet Gateway (For Public Subnet)
- Navigate to **Internet Gateways** → Create new IGW.
- Attach it to your VPC.
- Update **Public Route Table** to route traffic to IGW.
- 
###  Configure Security Groups
- **Web Security Group**
  - Allows inbound HTTP (80) and HTTPS (443) traffic.
  - Allows SSH (22) from your IP.
- **DB Security Group**
  - Allows MySQL/PostgreSQL connections (3306/5432) only from Public Subnet.


# TASK 10 CICD PIPELINE AND SLACK Notification
## LINK - https://github.com/abhinav059/CICD_Test/tree/main
## DEMO VIDEO LINK - https://drive.google.com/file/d/1CNx_2JzpxJGB26ypnTlLrMKgk1SweetG/view?usp=sharing
### CICD
![](https://github.com/abhinav059/Screenshots/blob/main/10T.png)

### SLACK NOTIFICATION
![](https://github.com/abhinav059/Screenshots/blob/main/10T2.png)


# TASK 11  Security Best Practices in DevOps

## Overview
Security is a critical aspect of DevOps, ensuring that applications are protected from threats while maintaining efficiency in development and deployment. This guide covers essential security practices in DevOps, including secrets management, HTTPS usage, IAM roles, and vulnerability scanning in the CI/CD pipeline.

---

## 1. Secrets Management
**Best Practices:**
- Store secrets securely using a secrets management tool instead of hardcoding them in repositories.
- Use environment variables or a secrets vault to inject sensitive data securely.
- Rotate secrets regularly to reduce security risks.

### **Implementation**
#### **Using AWS Secrets Manager**
1. Create a secret in AWS Secrets Manager:
   ```sh
   aws secretsmanager create-secret --name MySecretKey --secret-string "my-secret-value"
   ```
2. Retrieve the secret securely in your application:
   ```python
   import boto3
   client = boto3.client('secretsmanager')
   secret = client.get_secret_value(SecretId='MySecretKey')
   print(secret['SecretString'])
   ```

#### **Using GitHub Secrets**
1. Go to your repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Add a new repository secret (e.g., `AWS_ACCESS_KEY`).
3. Use it in GitHub Actions workflows:
   ```yaml
   env:
     AWS_ACCESS_KEY: ${{ secrets.AWS_ACCESS_KEY }}
   ```

---

## 2. Enforcing HTTPS for Secure Communication
**Best Practices:**
- Use HTTPS for all communications between clients and servers.
- Enforce TLS (Transport Layer Security) to encrypt data in transit.
- Redirect HTTP requests to HTTPS.

### **Implementation**
#### **Using Nginx to Force HTTPS**
1. Install Nginx:
   ```sh
   sudo apt update && sudo apt install nginx
   ```
2. Configure SSL in `/etc/nginx/sites-available/default`:
   ```nginx
   server {
       listen 80;
       server_name example.com;
       return 301 https://$host$request_uri;
   }

---

## 3. Using IAM Roles for Access Control
**Best Practices:**
- Follow the principle of least privilege.
- Use IAM roles instead of hardcoding credentials.
- Assign IAM policies to restrict access to only necessary services.

### **Implementation**
#### **Creating an IAM Role for an EC2 Instance**
1. Go to **AWS IAM Console** -> **Roles** -> **Create Role**.
2. Select **EC2** as the trusted entity.
3. Attach necessary permissions (e.g., `AmazonS3ReadOnlyAccess`).
4. Assign the role to your EC2 instance.
5. Verify access from EC2:
   ```sh
   aws s3 ls
   ```

---

## 4. Vulnerability Scanning in CI/CD Pipeline
**Best Practices:**
- Integrate security scanning tools into CI/CD workflows.
- Scan dependencies for known vulnerabilities.
- Prevent deployment if vulnerabilities are found.

### **Implementation**
#### **Using Trivy for Container Security Scanning**
1. Install Trivy:
   ```sh
   sudo apt install trivy
   ```
2. Scan a Docker image:
   ```sh
   trivy image my-docker-image
   ```
3. Add Trivy to GitHub Actions CI/CD:
   ```yaml
   jobs:
     security_scan:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v4
         - name: Run Trivy scan
           uses: aquasecurity/trivy-action@master
           with:
             image-ref: "my-docker-image"
             format: "table"
   ```


## Conclusion
Implementing security best practices in DevOps is essential to prevent unauthorized access, secure sensitive information, and mitigate vulnerabilities. By integrating secrets management, HTTPS enforcement, IAM roles, and vulnerability scanning into the CI/CD pipeline, you can enhance the security posture of your DevOps workflows.

