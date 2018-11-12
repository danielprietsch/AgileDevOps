#!/bin/bash
# Docker Process Monitor
# Restart Docker When It Goes Down

# uncomment if you are using Debian / Ubuntu Linux
RESTART="/etc/init.d/docker restart"

#path to pgrep command
PGREP="/usr/bin/pgrep"

DOCKER="docker"

# find httpd pid
$PGREP ${DOCKER}

if [ $? -ne 0 ] # docker not running 
then
 # restart docker
 $RESTART
fi
