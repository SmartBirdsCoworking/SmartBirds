#
# Include only file (shouldn't run directly)
#

# load local environment
#source ./.dev-env 2>/dev/null

# default parameters
PRODUCT_S3_BUCKET=${PRODUCT_S3_BUCKET:-"smartbirds"}
PRODUCT_CONFIG_PATH=${PRODUCT_CONFIG_PATH:-"../../etc/config"}
PRODUCT_CONFIG_REGION=${PRODUCT_CONFIG_REGION:-"eu-central-1"}
PRODUCT_CONFIG_NAME=${PRODUCT_CONFIG_NAME:-"smartbirds"}
PRODUCT_CONFIG_ENV=${PRODUCT_CONFIG_ENV:-"dev"}
