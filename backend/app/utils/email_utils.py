import boto3
from botocore.exceptions import ClientError
from flask import current_app

def send_email(recipient, subject, body_text, body_html):
    client = boto3.client('ses',
                          aws_access_key_id=current_app.config['AWS_ACCESS_KEY_ID'],
                          aws_secret_access_key=current_app.config['AWS_SECRET_ACCESS_KEY'],
                          region_name=current_app.config['AWS_REGION'])

    try:
        response = client.send_email(
            Source=current_app.config['SENDER_EMAIL'],
            Destination={
                'ToAddresses': [recipient],
            },
            Message={
                'Subject': {
                    'Data': subject,
                },
                'Body': {
                    'Text': {
                        'Data': body_text,
                    },
                    'Html': {
                        'Data': body_html,
                    },
                },
            },
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
        return False
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])
        return True

def send_password_reset_email(user_email, reset_token):
    subject = "Password Reset Request"
    body_text = (f"Hello,\r\n\r\n"
                 f"You have requested to reset your password. "
                 f"Please use the following token to reset your password: {reset_token}\r\n\r\n"
                 f"If you did not request this, please ignore this email.")

    body_html = f"""<html>
    <head></head>
    <body>
      <h1>Password Reset Request</h1>
      <p>Hello,</p>
      <p>You have requested to reset your password. Please use the following token to reset your password:</p>
      <p><strong>{reset_token}</strong></p>
      <p>If you did not request this, please ignore this email.</p>
    </body>
    </html>
    """

    return send_email(user_email, subject, body_text, body_html)