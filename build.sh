ls_date=`date +%Y%m%d`
mkdir output
tar -zcvf output/money-${ls_date}.tar.gz --exclude=node_modules *