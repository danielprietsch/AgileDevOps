# My Vagrantfile for tests...
###########################################################################################
Vagrant.configure("2") do |config|

	config.vm.define "web1" do |web1|
		web1.vm.box = "generic/ubuntu1804"
    		web1.vm.hostname = 'web1'
    		web1.vm.box_url = "generic/ubuntu1804"
    		web1.vm.network :public_network, ip: "192.168.15.100", :bridge => "wlp6s0" 
    		web1.vm.provider :virtualbox do |v|
      			v.customize ["modifyvm", :id, "--memory", 768]
      			v.customize ["modifyvm", :id, "--name", "web1"]
    		end
	end

############################################################################################

        config.vm.define "web2" do |web2|
                web2.vm.box = "peru/ubuntu-18.04-server-amd64"
                web2.vm.hostname = 'web2'
                web2.vm.box_url = "peru/ubuntu-18.04-server-amd64"
                web2.vm.network :public_network, ip: "192.168.15.101", :bridge => "wlp6s0"
                web2.vm.provider :virtualbox do |v|
                        v.customize ["modifyvm", :id, "--memory", 768]
                        v.customize ["modifyvm", :id, "--name", "web2"]
                end
        end

############################################################################################

	config.vm.define "db1" do |db1|
    	db1.vm.box = "geerlingguy/ubuntu1804"
    	db1.vm.hostname = 'db1'
    	db1.vm.box_url = "geerlingguy/ubuntu1804"
    	db1.vm.network :public_network, ip: "192.168.15.102", :bridge => "wlp6s0"
		db1.vm.provider :virtualbox do |v|
     		v.customize ["modifyvm", :id, "--memory", 768]
      		v.customize ["modifyvm", :id, "--name", "db1"]
    		end
	end

############################################################################################
end
