#!/bin/bash
docker run -d --name mongo-caroster -p 27017:27017 -v mongo-caroster:/data/db  mongo
