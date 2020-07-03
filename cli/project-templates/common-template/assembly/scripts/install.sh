#!/usr/bin/env bash

## -x: Debug mode
## -e: exit the script if any statement returns a non-true return value
[ x"${DEBUG}" == x"true" ] && set -ex || set -e

## application 值为 Jenkins 编译时传入，对应 Jenkins 的 JOB_BASE_NAME，即 APP_NAME
application=$1

## --- 该分割线以上代码不用动 ---

## 切换到具体的子项目顶层目录
# workdir=$(dirname $0)/../../ ; cd $workdir
workdir=$(pwd)/$(dirname $0)/../../ ; cd $workdir

## 子项目编译命令，需要根据实际项目更改
## CI_ 打头的为和运维约定好的变量，CI_DEPLOY_ENV 代表编译环境
[ -e $HOME/.nvm/nvm.sh ] && source $HOME/.nvm/nvm.sh

nvm use 10.16.0 || :
npm install
npm run build -- $CI_DEPLOY_ENV -- $CI_SERVICE_NAME

## 生成 JSON 配置文件，此文件作用告知运维怎么拿到实际要部署的代码、配置文件（以目录形式存放）
## JSON 中的 key 值，事先和运维约定好
cat > /tmp/$application <<-EOF
{
    "targetPath": "$workdir/dist"
}
EOF

exit 0
