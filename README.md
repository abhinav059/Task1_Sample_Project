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
## DEMO VIDEO link - https://drive.google.com/file/d/1ZKG8clXGRiHy5U18Ov7FGXdSqiZTvh6z/view?usp=drive_link
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


