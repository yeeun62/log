#!/bin/bash
cd /home/ubuntu/handle_log/server

export API_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names API_KEY --query Parameters[0].Value | sed 's/"//g')
export AUTH_DOMAIN=$(aws ssm get-parameters --region ap-northeast-2 --names AUTH_DOMAIN --query Parameters[0].Value | sed 's/"//g')
export DATABASE_URL=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_URL --query Parameters[0].Value | sed 's/"//g')
export PROJECT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names PROJECT_ID --query Parameters[0].Value | sed 's/"//g')
export STORAGEBUCKET=$(aws ssm get-parameters --region ap-northeast-2 --names STORAGEBUCKET --query Parameters[0].Value | sed 's/"//g')
export MESSAGING_SENDER_ID=$(aws ssm get-parameters --region ap-northeast-2 --names MESSAGING_SENDER_ID --query Parameters[0].Value | sed 's/"//g')
export APP_ID=$(aws ssm get-parameters --region ap-northeast-2 --names APP_ID --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js