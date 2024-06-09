import boto3
from botocore.exceptions import ClientError

class DynamoDB:
    def __init__(self, table_name, region_name='your-region'):
        self.dynamodb = boto3.resource('dynamodb', region_name=region_name)
        self.table = self.dynamodb.Table(table_name)

    def put_item(self, item):
        try:
            response = self.table.put_item(Item=item)
            return response
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            return response

    def get_item(self, key):
        try:
            response = self.table.get_item(Key=key)
            return response.get('Item', None)
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            return response

# Example usage:
# db = DynamoDB('SmartBirdsUsers')
# db.put_item({'username': 'test_user', 'created_at': '2023-06-08T12:34:56Z'})
# user = db.get_item({'username': 'test_user'})
# print(user)
