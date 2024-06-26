#!/usr/bin/env bash
set -eo pipefail
#set -x

export AWS_PAGER=""
# set aws profile "smartbirds"
export AWS_PROFILE="smartbirds"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
source ${SCRIPT_DIR}/etc/scripts/config.sh
source ${SCRIPT_DIR}/etc/scripts/state.sh
source ${SCRIPT_DIR}/etc/scripts/infra.sh
cd ${SCRIPT_DIR}/infra/terraform

case ${1} in
  "i")
    PRODUCT_MODULE_RECONFIGURE=1
    init_infra_module;
    ;;

  "p")
    plan_infra_provision;
    ;;

  "a")
    create_infra;
    ;;

  "d")
    destroy_infra;
    ;;

  *)
    show_infra_config;
    ;;
esac