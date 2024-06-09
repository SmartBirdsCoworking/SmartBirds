import os
import boto3
import json
from botocore.exceptions import ClientError

def get_secret():
    if os.getenv('SECRET_ARN') is None:
        return os.getenv('TELEGRAM_BOT_TOKEN')
    secret_name = os.getenv('SECRET_ARN')
    region_name = os.getenv('AWS_REGION')

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager', region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    except ClientError as e:
        raise e

    # Decrypts secret using the associated KMS key.
    secret = get_secret_value_response['SecretString']

    # Parse the secret value as JSON
    secret_dict = json.loads(secret)
    return secret_dict['TELEGRAM_BOT_TOKEN']

TOKEN = get_secret()
