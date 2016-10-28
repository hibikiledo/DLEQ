#!/bin/bash
sed -i -e 's#http://localhost:3000#https://dleq.hibikiledo.xyz#g' modules/Configuration.js \
&& webpack \
&& sass public/stylesheets/style.scss:public/stylesheets/style.css