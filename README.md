# AgileDevOps Solution
Version: 1.2

Available: Ubuntu 18.04.1 LTS bionic

# OVERVIEW

The AgileDevOps solution aims to create the entire workflow, tests and build of the NODEJS application (hello.js) until its deploy. Provisioning docker containers in swarm mode (cluster), where Traefik performs load balancing and reverse proxy. 
This solution only creates the Swarm Managers, the deployment of the Swarm Workers will be created in future versions. 
NOTE: The Jenkins build process is still just a simulation, I'm also working on deploying this feature.
Helps are very welcome! :D

AUTOMATIZED PROCEDURE: 
Starts Ansible Playbook bootstrap.yml ... >>  
Installing all softwares used in Solution (git, (jenkins), Docker-ce ... >>
Configuring Docker Swarm Manager ... >> 
Starting Playbook firstdeploy.yml ...>>
Starting AgileDevOps Solution ... >> 
Git >  Jenkins Simulated Task > Docker >  Swarm Cluster > Traefik (Balancer + Reverse Proxy + Logs) >>
Nodejs APP Starting... OK! 
\o/  :D
 
![alt text](https://raw.githubusercontent.com/danielprietsch/AgileDevOps/master/draw.png)


============================


# STEPS:

# Creating Environment

1- Create the virtual machine for the AgileDevOps Solution on your Partner or locally (Azure, AWS, Vagrant, VirtualBox, etc...)

# On the remote VM

2- Create the user "vagrant" for SSH access and verify if it has IP connectivity and redirect inbound ports 22 (ssh), 443 (https) and 80 (http) and 8080 (traefik panel) for this server;

3 - Install Python on your virtual Machine and enabled the ssh Password authentication:

Uncomment this line:

    # vi /etc/ssh/sshd_config
    
    PasswordAuthentication yes

Install Python for the Ansible can work

    # apt-get install python

# On your Machine (Ansible Controller)

4- Install Ansible (Controller) on your Linux.

    # apt-get install ansible
    
5- Download the git repository AgileDevOps Solution in your Linux /tmp:

    # git clone https://github.com/danielprietsch/AgileDevOps.git /tmp/AgileDevOps

6- Edit and save the file /tmp/AgileDevOps/ansible/hosts and include your VM Machine IP:

    # vi /tmp/AgileDevOps/ansible/hosts

    [agiledevops]
    MY_VM_IP

    Example:
    [agiledevops]
    192.168.20.21

7 - Got to /tmp/AgileDevOps

    # cd /tmp/AgileDevOps

8 - Run the playbook bootstrap.yml with the parameters above:
VAULT PASSWORD = 123456 

     # ansible-playbook -i ansible/hosts ansible/playbooks/bootstrap.yml --ask-pass --ask-vault-pass -u vagrant

# IMPORTANT: Wait for the docker images to download, this may take about 1-5 minutes depending on your connection.

# TEST NOW! \o/
        # http://REMOTE-VM-IP (press F5 to view the Traefik Load Balancing MAGIC HAPPENS!
        # http://REMOTE-VM-IP:8080 (Traefik Panel)


# OPTIONAL:

9 - To run a deploy without running the basics tasks in bootstrap, run only the deploy.yml playbook:

    # ansible-playbook -i ansible/hosts ansible/playbooks/deploy.yml --ask-pass -u vagrant

10 - To perform the rollback to the previous version of the NodeApp application in the GIT (HEAD~), run the playbook below:

    # ansible-playbook -i ansible/hosts ansible/playbooks/rollback.yml --ask-pass -u vagrant

11 - To permanent scale the nodejs container to 10 instances:
Edit the /tmp/AgileDevOps/docker/dockerfiles/AgileDevOps/docker-compose.yml

    # vi /tmp/AgileDevOps/docker/dockerfiles/AgileDevOps/docker-compose.yml

Change the line:

    # replicas: 2 
to

    # replicas: 10 
    
... and run the STEP #9 again
    
    # ansible-playbook -i ansible/hosts ansible/playbooks/deploy.yml --ask-pass -u vagrant

12 - You can set up the role  geerlingguy.ntp to chance the timezone to America/Sao_Paulo on the ansible/playbooks/bootstrap.yml by uncomment this role;

====================================================

# EXTRA INFO:
  
Tree Directoryies:

/AgileDevOps
...

    Vagrantfile: My Vagrantfile used on tests;

    ansible: 
        ansible.cfg: (my ansible.cfg config ((extra))
        hosts: Ansible hosts inventory 
        files:
            99force-ipv4: Used to force vagrant using ipv4 on apt-get
            postfixconfig:
               main.cf: postfix config file
               sasl:
                  sasl_passwd: Used for postfix smtp relay
                  sasl_passwd.db: Used for postfix smtp relay
                  
        scripts:
            aptkey.sh: Used on docker installation
            testservices.sh: Using to test docker swarm and docker pid to restart
        
        roles:
             
        playbooks:
            bootstrap.yml:
            firstdeploy.yml: 
            deploy.yml: same as firstdeploy.yml but you can run only deploy ;
            rollback.yml: Rollback App to HEAD~ git version;
        vault: 
                secret.yml: have the password to postfix smtp relay with desafiolinux@gmail.com
    docker:
        dockerfiles:
            AgileDevOps:
                config.toml: Traefik config file
                docker-compose.yml: docker-compose file to creates all the Environment
            NodeApp:
                Dockerfile: Used to build the image, see this on https://hub.docker.com/r/danielprietsch/nodejs/
                node.sh: Script started by the image
                
        volumes:
            Jenkins: Simulating the Jenkins build
            NodeApp: Receiveis the build and stable version of NodeApp from Jenkins
                 hello.js: Nodejs + Express App;
                 package.json: Including express depencies to npm/yarn install;
                 node_modules: All modules downloaded by npm/yarn
              
 Author: Daniel Prietsch

 daniel@nuvemtecnologia.com

 http://nuvemtecnologia.com
 

 Need help with:
 
- Copy the Traefik logs to volume in Linux (not in container)
- Parse Traefik logs?
- Creating a real Jenkins test.


Updates:

1.1: HTTPS Working with a invalid crt.
1.2: Ansible codes using docker modules.
