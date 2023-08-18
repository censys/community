#!/bin/bash

# usage:
#  first time run to create container:  ./censys-qualys.sh build
#  subsequent runs of existing container: ./censys-qualys.sh run

name="qualys"
network="host"
host_storage="$HOME/censys/$name"
container_storage="/opt/censys/$name/storage"
image="$name:latest"



if [ "$1" == "build" ]
then
	echo
	echo -n "By using this software you agree to the license contained in the LICENSE file: (y/N/read) "
	read answer
	echo
	if [ "$answer" == "read" ]
	then
		cat ./LICENSE
		echo
		echo -n "By using this software you agree to the license contained in the LICENSE file: (y/N) "
		read answer
		echo
	fi

	if [ "$answer" == "Y" ] || [ "$answer" == "y" ]
	then
		docker build . -t $image
	fi
	exit
fi

if [ "$1" == "once" ]
then
	docker run -it --env CENSYS_RUN_ONCE=1 --network $network --rm -v $host_storage:$container_storage $image
	exit
fi

if [ "$1" == "run" ]
then
	docker run --rm -d --network $network -v $host_storage:$container_storage $image
	exit
fi

if [ "$1" == "cli" ]
then
	docker run -it --env CENSYS_RUN_ONCE=1 --network $network --rm -v $host_storage:$container_storage $image node cli.js
	exit
fi
