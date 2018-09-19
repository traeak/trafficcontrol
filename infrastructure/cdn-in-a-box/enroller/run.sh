#!/bin/bash
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
############################################################

. ../traffic_ops/to-access.sh
export TO_URL=https://$TO_HOST:$TO_PORT
export TO_USER=$TO_ADMIN_USER
export TO_PASSWORD=$TO_ADMIN_PASSWORD

key=./server.key
cert=./server.crt
openssl req -newkey rsa:2048 -nodes -keyout $key -x509 -days 365 -out $cert -subj "/C=$CERT_COUNTRY/ST=$CERT_STATE/L=$CERT_CITY/O=$CERT_COMPANY"

# Traffic Ops must be accepting connections before enroller can start
until to-ping; do
    echo "Waiting for $TO_URL"
    sleep 5
done

go run enroller.go || tail -f /dev/null
