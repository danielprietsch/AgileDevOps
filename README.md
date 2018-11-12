# AgileDevOps

Procedure: 

botstrap.yml 

Ansible Creates a Server with Docker Swarm Manager, ntp, cron tasks and postfix smtp relay (to send e-mail alerts);

firstdeploy.yml

Git + (Jenkins Simulated Task) + Docker + Swarm Cluster Start + Traefik Start (Balancer + Reverse Proxy + Logs) + Nodejs HighAvailability App Running... \o/

MORE INFO:

To scale the nodejs container to 10 instances: 

    docker service scale AgileDevOps_nodejs=10
    AgileDevOps_nodejs scaled to 10
    overall progress: 10 out of 10 tasks 
    1/10: running   [==================================================>] 
    2/10: running   [==================================================>] 
    3/10: running   [==================================================>] 
    4/10: running   [==================================================>] 
    5/10: running   [==================================================>] 
    6/10: running   [==================================================>] 
    7/10: running   [==================================================>] 
    8/10: running   [==================================================>] 
    9/10: running   [==================================================>] 
    10/10: running   [==================================================>] 
    verify: Service converged 
    
    
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
            

      
   
        
