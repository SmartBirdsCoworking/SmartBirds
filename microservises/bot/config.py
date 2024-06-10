import os
import boto3
import json
import logging
from botocore.exceptions import ClientError

# Настройка логирования
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def get_secret():
    if os.getenv('TELEGRAM_BOT_TOKEN'):
        logger.debug("Using TELEGRAM_BOT_TOKEN from environment.")
        return os.getenv('TELEGRAM_BOT_TOKEN')

    secret_name = os.getenv('SECRET_ARN')
    region_name = os.getenv('AWS_REGION')

    logger.debug(f"Fetching secret from Secrets Manager. Secret ARN: {secret_name}, Region: {region_name}")

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager', region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        logger.debug("Secret fetched successfully from Secrets Manager.")
    except ClientError as e:
        logger.error(f"Failed to fetch secret from Secrets Manager: {e}")
        raise e

    # Decrypts secret using the associated KMS key.
    secret = get_secret_value_response['SecretString']

    # Parse the secret value as JSON
    try:
        secret_dict = json.loads(secret)
        logger.debug("Secret parsed successfully.")
        return secret_dict['TELEGRAM_BOT_TOKEN']
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse secret JSON: {e}")
        raise e


TOKEN = get_secret()
logger.debug(f"Telegram bot token fetched: {TOKEN[:4]}...")  # Частичный вывод токена для безопасности
