#!/bin/sh
url=$(pg_tmp -t)
datadir=$(psql $url -At -c 'show data_directory')
echo "host all all 10.0.0.0/16 trust" >> $datadir/pg_hba.conf
echo "host all all 192.168.65.0/24 trust" >> $datadir/pg_hba.conf
echo "host all all 172.17.0.0/16 trust" >> $datadir/pg_hba.conf
psql $url -c 'select pg_reload_conf()' > /dev/null
echo $url
