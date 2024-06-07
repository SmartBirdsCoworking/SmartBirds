from diagrams import Diagram, Cluster
from diagrams.aws.compute import EC2, Lambda
from diagrams.aws.database import Dynamodb, DynamodbTable
from diagrams.aws.network import APIGateway
from diagrams.aws.storage import S3
from diagrams.aws.management import Cloudwatch
from diagrams.aws.integration import SNS
from diagrams.onprem.client import Users
from diagrams.saas.chat import Telegram
from diagrams.aws.iot import IotCamera

with Diagram("Loyalty Program Architecture", show=False):
    users = Users("Customers")
    partners = Users("Partners")
    # camera = IotCamera("Camera")

    with Cluster("AWS"):
        api_gateway = APIGateway("API Gateway")
        tg_miniapp = S3("TG Mini-app")

        with Cluster("Compute"):
            lambda_gen_qr = Lambda("Generate QR")
            lambda_validate_qr = Lambda("Validate QR")
            web_dashboard = EC2("Partners Dashboard")

        with Cluster("Database"):
            dynamodb_users = DynamodbTable("Users")
            dynamodb_partners = DynamodbTable("Partners")
            dynamodb_transactions = DynamodbTable("Transactions")

        s3_storage = S3("S3 Storage")
        # cloudwatch = Cloudwatch("Monitoring")
        sns_notifications = SNS("Notifications")

    telegram_bot = Telegram("Telegram Bot")
    # telegram_miniapp = Telegram("Telegram Mini-app")

    # qr_code = Users("QR Code")

    # Connections
    users >> telegram_bot >> tg_miniapp
    tg_miniapp >> api_gateway >> lambda_gen_qr
    tg_miniapp >> s3_storage

    partners >> telegram_bot >> api_gateway >> lambda_validate_qr

    partners >> web_dashboard
    web_dashboard >> dynamodb_transactions
    web_dashboard >> dynamodb_partners

    lambda_gen_qr >> s3_storage
    lambda_gen_qr >> dynamodb_users
    lambda_gen_qr >> dynamodb_transactions

    lambda_validate_qr >> dynamodb_users
    lambda_validate_qr >> dynamodb_transactions
    lambda_validate_qr >> sns_notifications

    # api_gateway >> cloudwatch
    # lambda_gen_qr >> cloudwatch
    # lambda_validate_qr >> cloudwatch
    # ec2_web >> cloudwatch
    # dynamodb_users >> cloudwatch
    # dynamodb_partners >> cloudwatch
    # dynamodb_transactions >> cloudwatch
    # s3_storage >> cloudwatch
